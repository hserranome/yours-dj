export const VolumeSlider = ({
	isMuted,
	onMuteToggle,
	volume,
	onVolumeChange,
}: {
	isMuted: boolean;
	onMuteToggle: () => void;
	volume: number;
	onVolumeChange: (volume: number) => void;
}) => {
	return (
		<div className="w-full px-4">
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
	);
};
