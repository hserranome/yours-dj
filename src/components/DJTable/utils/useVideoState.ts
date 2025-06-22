import { useRef } from "react";
import type { VideoPlayerRef } from "../VideoPlayer";
import { type TrackState, useSessionStore } from "~/store/session";

export type VideoState = {
    id: string;
    volume: number;
    isMuted: boolean;
    state: TrackState;
};

type UseVideoStateProps = {
    side: 'left' | 'right';
};

export const useVideoState = ({ side }: UseVideoStateProps) => {
	    const ref = useRef<VideoPlayerRef>(null);
        const state = useSessionStore((s) => s.players[side]);
        const setPlayerState = useSessionStore((s) => s.setPlayerState);

        const change = (state: Partial<TrackState>) => {
            setPlayerState(side, state);
        };

        return {
            ref,
            change,
            ...state
        };
};
