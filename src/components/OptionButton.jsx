const LETTERS = ["A", "B", "C", "D", "E", "F"];

function OptionButton({ label, index, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-[15px] transition-colors ${
        isSelected
          ? "border-forest bg-forest-tint text-forest-dark"
          : "border-line bg-surface text-ink hover:border-ink-faint"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
          isSelected ? "border-forest bg-forest text-white" : "border-line text-ink-faint"
        }`}
      >
        {LETTERS[index]}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default OptionButton;
