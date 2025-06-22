import { useState, useEffect, useCallback } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { Crossfader } from "./Crossfader";

export const DJTable = () => {
	// Default video IDs (can be made configurable later)
	const [leftVideo, setLeftVideo] = useState({
		id: "dQw4w9WgXcQ", // Default video ID (Rick Astley - Never Gonna Give You Up)
		volume: 0.5,
		isMuted: false,
	});

	const [rightVideo, setRightVideo] = useState({
		id: "9bZkp7q19f0", // Default video ID (PSY - GANGNAM STYLE)
		volume: 0.5,
		isMuted: false,
	});

	const [crossfader, setCrossfader] = useState(0.5); // 0 = left, 1 = right

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
					<div className="md:col-span-1">
						<VideoPlayer
							videoId={leftVideo.id}
							volume={leftVolume}
							onVolumeChange={(volume) =>
								setLeftVideo((prev) => ({ ...prev, volume }))
							}
							isMuted={leftVideo.isMuted}
							onMuteToggle={() =>
								setLeftVideo((prev) => ({ ...prev, isMuted: !prev.isMuted }))
							}
						/>
					</div>

					{/* Crossfader */}
					<div className="flex items-center justify-center md:px-4">
						<div className="w-full max-w-md">
							<Crossfader value={crossfader} onChange={setCrossfader} />
						</div>
					</div>

					{/* Right Video */}
					<div className="md:col-span-1">
						<VideoPlayer
							videoId={rightVideo.id}
							volume={rightVolume}
							onVolumeChange={(volume) =>
								setRightVideo((prev) => ({ ...prev, volume }))
							}
							isMuted={rightVideo.isMuted}
							onMuteToggle={() =>
								setRightVideo((prev) => ({ ...prev, isMuted: !prev.isMuted }))
							}
						/>
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
