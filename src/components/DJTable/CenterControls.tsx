import { Crossfader } from "./Crossfader";
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
	return (
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
	);
};
