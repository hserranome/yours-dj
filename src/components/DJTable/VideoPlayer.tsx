import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoId: string;
  volume: number; // The volume level to show in the UI (0-1)
  effectiveVolume: number; // The actual volume to apply to the video (0-1)
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export const VideoPlayer = ({
  videoId,
  volume,
  effectiveVolume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
}: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Update the YouTube player's volume when the effectiveVolume prop changes
    if (iframeRef.current?.contentWindow) {
      const message = {
        event: 'command',
        func: 'setVolume',
        args: [effectiveVolume * 100],
      };
      iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
    }
  }, [effectiveVolume]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="mt-4 w-full px-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMuteToggle}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="flex-1 accent-indigo-500"
          />
          <span className="w-12 text-right">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
