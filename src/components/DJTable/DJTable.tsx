import { useSessionStore } from "../../store/session";
import { useVideoState } from "./utils/useVideoState";
import { usePlaybackControls } from "./utils/usePlaybackControls";
import { SidePlayer } from "./SidePlayer";
import { getVolumes } from "./utils/getVolumes";
import { CenterControls } from "./CenterControls";
import { Library } from "./Library";
import styles from "./DJTable.module.css";
import clsx from "clsx";

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
		<div
			className="min-h-screen bg-gray-900 text-white p-2"
			style={{
				backgroundImage: `url(https://live.staticflickr.com/8159/28418275310_2bba496227_h.jpg)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className={clsx("container mx-auto mt-8", styles.DJTable)}>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 z-10 rounded-2xl bg-slate-800">
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
			<div className="container mx-auto">{/* <Library /> */}</div>
		</div>
	);
};
