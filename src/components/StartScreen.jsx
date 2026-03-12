export default function StartScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/80 text-sm font-medium tracking-wide">Interactive Quiz</span>
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl font-black text-white mb-4 leading-tight">
          Quiz<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Master</span>
        </h1>
        <p className="text-white/60 text-lg sm:text-xl mb-12 max-w-md mx-auto leading-relaxed">
          Test your web development knowledge across four categories. How much do you really know?
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { label: 'Categories', value: '4' },
            { label: 'Questions', value: '28' },
            { label: 'Topics', value: 'JS · React · CSS · Web' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
        >
          Start Quiz
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>

        <p className="text-white/30 text-sm mt-6">No sign-up required · Instant results</p>
      </div>
    </div>
  );
}
