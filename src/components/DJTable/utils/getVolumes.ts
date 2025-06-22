import { getEffectiveVolumes } from "./getEffectiveVolumes";

export const getVolumes = (crossfader: number, left: { volume: number, muted: boolean }, right: { volume: number, muted: boolean }) => {
    
        const { left: effectiveVolumeLeft, right: effectiveVolumeRight } =
            getEffectiveVolumes(crossfader, left.volume, right.volume);
        const leftMuted = left.muted || effectiveVolumeLeft === 0;
        const rightMuted = right.muted || effectiveVolumeRight === 0;

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