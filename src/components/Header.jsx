import React, { useState } from "react";
import { getWynnAuthUrl } from "../services/wynnAuth";

export function Header({
  currentView,
  onSearch,
  onReturnHome,
  searchInput,
  setSearchInput,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText("play.wynncraft.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080d0c]/85 backdrop-blur-xl border-b border-emerald-500/15 px-4 sm:px-6 py-3 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg p-1 transition-transform active:scale-95"
            title="Return to Wynncraft Portal"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.35)] transition-all">
              <span className="material-symbols-outlined text-[20px]">
                token
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider uppercase font-fantasy text-emerald-400 group-hover:text-emerald-300 transition-colors">
                Wynncraft
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">
                Explorer
              </span>
            </div>
          </button>

          {currentView === "profile" && (
            <button
              onClick={onReturnHome}
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              <span>Portal Home</span>
            </button>
          )}
        </div>

        {currentView === "profile" && (
          <form
            onSubmit={handleHeaderSearch}
            className="flex-1 max-w-xs sm:max-w-sm hidden md:flex items-center bg-black/50 border border-emerald-500/20 rounded-lg px-3 py-1.5 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/50 transition-all"
          >
            <span className="material-symbols-outlined text-emerald-400/70 text-[18px] mr-2">
              search
            </span>
            <input
              type="text"
              placeholder="Search player..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full font-mono font-medium"
            />
            <button
              type="submit"
              className="text-[10px] bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold transition-colors cursor-pointer"
            >
              SEEK
            </button>
          </form>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <a
              href="https://discord.gg/wynncraft"
              target="_blank"
              rel="noopener noreferrer"
              title="Join Wynncraft Discord"
              className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@WynncraftOfficial"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://x.com/Wynncraft"
              target="_blank"
              rel="noopener noreferrer"
              title="X / Twitter"
              className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {getWynnAuthUrl() && (
            <a
              href={getWynnAuthUrl()}
              title="Connect with Wynncraft OAuth"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/30 rounded-lg text-xs font-mono text-slate-300 hover:text-emerald-300 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                account_circle
              </span>
              <span className="font-semibold">Connect</span>
            </a>
          )}

          <button
            onClick={handleCopyIp}
            title="Click to copy Wynncraft server IP"
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-500/60 rounded-lg text-xs font-mono text-emerald-300 transition-all cursor-pointer shadow-[0_0_12px_rgba(82,214,91,0.15)] group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#52d65b]"></span>
            <span className="font-bold tracking-wide">play.wynncraft.com</span>
            <span
              className={`material-symbols-outlined text-[15px] transition-colors ${
                copied
                  ? "text-emerald-400 font-bold"
                  : "text-emerald-400/70 group-hover:text-emerald-300"
              }`}
            >
              {copied ? "check" : "content_copy"}
            </span>
            <span className="text-[10px] hidden md:inline font-bold uppercase tracking-wider text-slate-300">
              {copied ? "COPIED!" : "COPY"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
