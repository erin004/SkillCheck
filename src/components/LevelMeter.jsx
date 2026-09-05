const ZONES = [
  { key: "beginner", label: "Beginner", range: "0–40" },
  { key: "intermediate", label: "Intermediate", range: "41–75" },
  { key: "advanced", label: "Advanced", range: "76–100" },
];

function LevelMeter({ percentage, levelKey }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex h-3 w-full overflow-hidden rounded-full">
        <div className="h-full flex-[40]" style={{ backgroundColor: "var(--color-line)" }} />
        <div className="h-full flex-[35]" style={{ backgroundColor: "var(--color-amber-tint)" }} />
        <div className="h-full flex-[25]" style={{ backgroundColor: "var(--color-forest-tint)" }} />

        <div
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-ink bg-surface shadow-sm transition-[left] duration-500"
          style={{ left: `calc(${percentage}% - 10px)` }}
          aria-hidden="true"
        />
      </div>
      <div className="flex justify-between text-xs text-ink-faint">
        {ZONES.map((zone) => (
          <span
            key={zone.key}
            className={zone.key === levelKey ? "font-medium text-ink" : undefined}
          >
            {zone.label} <span className="hidden sm:inline">({zone.range})</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LevelMeter;
