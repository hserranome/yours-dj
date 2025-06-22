import clsx from "clsx";
import { Button } from "../Button";

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
		<div className="flex align-center gap-4">
			<Button
				type="button"
				onClick={onMuteToggle}
				aria-label={isMuted ? "Unmute" : "Mute"}
			>
				<span
					className={clsx(!isMuted ? "text-yellow-950" : "text-yellow-300")}
				>
					MUTE
				</span>
			</Button>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
				className="flex-1 accent-indigo-500"
			/>
		</div>
	);
};
