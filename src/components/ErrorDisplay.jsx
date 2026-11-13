import React from 'react';

export function ErrorDisplay({ error, onRetry, onSelectMock, onReturnHome }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 shadow-[0_0_24px_rgba(239,68,68,0.25)]">
        <span className="material-symbols-outlined text-3xl">error_outline</span>
      </div>

      <h3 className="text-xl font-bold font-fantasy tracking-wider text-white mb-2">
        Codex Query Unsuccessful
      </h3>

      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
        {error || 'Unable to retrieve player records. The player might be inactive, or the Wynncraft API is temporarily unreachable.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Retry Query</span>
          </button>
        )}
        <button
          onClick={onReturnHome}
          className="flex items-center gap-2 bg-black/60 hover:bg-white/10 text-slate-200 border border-white/10 px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Home</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-white/5 w-full text-left">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
          Or inspect verified player profiles:
        </span>
        <div className="flex flex-wrap gap-2">
          {['Nepmia', 'Salted', 'CraftedRelic'].map((name) => (
            <button
              key={name}
              onClick={() => onSelectMock(name)}
              className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[36px]"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
