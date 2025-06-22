import { PlaybackControls } from "./PlaybackControls";
import type { useVideoState } from "./utils/useVideoState";
import { VideoPlayer } from "./VideoPlayer";
import { VolumeSlider } from "./VolumeSlider";

import { useState } from "react";

export const SidePlayer = ({
	side,
	effectiveVolume,
	muted,
}: {
	side: ReturnType<typeof useVideoState>; // TODO: change to explicit type
	effectiveVolume: number;
	muted: boolean;
}) => {
	const [dragOver, setDragOver] = useState(false);
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: <TODO: fix later>
		<div
			className="md:col-span-1 flex flex-col gap-2 border-2 border-transparent"
			onDragOver={(e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "copy";
				setDragOver(true);
			}}
			onDragLeave={() => setDragOver(false)}
			onDrop={(e) => {
				e.preventDefault();
				const id = e.dataTransfer.getData("videoId");
				if (id) {
					side.change({ id });
				}
				setDragOver(false);
			}}
		>
			<VideoPlayer
				highlight={dragOver}
				ref={side.ref}
				videoId={side.id}
				effectiveVolume={effectiveVolume}
				isMuted={muted}
				onStateChange={(state) => side.change({ state })}
			/>
			<div className="mt-2">
				<PlaybackControls
					onPlay={() => side.ref.current?.play()}
					onPause={() => side.ref.current?.pause()}
					onStop={() => side.ref.current?.stop()}
					isPlaying={side.state === "playing"}
					className="justify-start"
				/>
			</div>
			<div className="mt-4">
				<VolumeSlider
					isMuted={side.muted}
					onMuteToggle={() => side.change({ muted: !side.muted })}
					volume={side.volume}
					onVolumeChange={(volume) => side.change({ volume })}
				/>
			</div>
		</div>
	);
};
