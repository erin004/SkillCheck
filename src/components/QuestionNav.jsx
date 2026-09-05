function QuestionNav({ questions, answers, currentIndex, onJump }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
      {questions.map((q, index) => {
        const isAnswered = answers[q.id] !== undefined;
        const isActive = index === currentIndex;

        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onJump(index)}
            aria-current={isActive ? "true" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors ${
              isActive
                ? "border-forest bg-forest text-white"
                : isAnswered
                ? "border-forest-tint bg-forest-tint text-forest-dark"
                : "border-line bg-surface text-ink-soft hover:border-ink-faint"
            }`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default QuestionNav;
