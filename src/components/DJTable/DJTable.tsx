import { useCallback, useState, useRef } from "react";
import { VideoPlayer, type VideoPlayerRef, type PlayerState } from "./VideoPlayer";
import { Crossfader } from "./Crossfader";
import { PlaybackControls } from "./PlaybackControls";

type VideoState = {
  id: string;
  volume: number;
  isMuted: boolean;
  state: PlayerState;
};

export const DJTable = () => {
  // Refs for video player controls
  const leftVideoRef = useRef<VideoPlayerRef>(null);
  const rightVideoRef = useRef<VideoPlayerRef>(null);

  // Video states
  const [leftVideo, setLeftVideo] = useState<VideoState>({
    id: "dQw4w9WgXcQ", // Default video ID (Rick Astley - Never Gonna Give You Up)
    volume: 0.5,
    isMuted: false,
    state: 'stopped',
  });

  const [rightVideo, setRightVideo] = useState<VideoState>({
    id: "9bZkp7q19f0", // Default video ID (PSY - GANGNAM STYLE)
    volume: 0.5,
    isMuted: false,
    state: 'stopped',
  });

  const [crossfader, setCrossfader] = useState(0.5); // 0 = left, 1 = right
  
  // Handle video state changes
  const handleLeftVideoStateChange = (state: PlayerState) => {
    setLeftVideo(prev => ({ ...prev, state }));
  };

  const handleRightVideoStateChange = (state: PlayerState) => {
    setRightVideo(prev => ({ ...prev, state }));
  };
  
  // Global playback controls
  const playAll = () => {
    leftVideoRef.current?.play();
    rightVideoRef.current?.play();
  };
  
  const pauseAll = () => {
    leftVideoRef.current?.pause();
    rightVideoRef.current?.pause();
  };
  
  const stopAll = () => {
    leftVideoRef.current?.stop();
    rightVideoRef.current?.stop();
  };

	// Calculate effective volumes based on crossfader position
	const getEffectiveVolumes = useCallback(() => {
		// When crossfader is at 0 (left), left is at 100%, right at 0%
		// When crossfader is at 1 (right), left is at 0%, right at 100%
		// Linear crossfade
		const leftGain = 1 - crossfader;
		const rightGain = crossfader;

		return {
			left: leftVideo.volume * leftGain,
			right: rightVideo.volume * rightGain,
		};
	}, [crossfader, leftVideo.volume, rightVideo.volume]);

	// Calculate effective volumes
	const effectiveVolumes = getEffectiveVolumes();

	// Apply mute state to the effective volumes
	const leftVolume = leftVideo.isMuted ? 0 : effectiveVolumes.left;
	const rightVolume = rightVideo.isMuted ? 0 : effectiveVolumes.right;

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4">
			<h1 className="text-2xl font-bold text-center mb-6">Yours DJ</h1>

			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Left Video */}
					<div className="md:col-span-1 flex flex-col gap-2">
						<VideoPlayer
              ref={leftVideoRef}
							videoId={leftVideo.id}
							volume={leftVideo.volume}
							effectiveVolume={leftVolume}
							onVolumeChange={(volume) =>
								setLeftVideo((prev) => ({ ...prev, volume }))
							}
							isMuted={leftVideo.isMuted}
							onMuteToggle={() =>
								setLeftVideo((prev) => ({ ...prev, isMuted: !prev.isMuted }))
							}
              onStateChange={handleLeftVideoStateChange}
						/>
            <div className="mt-2">
              <PlaybackControls
                onPlay={() => leftVideoRef.current?.play()}
                onPause={() => leftVideoRef.current?.pause()}
                onStop={() => leftVideoRef.current?.stop()}
                className="justify-start"
              />
            </div>
					</div>

					{/* Center Controls */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-md">
              <Crossfader value={crossfader} onChange={setCrossfader} />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md">
              <h3 className="text-center font-medium mb-3">Global Controls</h3>
              <PlaybackControls
                onPlay={playAll}
                onPause={pauseAll}
                onStop={stopAll}
                className="justify-center"
              />
            </div>
          </div>

					{/* Right Video */}
					<div className="md:col-span-1 flex flex-col gap-2">
						<VideoPlayer
              ref={rightVideoRef}
							videoId={rightVideo.id}
							volume={rightVideo.volume}
							effectiveVolume={rightVolume}
							onVolumeChange={(volume) =>
								setRightVideo((prev) => ({ ...prev, volume }))
							}
							isMuted={rightVideo.isMuted}
							onMuteToggle={() =>
								setRightVideo((prev) => ({ ...prev, isMuted: !prev.isMuted }))
							}
              onStateChange={handleRightVideoStateChange}
						/>
            <div className="mt-2">
              <PlaybackControls
                onPlay={() => rightVideoRef.current?.play()}
                onPause={() => rightVideoRef.current?.pause()}
                onStop={() => rightVideoRef.current?.stop()}
                className="justify-end"
              />
            </div>
					</div>
				</div>
			</div>

			<div className="mt-8 text-center text-sm text-gray-400">
				<p>
					Drag the crossfader to transition between videos. Use individual
					volume controls to adjust each track.
				</p>
			</div>
		</div>
	);
};
