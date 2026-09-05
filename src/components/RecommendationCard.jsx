function RecommendationCard({ program, whatsappUrl }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <p className="text-sm text-ink-faint">Rekomendasi program</p>
      <h3 className="mt-1 font-display text-2xl text-ink">{program.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        {program.description}
      </p>
      <p className="mt-4 text-sm text-ink-faint">{program.duration}</p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-forest px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-forest-dark"
      >
        Tanya lewat WhatsApp
      </a>
    </div>
  );
}

export default RecommendationCard;
