import type { ButtonHTMLAttributes } from 'react';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  className?: string;
}

const ControlButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
    {...props}
  >
    {children}
  </button>
);

export const PlaybackControls = ({
  onPlay,
  onPause,
  onStop,
  className = "",
}: PlaybackControlsProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} role="toolbar" aria-label="Playback controls">
      <ControlButton onClick={onPlay} aria-label="Play">
        <span role="img" aria-hidden="true">▶️</span>
      </ControlButton>
      <ControlButton onClick={onPause} aria-label="Pause">
        <span role="img" aria-hidden="true">⏸️</span>
      </ControlButton>
      <ControlButton onClick={onStop} aria-label="Stop">
        <span role="img" aria-hidden="true">⏹️</span>
      </ControlButton>
    </div>
  );
};
