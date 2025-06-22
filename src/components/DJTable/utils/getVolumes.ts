import { getEffectiveVolumes } from "./getEffectiveVolumes";

export const getVolumes = (crossfader: number, left: { volume: number, isMuted: boolean }, right: { volume: number, isMuted: boolean }) => {
    
        const { left: effectiveVolumeLeft, right: effectiveVolumeRight } =
            getEffectiveVolumes(crossfader, left.volume, right.volume);
        const leftMuted = left.isMuted || effectiveVolumeLeft === 0;
        const rightMuted = right.isMuted || effectiveVolumeRight === 0;

        return {
            left: {
                volume: effectiveVolumeLeft,
                muted: leftMuted
            },
            right: {
                volume: effectiveVolumeRight,
                muted: rightMuted
            }
        };
}