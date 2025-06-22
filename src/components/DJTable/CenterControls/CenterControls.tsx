import { Crossfader } from "../Crossfader";
import idleGif from "~/assets/idle.gif";
import playingGif from "~/assets/playing.gif";
import plateBackground from "~/assets/plate-background.jpg";
import { useSessionStore } from "~/store/session";
import { PlaybackControls } from "../PlaybackControls";
import styles from "./CenterControls.module.css";
import clsx from "clsx";

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
			<div
				className={clsx(
					styles.imageIn,
					"relative w-full h-48 flex mb-auto overflow-hidden rounded-lg",
				)}
			>
				<div
					className={clsx(
						"absolute inset-0 bg-repeat-x bg-center bg-cover select-none pointer-events-none animate-marquee-bg",
					)}
					style={{
						backgroundImage: `url(${plateBackground})`,
						animationDuration: "8s",
						animationPlayState: anyPlaying ? "running" : "paused",
					}}
				/>
				<img
					src={brandImg}
					alt="DJ status"
					className={clsx(`relative z-10 object-contain`, imgSizeClass)}
				/>
			</div>
			<div className="w-full max-w-md">
				<Crossfader value={crossfader} onChange={setCrossfader} />
			</div>
			<div className="p-4 rounded-lg w-full max-w-md">
				<PlaybackControls
					onPlay={playAll}
					onPause={pauseAll}
					onStop={stopAll}
					isPlaying={anyPlaying}
					className="justify-center"
				/>
			</div>
		</div>
	);
};
