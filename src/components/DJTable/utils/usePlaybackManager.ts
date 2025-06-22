import type { VideoPlayerRef } from "../VideoPlayer";

export const usePlaybackManager = (leftRef: VideoPlayerRef | null, rightRef: VideoPlayerRef | null) => {
     // Global playback controls
    const playAll = () => {
        leftRef?.play();
        rightRef?.play();
    };
 
    const pauseAll = () => {
        leftRef?.pause();
        rightRef?.pause();
    };
 
    const stopAll = () => {
        leftRef?.stop();
        rightRef?.stop();
    };
    
    return {
        playAll,
        pauseAll,
        stopAll
    };
}