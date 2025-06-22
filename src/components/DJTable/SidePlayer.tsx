import { PlaybackControls } from "./PlaybackControls";
import type { useVideoState } from "./utils/useVideoState";
import { VideoPlayer } from "./VideoPlayer";

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
		<div className="md:col-span-1 flex flex-col gap-2">
			<VideoPlayer
				ref={side.ref}
				videoId={side.id}
				volume={side.volume}
				effectiveVolume={effectiveVolume}
				onVolumeChange={(volume) => side.change({ volume })}
				isMuted={muted}
				onMuteToggle={() => side.change({ isMuted: !side.isMuted })}
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
		</div>
	);
};
