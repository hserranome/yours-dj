interface CrossfaderProps {
  value: number; // 0 (left) to 1 (right)
  onChange: (value: number) => void;
}

export const Crossfader = ({ value, onChange }: CrossfaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="w-full max-w-xs">
        <div className="relative h-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute w-full h-12 opacity-0 cursor-pointer"
            style={{
              background: 'transparent',
              WebkitAppearance: 'none',
            }}
          />
          <div 
            className="absolute top-1/2 w-1 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${value * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Left</span>
          <span>Crossfader</span>
          <span>Right</span>
        </div>
      </div>
    </div>
  );
};
