export default function CategorySelect({ categories, onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Choose a <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-white/50">Select a topic to begin. 7 questions per round.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat)}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-white/40 text-sm">7 questions · Mixed difficulty</p>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
