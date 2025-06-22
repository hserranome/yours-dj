import { PlaybackControls } from "./PlaybackControls";
import type { useVideoState } from "./utils/useVideoState";
import { VideoPlayer } from "./VideoPlayer";
import { VolumeSlider } from "./VolumeSlider";

export const SidePlayer = ({
	side,
	effectiveVolume,
	muted,
}: {
	side: ReturnType<typeof useVideoState>; // TODO: change to explicit type
	effectiveVolume: number;
	muted: boolean;
}) => {
	return (
		<div
			// biome-ignore lint/a11y/useSemanticElements: <TODO: fix later>
			role="button"
			tabIndex={0}
			className="md:col-span-1 flex flex-col gap-2 border-2 border-transparent hover:border-indigo-500"
			onDragOver={(e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "copy";
			}}
			onDrop={(e) => {
				e.preventDefault();
				const id = e.dataTransfer.getData("videoId");
				if (id) {
					side.change({ id });
				}
			}}
		>
			<VideoPlayer
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
					className="justify-start"
				/>
			</div>
			<div className="mt-4">
				<VolumeSlider
					isMuted={muted}
					onMuteToggle={() => side.change({ isMuted: !side.isMuted })}
					volume={side.volume}
					onVolumeChange={(volume) => side.change({ volume })}
				/>
			</div>
		</div>
	);
};
