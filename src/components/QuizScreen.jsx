import { useState, useEffect } from 'react';

export default function QuizScreen({ category, onFinish, onBack }) {
  const questions = category.questions;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timedOut, setTimedOut] = useState(false);

  const question = questions[current];
  const progress = ((current) / questions.length) * 100;

  // Timer
  useEffect(() => {
    if (confirmed || timedOut) return;
    if (timeLeft === 0) {
      setTimedOut(true);
      setConfirmed(true);
      setAnswers((prev) => [...prev, { selected: null, correct: question.answer, isCorrect: false }]);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, confirmed, timedOut]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(20);
    setTimedOut(false);
  }, [current]);

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === question.answer;
    if (isCorrect) setScore((s) => s + 1);
    setConfirmed(true);
    setAnswers((prev) => [...prev, { selected, correct: question.answer, isCorrect }]);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      // answers state is up-to-date by this click
      const finalScore = answers.filter((a) => a.isCorrect).length;
      onFinish({ finalScore, answers, category });
    }
  };

  const getOptionStyle = (idx) => {
    if (!confirmed) {
      return selected === idx
        ? 'bg-white/15 border-white/50 text-white scale-[1.01]'
        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30 cursor-pointer';
    }
    if (idx === question.answer) return 'bg-green-500/20 border-green-400 text-white';
    if (idx === selected && selected !== question.answer) return 'bg-red-500/20 border-red-400 text-white/80';
    return 'bg-white/5 border-white/10 text-white/40';
  };

  const timerColor = timeLeft > 10 ? 'text-green-400' : timeLeft > 5 ? 'text-yellow-400' : 'text-red-400';
  const timerBg = timeLeft > 10 ? 'bg-green-400' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Categories
          </button>

          <div className={`flex items-center gap-2 font-bold text-lg ${timerColor} tabular-nums`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m-4-8a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z" />
            </svg>
            {timeLeft}s
          </div>

          <div className="text-white/40 text-sm font-medium">
            {current + 1} <span className="text-white/20">/</span> {questions.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
          <div
            className={`h-full ${timerBg} rounded-full transition-all duration-1000`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6 backdrop-blur-sm">
          {/* Category badge */}
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${category.color} px-3 py-1 rounded-full mb-5`}>
            <span className="text-sm">{category.icon}</span>
            <span className="text-white text-xs font-semibold uppercase tracking-wider">{category.name}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full flex items-center gap-4 border rounded-2xl px-5 py-4 text-left transition-all duration-200 ${getOptionStyle(idx)}`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold transition-colors ${
                confirmed && idx === question.answer
                  ? 'bg-green-400 border-green-400 text-slate-900'
                  : confirmed && idx === selected && selected !== question.answer
                  ? 'bg-red-400 border-red-400 text-white'
                  : selected === idx && !confirmed
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'border-white/20 text-white/40'
              }`}>
                {confirmed && idx === question.answer ? '✓' : confirmed && idx === selected && selected !== question.answer ? '✗' : String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm sm:text-base font-medium">{opt}</span>
            </button>
          ))}
        </div>

        {/* Explanation (after confirm) */}
        {confirmed && (
          <div className={`border rounded-2xl p-4 mb-6 ${timedOut ? 'bg-slate-500/20 border-slate-400/40' : selected === question.answer ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{timedOut ? '⏰' : selected === question.answer ? '🎉' : '📖'}</span>
              <div>
                <p className={`text-sm font-semibold mb-1 ${timedOut ? 'text-slate-300' : selected === question.answer ? 'text-green-400' : 'text-red-400'}`}>
                  {timedOut ? "Time's up!" : selected === question.answer ? 'Correct!' : 'Not quite.'}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 disabled:from-white/10 disabled:to-white/10 disabled:text-white/30 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:scale-100"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {current + 1 < questions.length ? (
                <>
                  Next Question
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </>
              ) : (
                <>
                  See Results
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
