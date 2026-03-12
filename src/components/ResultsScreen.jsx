export default function ResultsScreen({ result, onRestart, onHome }) {
  const { finalScore, answers, category } = result;
  const total = answers.length;
  const percentage = Math.round((finalScore / total) * 100);

  const getRank = () => {
    if (percentage === 100) return { label: 'Perfect Score!', emoji: '🏆', color: 'from-yellow-400 to-orange-400' };
    if (percentage >= 80) return { label: 'Expert', emoji: '🌟', color: 'from-purple-400 to-cyan-400' };
    if (percentage >= 60) return { label: 'Proficient', emoji: '👍', color: 'from-green-400 to-teal-400' };
    if (percentage >= 40) return { label: 'Keep Learning', emoji: '📚', color: 'from-blue-400 to-indigo-400' };
    return { label: 'Keep Practicing', emoji: '💪', color: 'from-pink-400 to-red-400' };
  };

  const rank = getRank();
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Score card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6 backdrop-blur-sm text-center">
          {/* Circular progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{percentage}%</span>
                <span className="text-white/40 text-xs">score</span>
              </div>
            </div>
          </div>

          <div className="text-4xl mb-2">{rank.emoji}</div>
          <h2 className={`text-3xl font-black mb-2 bg-linear-to-r ${rank.color} bg-clip-text text-transparent`}>
            {rank.label}
          </h2>
          <p className="text-white/50 text-sm mb-6">
            You scored <span className="text-white font-bold">{finalScore}</span> out of <span className="text-white font-bold">{total}</span> in {category.name}
          </p>

          {/* Mini stats */}
          <div className="flex justify-center gap-6">
            <div className="text-center px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="text-2xl font-bold text-green-400">{finalScore}</div>
              <div className="text-xs text-white/40 mt-1">Correct</div>
            </div>
            <div className="text-center px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="text-2xl font-bold text-red-400">{total - finalScore}</div>
              <div className="text-xs text-white/40 mt-1">Wrong</div>
            </div>
            <div className="text-center px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-xs text-white/40 mt-1">Total</div>
            </div>
          </div>
        </div>

        {/* Answer breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 backdrop-blur-sm">
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Answer Breakdown</h3>
          <div className="space-y-2">
            {answers.map((ans, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${ans.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${ans.isCorrect ? 'bg-green-400 text-slate-900' : 'bg-red-400 text-white'}`}>
                  {ans.isCorrect ? '✓' : '✗'}
                </span>
                <span className="text-white/70 text-sm flex-1 truncate">
                  Q{i + 1}: {category.questions[i].question.substring(0, 60)}...
                </span>
                <span className={`text-xs font-semibold ${ans.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {ans.isCorrect ? '+1' : '0'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Home
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Play Again
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
