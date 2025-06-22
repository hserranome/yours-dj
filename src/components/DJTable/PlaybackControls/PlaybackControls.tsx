import { Button } from "~/components/Button";

interface PlaybackControlsProps {
	onPlay: () => void;
	onPause: () => void;
	onStop: () => void;
	isPlaying: boolean;
	className?: string;
}

export const PlaybackControls = ({
	onPlay,
	onPause,
	onStop,
	isPlaying,
	className = "",
}: PlaybackControlsProps) => {
	return (
		<div
			className={`flex items-center gap-2 ${className}`}
			role="toolbar"
			aria-label="Playback controls"
		>
			{isPlaying ? (
				<Button onClick={onPause} aria-label="Pause">
					<span role="img" aria-hidden="true" className="leading-none">
						⏸
					</span>
				</Button>
			) : (
				<Button onClick={onPlay} aria-label="Play">
					<span role="img" aria-hidden="true" className="leading-none">
						▶
					</span>
				</Button>
			)}
			<Button onClick={onStop} aria-label="Stop">
				<span role="img" aria-hidden="true" className="leading-none">
					⏹
				</span>
			</Button>
		</div>
	);
};
