import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import QuestionNav from "../components/QuestionNav";
import StepRail from "../components/StepRail";
import Spinner from "../components/Spinner";
import { useQuiz } from "../context/QuizContext";
import { calculateScore } from "../utils/scoring";

function QuizPage() {
  const navigate = useNavigate();
  const {
    questions,
    profile,
    answers,
    answerQuestion,
    currentIndex,
    goToIndex,
    answeredCount,
    setResult,
  } = useQuiz();

  const [isReady, setIsReady] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Mimics fetching the question set from a data source, per the spec's fetch-then-render flow.
    const timer = window.setTimeout(() => setIsReady(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  const currentQuestion = questions[currentIndex];
  const allAnswered = answeredCount === questions.length;

  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < questions.length - 1;

  function handleSelect(optionIndex) {
    answerQuestion(currentQuestion.id, optionIndex);
  }

  function handleSubmit() {
    const scoreResult = calculateScore(questions, answers);
    setResult(scoreResult);
    navigate("/result");
  }

  const missingCount = useMemo(
    () => questions.length - answeredCount,
    [questions.length, answeredCount]
  );

  if (!profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-10 sm:py-14">
      <header className="flex items-center justify-between">
        <span className="whitespace-nowrap font-display text-base text-ink sm:text-lg">Assessment Erin</span>
        <StepRail activeStep={2} />
      </header>

      {!isReady ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spinner label="Menyiapkan soal..." />
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_220px]">
          <div className="flex flex-col gap-6">
            <ProgressBar
              current={currentIndex}
              total={questions.length}
              answeredCount={answeredCount}
            />

            <QuestionCard
              question={currentQuestion}
              selectedIndex={answers[currentQuestion.id]}
              onSelect={handleSelect}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => goToIndex(currentIndex - 1)}
                disabled={!canGoBack}
                className="rounded-md border border-line px-4 py-2.5 text-[15px] text-ink-soft transition-colors hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sebelumnya
              </button>

              {canGoNext ? (
                <button
                  type="button"
                  onClick={() => goToIndex(currentIndex + 1)}
                  className="rounded-md bg-forest px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-dark"
                >
                  Selanjutnya
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="rounded-md bg-forest px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-dark"
                >
                  Selesai
                </button>
              )}
            </div>
          </div>

          <aside className="flex flex-col gap-3">
            <p className="text-sm text-ink-soft">Navigasi soal</p>
            <QuestionNav
              questions={questions}
              answers={answers}
              currentIndex={currentIndex}
              onJump={goToIndex}
            />
          </aside>
        </div>
      )}

      {showConfirm ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-ink/30 px-6">
          <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-6">
            <h2 className="font-display text-xl text-ink">Kirim jawaban?</h2>
            <p className="mt-2 text-[15px] text-ink-soft">
              {allAnswered
                ? "Semua soal sudah kamu jawab. Jawaban tidak bisa diubah setelah dikirim."
                : `Masih ada ${missingCount} soal yang belum dijawab. Soal yang kosong akan dihitung salah.`}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-md border border-line px-4 py-2.5 text-[15px] text-ink-soft transition-colors hover:border-ink-faint"
              >
                Periksa lagi
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-forest px-4 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-forest-dark"
              >
                Kirim jawaban
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuizPage;
