import React, { useState } from 'react';

export function PlayerProfile({ player, onReturnHome }) {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [copiedUuid, setCopiedUuid] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const activeChar = player.characters[selectedCharIndex] || player.characters[0];

  const handleCopyUuid = async () => {
    try {
      await navigator.clipboard.writeText(player.uuid);
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 2000);
    } catch {
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 2000);
    }
  };

  const formattedJoinDate = player.firstJoin
    ? new Date(player.firstJoin).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown';

  const formattedLastSeen = player.lastJoin
    ? new Date(player.lastJoin).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown';

  const playtimeDays = (player.playtime / 24).toFixed(1);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 pb-16">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 flex-wrap">
        <button
          onClick={onReturnHome}
          className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Wynncraft Codex</span>
        </button>
        <span>/</span>
        <button
          onClick={onReturnHome}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          Player Profiles
        </button>
        <span>/</span>
        <span className="text-emerald-400 font-semibold">{player.username}</span>
        <span
          className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            player.isOnline
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/50 border border-red-500/30 text-red-400'
          }`}
        >
          {player.isOnline ? 'Online' : 'Offline'}
        </span>
      </nav>

      <section className="bg-[#0d1613]/90 backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.12),0_20px_40px_-10px_rgba(0,0,0,0.8)] rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-b from-slate-800 to-black p-1 border-2 border-emerald-500/60 shadow-[0_0_24px_rgba(82,214,91,0.25)] relative">
                {!avatarError ? (
                  <img
                    src={`https://mc-heads.net/avatar/${player.username}/128`}
                    alt={`${player.username} Skin Avatar`}
                    onError={() => setAvatarError(true)}
                    className="w-full h-full rounded-lg object-cover bg-slate-900"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-emerald-950/50 flex items-center justify-center text-3xl font-bold font-mono text-emerald-400">
                    {player.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#0d1613] flex items-center justify-center"
                  title={player.isOnline ? 'Online' : 'Offline'}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      player.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  ></span>
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-fantasy tracking-wider text-white">
                  {player.username}
                </h1>

                {player.rank && player.rank !== 'Player' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#aa0000]/20 border border-[#ff5555]/50 shadow-[0_0_12px_rgba(255,85,85,0.3)]">
                    <span className="text-xs font-bold font-mono text-[#ff5555] uppercase tracking-wider">
                      {player.rank}
                    </span>
                  </div>
                )}

                {player.supportRank && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <span className="text-xs font-mono font-bold tracking-wider">
                      ★ {player.supportRank}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-mono mb-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="text-slate-400">AKA:</span>
                  <span className="font-bold">{player.aka}</span>
                </span>
                <span className="text-slate-600">•</span>
                <button
                  onClick={handleCopyUuid}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  title="Click to copy UUID"
                >
                  <span>UUID:</span>
                  <code className="text-slate-300 bg-black/40 px-1.5 py-0.5 rounded text-[11px]">
                    {player.uuid.slice(0, 8)}...{player.uuid.slice(-4)}
                  </code>
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedUuid ? 'check' : 'content_copy'}
                  </span>
                </button>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">
                  Joined: <strong className="text-slate-200">{formattedJoinDate}</strong>
                </span>
              </div>

              {player.guild && (
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/25">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-medium text-slate-300">Guild:</span>
                  <span className="text-xs font-bold text-emerald-300 font-fantasy tracking-wider">
                    [{player.guild.prefix}] {player.guild.name}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {player.guild.rank} {player.guild.stars}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 min-w-[280px]">
            <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Total Level</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {player.totalLevel.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">Featured Peak: {player.peakLevel.toLocaleString()}</span>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Playtime</span>
              <span className="text-2xl font-bold font-mono text-white">
                {player.playtime.toLocaleString()} <span className="text-sm font-normal text-slate-400">hrs</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">~{playtimeDays} Full Days</span>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Content Rank</span>
              <span className="text-2xl font-bold font-mono text-amber-300 flex items-center gap-1">
                {player.contentRank}
                <span className="text-xs font-normal text-slate-400 font-mono">
                  (prev {player.contentRankPrev})
                </span>
              </span>
              <span className="text-[10px] text-slate-400">Player Content Codex</span>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Last Seen</span>
              <span className="text-sm font-semibold font-mono text-slate-200 mt-1">{formattedLastSeen}</span>
              <span className="text-[10px] text-slate-400 font-mono">Server Telemetry</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0b1311]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-500/20 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#52d65b]"></span>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Character Roster
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  ({player.characters.length} Active Slots)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[10px] uppercase text-slate-400">Selected Class:</span>
                <span className="text-emerald-300 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {activeChar.name} ({activeChar.type})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {player.characters.map((char, index) => {
                const isActive = index === selectedCharIndex;
                return (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharIndex(index)}
                    className={`flex flex-col p-2.5 rounded-xl text-left transition-all cursor-pointer min-h-[44px] ${
                      isActive
                        ? 'bg-emerald-950/50 border-2 border-emerald-500/60 shadow-[0_0_12px_rgba(82,214,91,0.25)] text-white'
                        : 'bg-black/40 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-950/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <span className="text-base">{char.emoji}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Lv. {char.level}
                      </span>
                    </div>
                    <div className="font-bold font-fantasy tracking-wider text-sm text-white flex items-center gap-1 truncate">
                      {char.name}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#52d65b]"></span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/80 truncate">{char.reskin}</span>
                    <span className="text-[9px] font-mono text-slate-400 truncate mt-0.5">{char.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <section className="bg-[#0b1311]/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 relative border border-emerald-500/20 border-t-2 border-t-emerald-400/80 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/5 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Active Character
                  </span>
                  <span className="text-xs font-mono text-slate-400">ID: {activeChar.id}</span>
                </div>
                <h2 className="text-2xl font-bold font-fantasy tracking-wider text-white flex items-center gap-2">
                  Level {activeChar.level} <span className="text-emerald-400">{activeChar.name}</span>
                  <span className="text-xs font-mono font-normal text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {activeChar.reskin}
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Character Total Level</div>
                  <div className="text-xl font-bold font-mono text-emerald-300">
                    {activeChar.characterTotalLevel}
                  </div>
                </div>
                <div className="h-9 w-[1px] bg-white/10"></div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">XP Progress</div>
                  <div className="text-xl font-bold font-mono text-amber-400">
                    {activeChar.xpPercent}%{' '}
                    {activeChar.isMaxXp && <span className="text-xs text-slate-400 font-normal">MAX</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span>
                  Experience: <strong className="text-slate-200">{activeChar.xp}</strong>
                </span>
                <span className="text-emerald-400 font-semibold">
                  {activeChar.isMaxXp ? 'Tier Maximum reached' : `${activeChar.xpPercent}% to next rank`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-emerald-500/20 p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 rounded-full shadow-[0_0_10px_rgba(82,214,91,0.5)] transition-all duration-500"
                  style={{ width: `${Math.max(5, activeChar.xpPercent)}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Mobs Slain</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.mobsSlain.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Chests Looted</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.chestsLooted.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Quests Done</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {activeChar.metrics.questsDone.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Discoveries</span>
                <span className="text-lg font-bold font-mono text-amber-300">
                  {activeChar.metrics.discoveries.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Caves Explored</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.cavesExplored.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Blocks Walked</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.blocksWalked.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Items Identified</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.itemsIdentified.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-0.5">Total Logins</span>
                <span className="text-lg font-bold font-mono text-white">
                  {activeChar.metrics.totalLogins.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">swords</span>
                    PvP Combat Matrix
                  </span>
                  <span className="text-xs font-mono text-slate-400">K/D: {activeChar.pvp.kd}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono">
                  <div>
                    <span className="text-slate-400 text-xs block">Player Kills</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {activeChar.pvp.kills.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs block">Deaths</span>
                    <span className="text-lg font-bold text-red-400">
                      {activeChar.pvp.deaths.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">shield</span>
                    Raids & Territory Wars
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-semibold">
                    {activeChar.wars} Wars
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-mono">
                  <div>
                    <span className="text-slate-400 text-xs block">Dungeons Clear</span>
                    <span className="text-lg font-bold text-purple-300">{activeChar.dungeonsCleared}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs block">Raids Completed</span>
                    <span className="text-lg font-bold text-purple-300">{activeChar.raidsCompleted}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0b1311]/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-emerald-500/20 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-white/5 gap-2">
              <div>
                <h2 className="text-xl font-bold font-fantasy tracking-wider text-white flex items-center gap-2">
                  Crafting & Gathering Disciplines
                </h2>
                <p className="text-xs text-slate-400">
                  12 Wynncraft artisan professions and current XP progress levels
                </p>
              </div>
              {activeChar.professions.length > 0 && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Highest: {activeChar.professions[0].name} ({activeChar.professions[0].level})
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {activeChar.professions.map((prof) => (
                <div
                  key={prof.name}
                  className={`p-3.5 rounded-xl bg-black/40 border transition-all ${
                    prof.highlight
                      ? 'border-emerald-500/40 shadow-[0_0_12px_rgba(82,214,91,0.15)]'
                      : 'border-white/5 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                      <span>{prof.icon}</span>
                      <span>{prof.name}</span>
                    </span>
                    <span
                      className={`text-sm font-bold font-mono ${
                        prof.highlight ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      Lv. {prof.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(3, prof.xpPercent))}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block text-right">
                    {prof.xpPercent}% XP
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-[#0b1311]/80 backdrop-blur-md rounded-2xl p-6 relative border border-emerald-500/20 border-t-2 border-t-purple-500/60 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold font-fantasy tracking-wider text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></span>
                Raid Combat Telemetry
              </h3>
              <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                Global
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Combat statistics aggregated across Grootslang and Guild raid incursions.
            </p>
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Damage Dealt</span>
                <span className="text-base font-bold text-amber-300">
                  {player.raidTelemetry.damageDealt.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Damage Absorbed</span>
                <span className="text-sm font-bold text-slate-200">
                  {player.raidTelemetry.damageAbsorbed.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Health Restored</span>
                <span className="text-sm font-bold text-emerald-400">
                  {player.raidTelemetry.healingDone.toLocaleString()} HP
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 bg-black/30 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">Buffs Taken</span>
                  <span className="text-sm font-bold text-slate-200">{player.raidTelemetry.buffsTaken}</span>
                </div>
                <div className="p-2.5 bg-black/30 rounded-lg border border-white/5 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">Raid Deaths</span>
                  <span className="text-sm font-bold text-red-400">{player.raidTelemetry.raidDeaths}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0b1311]/80 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]">
            <h3 className="text-lg font-bold font-fantasy tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-400">menu_book</span>
              Dungeon & Raid Expeditions
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              {player.dungeons.map((dungeon) => (
                <div
                  key={dungeon.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dungeon.theme === 'purple'
                          ? 'bg-purple-400'
                          : dungeon.theme === 'amber'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    ></span>
                    <span className="text-slate-200 font-semibold">{dungeon.name}</span>
                  </div>
                  <span
                    className={`font-bold px-2 py-0.5 rounded border ${
                      dungeon.theme === 'purple'
                        ? 'text-purple-300 bg-purple-500/10 border-purple-500/20'
                        : dungeon.theme === 'amber'
                        ? 'text-amber-300 bg-amber-500/10 border-amber-500/20'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    {dungeon.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                  Tracked Story Quests
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {player.trackedQuests.length} Registered
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {player.trackedQuests.map((quest) => (
                  <div
                    key={quest}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                    <span className="font-medium">{quest}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>First Recorded Login:</span>
              <span className="text-slate-300">{player.telemetry.firstRecordedLogin}</span>
            </div>
            <div className="flex justify-between">
              <span>Server Access:</span>
              <span className="text-emerald-400">{player.telemetry.serverAccess}</span>
            </div>
            <div className="flex justify-between">
              <span>Codex Completion:</span>
              <span className="text-amber-300">{player.telemetry.codexPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
