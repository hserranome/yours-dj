import { Crossfader } from "./Crossfader";
import idleGif from "~/assets/idle.gif";
import playingGif from "~/assets/playing.gif";
import plateBackground from "~/assets/plate-background.jpg";
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
			<div className="relative w-full max-w-md h-48 flex items-center justify-center mb-auto overflow-hidden rounded-lg">
				<div
					className={
						"absolute inset-0 bg-repeat-x bg-center bg-cover select-none pointer-events-none animate-marquee-bg"
					}
					style={{
						backgroundImage: `url(${plateBackground})`,
						animationDuration: "8s",
						animationPlayState: anyPlaying ? "running" : "paused",
					}}
				/>
				<img
					src={brandImg}
					alt="DJ status"
					className={`relative z-10 object-contain ${imgSizeClass}`}
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
