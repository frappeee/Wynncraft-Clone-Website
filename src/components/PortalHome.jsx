import React, { useState, useEffect, useRef } from "react";
import wynnLogo from "../assets/wynncraft_logo.png";
import wynnBg from "../assets/wynncraft_bg.jpg";
import { searchWynncraft } from "../services/wynnApi";

const CLASS_SHOWCASE = {
  archer: {
    name: "Archer",
    emoji: "🏹",
    role: "Primary Role: High Long-Range DPS",
    title: "Sharpshooter & Trapper",
    desc: "Rain spectral volleys from afar, lay concussive traps, and summon phantom arrows to eliminate eldritch threats before they close the gap.",
    archetypes: ["Boltslinger", "Trapper", "Sharpshooter"],
    weapon: "Bows & Crossbows",
  },
  warrior: {
    name: "Warrior",
    emoji: "🛡️",
    role: "Primary Role: Frontline Colossus & Tank",
    title: "Paladin & Fallen Warlord",
    desc: "Wield massive spears and tower shields. Command holy war cries, shatter enemy formations with seismic leaps, and soak immense punishment.",
    archetypes: ["Fallen", "Battle Monk", "Paladin"],
    weapon: "Spears & Shields",
  },
  mage: {
    name: "Mage",
    emoji: "🔮",
    role: "Primary Role: Healer & Teleportation Specialist",
    title: "Arcanist & Riftwalker",
    desc: "Control time and space with instantaneous blink steps, cure entire parties in frantic raid moments, and summon torrential meteor strikes.",
    archetypes: ["Riftwalker", "Light Bender", "Arcanist"],
    weapon: "Wands & Staves",
  },
  assassin: {
    name: "Assassin",
    emoji: "🗡️",
    role: "Primary Role: Stealth Executioner & Trickster",
    title: "Shadowdancer & Acrobat",
    desc: "Vanish into shadowy smoke screens, backstab corrupted champions for devastating burst multipliers, and dart effortlessly across chasms.",
    archetypes: ["Trickster", "Acrobat", "Shadestepper"],
    weapon: "Daggers & Blades",
  },
  shaman: {
    name: "Shaman",
    emoji: "🪶",
    role: "Primary Role: Area Control & Summoner",
    title: "Summoner & Ritualist",
    desc: "Anchor potent tribal totems to the earth, channel howling spirit wolves, and blanket the battlefield in cursed astral firestorm fields.",
    archetypes: ["Summoner", "Ritualist", "Acolyte"],
    weapon: "Reliks & Totems",
  },
};

export function PortalHome({ onSearch, searchInput, setSearchInput }) {
  const [searchCategory, setSearchCategory] = useState("players");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!searchInput || searchInput.trim().length < 2) {
      setSearchResults(null);
      setShowPreview(false);
      return;
    }

    let isCurrent = true;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchWynncraft(searchInput.trim());
        if (isCurrent && res) {
          setSearchResults(res);
          setShowPreview(true);
        }
      } catch (err) {
        void err;
      } finally {
        if (isCurrent) setSearching(false);
      }
    }, 250);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setShowPreview(false);
      onSearch(searchInput.trim());
    }
  };

  const handleSelectResult = (name) => {
    setSearchInput(name);
    setShowPreview(false);
    onSearch(name);
  };

  const totalMatches =
    (searchResults?.players?.length || 0) +
    (searchResults?.guilds?.length || 0);

  return (
    <div className="relative w-full flex flex-col items-center flex-1 pb-16 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-[850px] bg-cover bg-top pointer-events-none opacity-40"
        style={{ backgroundImage: `url(${wynnBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d0c]/70 via-[#080d0c]/85 to-[#080d0c]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-[#080d0c]"></div>
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center px-4 pt-8 sm:pt-12">
        <div className="relative group mb-4">
          <div className="absolute -inset-6 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/35 transition-all duration-700 pointer-events-none"></div>
          <img
            src={wynnLogo}
            alt="Wynncraft Official Logo"
            className="relative w-full max-w-xs sm:max-w-md md:max-w-lg h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-400"></span>
          <span className="font-mono text-xs sm:text-sm text-amber-400 tracking-[0.3em] uppercase font-bold">
            The Minecraft MMORPG
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-400"></span>
        </div>

        <p className="max-w-2xl text-sm sm:text-base text-slate-300 drop-shadow mb-8 leading-relaxed">
          Explore ancient provinces, forge archetypes across mystical skill
          matrices, and conquer colossal dungeons in the quintessential
          high-fantasy adventure.
        </p>

        <div ref={containerRef} className="w-full max-w-2xl relative mb-6">
          <div className="p-1.5 sm:p-2 rounded-2xl bg-[#0d1613]/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(82,214,91,0.15)]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center w-full px-3 text-emerald-400">
                <span className="material-symbols-outlined text-[24px]">
                  {searching ? "sync" : "search"}
                </span>
                <input
                  type="text"
                  placeholder="Search player, guild, or mythic signature..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => {
                    if (searchInput.trim().length >= 2) setShowPreview(true);
                  }}
                  className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-2 pr-1">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-black/60 text-slate-300 font-mono text-xs uppercase tracking-wider rounded-lg px-2.5 py-2 border border-white/10 focus:outline-none cursor-pointer"
                >
                  <option value="players">Players</option>
                  <option value="guilds">Guilds</option>
                  <option value="all">All Codex</option>
                </select>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-black px-5 py-2 rounded-xl font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_16px_rgba(82,214,91,0.4)] hover:shadow-[0_0_24px_rgba(82,214,91,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Search</span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>

          {showPreview && searchResults && totalMatches > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 z-30 text-left bg-[#0d1613]/95 backdrop-blur-2xl rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.85)] border border-emerald-500/30">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Identified Signatures
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {totalMatches} {totalMatches === 1 ? "match" : "matches"}{" "}
                  found
                </span>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {searchResults.players.map((item) => (
                  <button
                    key={`p-${item.name}`}
                    onClick={() => handleSelectResult(item.name)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-950/50 border border-transparent hover:border-emerald-500/30 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://mc-heads.net/avatar/${item.name}/32`}
                        alt={item.name}
                        className="w-8 h-8 rounded-lg bg-slate-900 border border-emerald-500/30 object-cover flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="font-semibold text-sm text-white font-mono flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.rank && item.rank !== 'Player' ? (
                            <span className="text-[10px] text-red-400 bg-red-950/40 border border-red-500/30 px-1.5 py-0.5 rounded font-sans font-bold">
                              {item.rank}
                            </span>
                          ) : item.supportRank ? (
                            <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-400/20 px-1.5 py-0.5 rounded font-sans font-bold">
                              {item.supportRank.toUpperCase()}
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-sans font-bold">
                              Player
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.subtitle || 'Click to view player telemetry & characters'}
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-400 text-[18px] transition-colors">
                      chevron_right
                    </span>
                  </button>
                ))}

                {searchResults.guilds.map((guild) => (
                  <button
                    key={`g-${guild.name}`}
                    onClick={() => handleSelectResult(guild.name)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-950/40 border border-transparent hover:border-amber-500/30 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold font-mono text-xs">
                        {guild.prefix ? guild.prefix.slice(0, 3) : "GD"}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white font-mono flex items-center gap-2">
                          <span>{guild.name}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 px-1.5 py-0.2 rounded font-sans font-bold">
                            Guild
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Territory & Guild Codex
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-amber-300 text-[18px] transition-colors">
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
