function Spinner({ label = "Memuat..." }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-ink-soft">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-forest" />
      {label}
    </div>
  );
}

export default Spinner;
