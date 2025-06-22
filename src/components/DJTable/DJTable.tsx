import { useSessionStore } from "../../store/session";
import { useVideoState } from "./utils/useVideoState";
import { usePlaybackControls } from "./utils/usePlaybackControls";
import { SidePlayer } from "./SidePlayer";
import { getVolumes } from "./utils/getVolumes";
import { CenterControls } from "./CenterControls";
import { Library } from "./Library";

export const DJTable = () => {
	const crossfader = useSessionStore((s) => s.controls.crossfader);
	const setCrossfader = useSessionStore((s) => s.setCrossfader);

	const left = useVideoState({ side: "left" });
	const right = useVideoState({ side: "right" });

	const { playAll, pauseAll, stopAll } = usePlaybackControls(
		left.ref,
		right.ref,
	);

	const volumes = getVolumes(crossfader, left, right);

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4">
			<div className="container mx-auto mt-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<SidePlayer
						side={left}
						effectiveVolume={volumes.left.volume}
						muted={volumes.left.muted}
					/>
					<CenterControls
						crossfader={crossfader}
						setCrossfader={setCrossfader}
						playAll={playAll}
						pauseAll={pauseAll}
						stopAll={stopAll}
					/>
					<SidePlayer
						side={right}
						effectiveVolume={volumes.right.volume}
						muted={volumes.right.muted}
					/>
				</div>
			</div>
			<div className="container mx-auto">
				<Library />
			</div>
		</div>
	);
};
