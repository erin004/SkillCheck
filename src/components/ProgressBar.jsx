function ProgressBar({ current, total, answeredCount }) {
  const positionPercent = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-ink-soft">
          Soal <span className="font-medium text-ink">{current + 1}</span> dari {total}
        </span>
        <span className="text-ink-faint">{answeredCount} terjawab</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-forest transition-[width] duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-forest bg-surface transition-[left] duration-300"
          style={{ left: `calc(${positionPercent}% - ${positionPercent / 100 * 12}px)` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
