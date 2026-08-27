
interface ReadinessRingProps {
  ready: number;
  total: number;
  size?: number;
}

export function ReadinessRing({ ready, total, size = 120 }: ReadinessRingProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = total === 0 ? 0 : ready / total;
  const strokeDashoffset = circumference - percentage * circumference;

  const isComplete = ready === total && total > 0;
  
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-ivory-dark)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={isComplete ? "var(--color-success)" : "var(--color-saffron)"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: 'var(--color-graphite)' }}>
          {Math.round(percentage * 100)}%
        </span>
        <span className="text-xs font-medium" style={{ color: 'var(--color-graphite-light)' }}>
          Ready
        </span>
      </div>
    </div>
  );
}
