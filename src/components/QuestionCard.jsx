import OptionButton from "./OptionButton";

function QuestionCard({ question, selectedIndex, onSelect }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
        {question.question}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={option}
            label={option}
            index={index}
            isSelected={selectedIndex === index}
            onSelect={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
