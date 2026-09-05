const STEPS = ["Biodata", "Tes", "Hasil"];

function StepRail({ activeStep }) {
  return (
    <ol className="flex shrink-0 items-center gap-1.5 sm:gap-3">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < activeStep;
        const isActive = stepNumber === activeStep;

        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  isDone
                    ? "bg-forest text-white"
                    : isActive
                    ? "border-2 border-forest text-forest"
                    : "border border-line text-ink-faint"
                }`}
              >
                {isDone ? (
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                    <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </span>
              <span
                className={`hidden text-sm sm:inline ${
                  isActive ? "font-medium text-ink" : "text-ink-faint"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber !== STEPS.length ? (
              <span className="h-px w-4 bg-line sm:w-6" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default StepRail;
