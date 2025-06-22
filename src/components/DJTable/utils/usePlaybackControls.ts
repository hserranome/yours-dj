import type { VideoPlayerRef } from "../VideoPlayer";

import type { RefObject } from "react";

export const usePlaybackControls = (
    leftRef: RefObject<VideoPlayerRef | null>,
    rightRef: RefObject<VideoPlayerRef | null>,
) => {
     // Global playback controls
    const playAll = () => {
        leftRef.current?.play();
        rightRef.current?.play();
    };
 
    const pauseAll = () => {
        leftRef.current?.pause();
        rightRef.current?.pause();
    };
 
    const stopAll = () => {
        leftRef.current?.stop();
        rightRef.current?.stop();
    };
    
    return {
        playAll,
        pauseAll,
        stopAll
    };
}