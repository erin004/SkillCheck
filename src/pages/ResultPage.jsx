import { Navigate, useNavigate } from "react-router-dom";
import LevelMeter from "../components/LevelMeter";
import RecommendationCard from "../components/RecommendationCard";
import StepRail from "../components/StepRail";
import { useQuiz } from "../context/QuizContext";
import { buildWhatsAppMessage } from "../utils/scoring";
import programs from "../data/programs.json";

const ADMISSION_WHATSAPP_NUMBER = "628113601676";

function ResultPage() {
  const navigate = useNavigate();
  const { profile, result, resetAll } = useQuiz();

  if (!profile || !result) {
    return <Navigate to="/" replace />;
  }

  const program = programs[result.levelKey];
  const whatsappMessage = buildWhatsAppMessage({
    name: profile.name,
    levelLabel: program.level,
    percentage: result.percentage,
    programTitle: program.title,
  });
  const whatsappUrl = `https://wa.me/${ADMISSION_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  function handleRestart() {
    resetAll();
    navigate("/");
  }

  return (
    <div className="mx-auto min-h-screen max-w-xl px-6 py-10 sm:py-14">
      <header className="flex items-center justify-between">
        <span className="whitespace-nowrap font-display text-base text-ink sm:text-lg">Assessment Erin</span>
        <StepRail activeStep={3} />
      </header>

      <div className="mt-10">
        <p className="text-sm text-ink-faint">Hasil untuk {profile.name}</p>
        <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
          Level kamu: {program.level}
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          {result.correct} dari {result.total} jawaban benar — skor {result.percentage}%
        </p>
      </div>

      <div className="mt-8">
        <LevelMeter percentage={result.percentage} levelKey={result.levelKey} />
      </div>

      <div className="mt-8">
        <RecommendationCard program={program} whatsappUrl={whatsappUrl} />
      </div>

      <button
        type="button"
        onClick={handleRestart}
        className="mt-6 text-sm text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
      >
        Ulangi tes dari awal
      </button>
    </div>
  );
}

export default ResultPage;
