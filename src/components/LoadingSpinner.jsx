import React from 'react';

export function LoadingSpinner({ username, onCancel }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl text-emerald-400 animate-pulse">
            sports_esports
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold font-fantasy tracking-wider text-white mb-2">
        Querying Wynncraft Codex
      </h3>
      <p className="text-sm font-mono text-emerald-400 mb-6">
        Retrieving telemetry and character sheets for <span className="underline font-bold">{username}</span>...
      </p>

      {onCancel && (
        <button
          onClick={onCancel}
          className="text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors cursor-pointer min-h-[44px]"
        >
          Cancel Request
        </button>
      )}
    </div>
  );
}
