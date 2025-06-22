import { useState } from "react";
import { useVideoState } from "./utils/useVideoState";
import { usePlaybackManager } from "./utils/usePlaybackManager";
import { SidePlayer } from "./SidePlayer";
import { getVolumes } from "./utils/getVolumes";
import { CenterControls } from "./CenterControls";
import { Library } from "./Library";

export const DJTable = () => {
	const [crossfader, setCrossfader] = useState(0.5);

	const left = useVideoState();
	const right = useVideoState();

	const { playAll, pauseAll, stopAll } = usePlaybackManager(
		left.ref?.current,
		right.ref?.current,
	);

	const volumes = getVolumes(crossfader, left, right);

	return (
		<div className="min-h-screen bg-gray-900 text-white p-4">
			<h1 className="text-2xl font-bold text-center mb-6">Yours DJ</h1>

			{/* Players */}
			<div className="container mx-auto">
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

			{/* Library */}
			<div className="container mx-auto">
				<Library />
			</div>
		</div>
	);
};
