import { useRef, useState } from "react";
import type { PlayerState, VideoPlayerRef } from "../VideoPlayer";

export type VideoState = {
    id: string;
    volume: number;
    isMuted: boolean;
    state: PlayerState;
};

export const useVideoState = () => {
	    const ref = useRef<VideoPlayerRef>(null);

        const [state, setState] = useState<VideoState>({
            id: "N87E3Kz3Hmo",
            volume: 0.5,
            isMuted: false,
            state: "stopped",
        });

        const change = (state: Partial<VideoState>) => {
            setState((prev) => ({ ...prev, ...state }));
        };

        return {
            ref,
            change,
            ...state
        };
};
