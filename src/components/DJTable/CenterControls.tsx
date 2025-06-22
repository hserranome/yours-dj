import { Crossfader } from "./Crossfader";
import idleGif from "~/assets/idle.gif";
import playingGif from "~/assets/playing.gif";
import { useSessionStore } from "~/store/session";
import { PlaybackControls } from "./PlaybackControls";

export const CenterControls = ({
	crossfader,
	setCrossfader,
	playAll,
	pauseAll,
	stopAll,
}: {
	crossfader: number;
	setCrossfader: (crossfader: number) => void;
	playAll: () => void;
	pauseAll: () => void;
	stopAll: () => void;
}) => {
	const anyPlaying = useSessionStore((s) =>
		Object.values(s.players).some((p) => p.state === "playing"),
	);
	const brandImg = anyPlaying ? playingGif : idleGif;
	const imgSizeClass = anyPlaying ? "h-44 w-full" : "h-40 w-full";

	return (
		<div className="flex flex-col items-center justify-end gap-6">
			{/* Brand image */}
			<div className="w-full max-w-md h-48 flex items-center justify-center mb-auto bg-slate-700 rounded-lg">
				<img
					src={brandImg}
					alt="DJ status"
					className={`object-contain ${imgSizeClass}`}
				/>
			</div>
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
	);
};
