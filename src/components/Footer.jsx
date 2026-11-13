import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-emerald-500/10 bg-black/60 py-6 px-6 text-center text-xs text-slate-400 font-mono mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">Wynncraft Stats Codex</span>
          <span>•</span>
          <span>Data synchronized with official player records</span>
        </div>
        <div>
          <span>Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</span>
        </div>
      </div>
    </footer>
  );
}
