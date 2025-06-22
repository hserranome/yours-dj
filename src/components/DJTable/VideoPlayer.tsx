import {
	useRef,
	useEffect,
	useImperativeHandle,
	forwardRef,
	useCallback,
} from "react";

export type PlayerState = "stopped" | "playing" | "paused";

export interface VideoPlayerRef {
	play: () => void;
	pause: () => void;
	stop: () => void;
	getState: () => PlayerState;
}

interface VideoPlayerProps {
	videoId: string;
	volume: number; // The volume level to show in the UI (0-1)
	effectiveVolume: number; // The actual volume to apply to the video (0-1)
	onVolumeChange: (volume: number) => void;
	isMuted: boolean;
	onMuteToggle: () => void;
	onStateChange?: (state: PlayerState) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
	(
		{
			videoId,
			volume,
			effectiveVolume,
			onVolumeChange,
			isMuted,
			onMuteToggle,
			onStateChange,
		},
		ref,
	) => {
		const iframeRef = useRef<HTMLIFrameElement>(null);
		const playerState = useRef<PlayerState>("stopped");

		const updateState = useCallback(
			(newState: PlayerState) => {
				playerState.current = newState;
				onStateChange?.(newState);
			},
			[onStateChange],
		);

		const sendCommand = useCallback((command: string, ...args: unknown[]) => {
			if (iframeRef.current?.contentWindow) {
				const message = {
					event: "command",
					func: command,
					args: args,
				};
				iframeRef.current.contentWindow.postMessage(
					JSON.stringify(message),
					"*",
				);
			}
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				play: () => {
					if (playerState.current === "stopped") {
						// For YouTube, we need to load the video first if stopped
						if (iframeRef.current?.contentWindow) {
							const message = {
								event: "loadVideoById",
								videoId,
								startSeconds: 0,
								suggestedQuality: "large",
							};
							iframeRef.current.contentWindow.postMessage(
								JSON.stringify(message),
								"*",
							);
						}
					} else {
						sendCommand("playVideo");
					}
					updateState("playing");
				},
				pause: () => {
					sendCommand("pauseVideo");
					updateState("paused");
				},
				stop: () => {
					sendCommand("stopVideo");
					updateState("stopped");
				},
				getState: () => playerState.current,
			}),
			[videoId, sendCommand, updateState],
		);

		// Handle YouTube API ready
		useEffect(() => {
			const handleMessage = (event: MessageEvent) => {
				if (event.origin !== "https://www.youtube.com") return;

				try {
					console.log("YouTube message:", event.data);
					const data = JSON.parse(event.data);
					if (data.event === "onStateChange") {
						if (data.info === 1) updateState("playing");
						else if (data.info === 2) updateState("paused");
						else if (data.info === 0) updateState("stopped");
					}
				} catch (error) {
					// Invalid JSON or other error, ignore
					console.error("Error parsing YouTube message:", error);
				}
			};

			window.addEventListener("message", handleMessage);
			return () => window.removeEventListener("message", handleMessage);
		}, [updateState]);

		// Handle volume and mute state changes
		useEffect(() => {
			if (playerState.current !== "stopped") {
				sendCommand("setVolume", Math.round(effectiveVolume * 100));
				sendCommand(isMuted ? "mute" : "unMute");
			}
		}, [effectiveVolume, isMuted, sendCommand]);

		return (
			<div className="flex flex-col items-center w-full h-full">
				<div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
					<iframe
						ref={iframeRef}
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="absolute inset-0 w-full h-full"
					/>
				</div>
				<div className="mt-4 w-full px-4">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={onMuteToggle}
							className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							aria-label={isMuted ? "Unmute" : "Mute"}
						>
							{isMuted ? "🔇" : "🔊"}
						</button>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
							className="flex-1 accent-indigo-500"
						/>
						<span className="w-12 text-right">{Math.round(volume * 100)}%</span>
					</div>
				</div>
			</div>
		);
	},
);

// Add display name for better debugging
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
