import {
	useRef,
	useEffect,
	useImperativeHandle,
	forwardRef,
	useCallback,
	useState,
} from "react";
import vinylImg from "../../../assets/vinyl.png";
import { getYoutubeInfo, type YoutubeInfo } from "../utils/getYoutubeInfo";

export type PlayerState = "stopped" | "playing" | "paused";

export interface VideoPlayerRef {
	play: () => void;
	pause: () => void;
	stop: () => void;
	getState: () => PlayerState;
}

interface VideoPlayerProps {
	videoId: string;
	effectiveVolume: number; // The actual volume to apply to the video (0-1)
	isMuted: boolean;
	highlight?: boolean;
	onStateChange?: (state: PlayerState) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
	({ videoId, effectiveVolume, isMuted, highlight = false, onStateChange }, ref) => {
		const iframeRef = useRef<HTMLIFrameElement>(null);
		const playerState = useRef<PlayerState>("stopped");
		const [youtubeInfo, setYoutubeInfo] = useState<YoutubeInfo | null>(null);

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

		const applyVolumeMute = useCallback(() => {
			sendCommand("setVolume", Math.round(effectiveVolume * 100));
			sendCommand(isMuted ? "mute" : "unMute");
		}, [effectiveVolume, isMuted, sendCommand]);

		// Keep updated in YT player
		useEffect(() => {
			applyVolumeMute();
		}, [applyVolumeMute]);

		useImperativeHandle(
			ref,
			() => ({
				play: () => {
					applyVolumeMute();
					sendCommand("playVideo");
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
			[sendCommand, updateState, applyVolumeMute],
		);

		useEffect(() => {
			if (videoId) {
				getYoutubeInfo(`https://www.youtube.com/watch?v=${videoId}`).then(
					setYoutubeInfo,
				);
			}
		}, [videoId]);

		const isPlaying = playerState.current === "playing";

		return (
			<div className="flex flex-col items-center w-full">
				<div className={`relative h-72 w-72 justify-center items-center ${highlight ? 'ring-4 ring-indigo-400 rounded-full' : ''}`}>
					<img
						src={vinylImg}
						alt="Vinyl disc"
						className="z-20 absolute inset-0 w-full h-full object-contain rounded-full animate-spin"
						style={{
							animationDuration: "8s",
							animationPlayState: isPlaying ? "running" : "paused",
						}}
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-10/12 aspect-video relative overflow-hidden rounded-md shadow-md pointer-events-none">
							{!isPlaying ? (
								<img
									src={youtubeInfo?.thumbnail_url}
									alt={youtubeInfo?.title}
									className="w-9/12 h-full object-cover rounded z-10 relative mx-auto bg-yellow-600"
								/>
							) : null}
							<iframe
								ref={iframeRef}
								width="100%"
								height="100%"
								src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer&controls=0`}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="absolute inset-0 w-full h-full"
							/>
						</div>
					</div>
				</div>
				{youtubeInfo?.title && (
					<div
						className="mt-4 w-72 overflow-hidden whitespace-nowrap"
						title={youtubeInfo.title}
					>
						<p
							className={
								"inline-block text-sm font-medium pr-4 animate-marquee"
							}
						>
							{youtubeInfo.title}
						</p>
					</div>
				)}
			</div>
		);
	},
);

// Add display name for better debugging
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
