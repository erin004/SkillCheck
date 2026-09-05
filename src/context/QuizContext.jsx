import { createContext, useCallback, useContext, useMemo, useState } from "react";
import questions from "../data/questions.json";
import { KEYS, read, write, clearAll } from "../utils/storage";

const QuizContext = createContext(null);

function QuizProvider({ children }) {
  const [profile, setProfileState] = useState(() => read(KEYS.profile, null));
  const [answers, setAnswersState] = useState(() => read(KEYS.answers, {}));
  const [currentIndex, setCurrentIndexState] = useState(() =>
    read(KEYS.currentIndex, 0)
  );
  const [result, setResultState] = useState(() => read(KEYS.result, null));

  const setProfile = useCallback((next) => {
    setProfileState(next);
    write(KEYS.profile, next);
  }, []);

  const answerQuestion = useCallback((questionId, optionIndex) => {
    setAnswersState((prev) => {
      const next = { ...prev, [questionId]: optionIndex };
      write(KEYS.answers, next);
      return next;
    });
  }, []);

  const goToIndex = useCallback((index) => {
    setCurrentIndexState(index);
    write(KEYS.currentIndex, index);
  }, []);

  const setResult = useCallback((next) => {
    setResultState(next);
    write(KEYS.result, next);
  }, []);

  const resetAll = useCallback(() => {
    clearAll();
    setProfileState(null);
    setAnswersState({});
    setCurrentIndexState(0);
    setResultState(null);
  }, []);

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const value = useMemo(
    () => ({
      questions,
      profile,
      setProfile,
      answers,
      answerQuestion,
      currentIndex,
      goToIndex,
      answeredCount,
      result,
      setResult,
      resetAll,
    }),
    [
      profile,
      setProfile,
      answers,
      answerQuestion,
      currentIndex,
      goToIndex,
      answeredCount,
      result,
      setResult,
      resetAll,
    ]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return ctx;
}

export { QuizProvider, useQuiz };
