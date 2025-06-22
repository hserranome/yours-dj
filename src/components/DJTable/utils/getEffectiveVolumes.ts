export interface EffectiveVolumes {
  left: number;
  right: number;
}

export function getEffectiveVolumes(
  crossfader: number,
  leftVolume: number,
  rightVolume: number
): EffectiveVolumes {
  const clamped = Math.max(0, Math.min(1, crossfader));

  const leftGain = clamped <= 0.5 ? 1 : 1 - (clamped - 0.5) * 2;
  const rightGain = clamped >= 0.5 ? 1 : clamped * 2;

  return {
    left: leftVolume * leftGain,
    right: rightVolume * rightGain,
  };
}
