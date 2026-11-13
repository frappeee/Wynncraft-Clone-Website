import { MOCK_PLAYERS } from '../data/mockPlayers';
import { getStoredToken } from './wynnAuth';

const CLASS_EMOJIS = {
  WARRIOR: '🛡️',
  KNIGHT: '🛡️',
  ARCHER: '🏹',
  HUNTER: '🏹',
  MAGE: '🔮',
  DARKWIZARD: '🔮',
  ASSASSIN: '🗡️',
  NINJA: '🗡️',
  SHAMAN: '🪶',
  SKYSEER: '🪶',
};

const PROFESSION_ICONS = {
  farming: '🌾',
  fishing: '🎣',
  mining: '⛏️',
  jeweling: '💎',
  woodcutting: '🪓',
  alchemism: '🧪',
  scribing: '📜',
  cooking: '🍳',
  woodworking: '🪵',
  weaponsmithing: '⚔️',
  armouring: '🛡️',
  tailoring: '🧵',
};

async function fetchWithCorsFallback(path, headers = {}) {
  const isDev = import.meta.env.DEV;
  const urls = [];

  if (isDev) {
    urls.push(`/api/wynn${path}`);
  }
  urls.push(`https://api.wynncraft.com${path}`);
  urls.push(`https://corsproxy.io/?${encodeURIComponent(`https://api.wynncraft.com${path}`)}`);
  urls.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.wynncraft.com${path}`)}`);

  let lastError = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers });
      if (res.ok || res.status === 404) {
        return res;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Network error or CORS restriction.');
}

export async function searchWynncraft(query) {
  if (!query || query.trim().length < 2) return null;
  const clean = query.trim().toLowerCase();

  const headers = { Accept: 'application/json' };
  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetchWithCorsFallback(`/v3/search/${encodeURIComponent(query.trim())}`, headers);

    if (res.ok) {
      const data = await res.json();
      const results = parseSearchResults(data, query.trim());
      if (results.players.length > 0 || results.guilds.length > 0) {
        return results;
      }
    }
  } catch {
    return getMockSearchResults(clean);
  }

  return getMockSearchResults(clean);
}

function parseSearchResults(data, query) {
  const players = [];
  const guilds = [];

  if (!data || typeof data !== 'object') {
    return { players, guilds };
  }

  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === 'object') {
      if (val.username) {
        players.push({
          name: val.username,
          uuid: key,
          type: 'player',
          subtitle: val.rank ? `Rank: ${val.rank}` : 'Player Codex',
          rank: val.rank,
          supportRank: val.supportRank,
        });
      } else if (val.prefix || val.members) {
        guilds.push({
          name: val.name || key,
          prefix: val.prefix || '',
        });
      }
    }
  }

  if (players.length === 0 && Array.isArray(data.players)) {
    data.players.slice(0, 10).forEach((p) => {
      if (typeof p === 'string') {
        players.push({ name: p, type: 'player' });
      } else if (p && typeof p === 'object') {
        players.push({
          name: p.username || p.name || query,
          uuid: p.uuid,
          type: 'player',
          subtitle: p.rank ? `Rank: ${p.rank}` : 'Player Codex',
          rank: p.rank,
          supportRank: p.supportRank,
        });
      }
    });
  } else if (players.length === 0 && data.players && typeof data.players === 'object') {
    Object.entries(data.players).slice(0, 10).forEach(([key, val]) => {
      const username = typeof val === 'object' && val?.username ? val.username : key;
      players.push({
        name: username,
        uuid: key,
        type: 'player',
        subtitle: typeof val === 'object' && val?.rank ? `Rank: ${val.rank}` : 'Player Codex',
      });
    });
  }

  if (guilds.length === 0 && Array.isArray(data.guilds)) {
    data.guilds.slice(0, 5).forEach((g) => {
      guilds.push({
        name: typeof g === 'string' ? g : g.name || String(g),
        prefix: typeof g === 'object' ? g.prefix || '' : '',
      });
    });
  } else if (guilds.length === 0 && data.guilds && typeof data.guilds === 'object') {
    Object.entries(data.guilds).slice(0, 5).forEach(([key, val]) => {
      guilds.push({
        name: typeof val === 'object' && val?.name ? val.name : key,
        prefix: typeof val === 'object' && val?.prefix ? val.prefix : '',
      });
    });
  }

  if (Array.isArray(data) && players.length === 0) {
    for (const item of data) {
      if (typeof item === 'string') {
        players.push({ name: item, type: 'player' });
      } else if (item && typeof item === 'object') {
        if (item.prefix) {
          guilds.push({ name: item.name || 'Guild', prefix: item.prefix });
        } else {
          players.push({
            name: item.username || item.name || query,
            uuid: item.uuid,
            type: 'player',
          });
        }
      }
    }
  }

  if (players.length === 0 && query.length >= 2) {
    players.push({ name: query, type: 'player' });
  }

  return {
    players: players.slice(0, 10),
    guilds: guilds.slice(0, 5),
  };
}

function getMockSearchResults(clean) {
  const players = [];
  const guilds = [];

  for (const [key, p] of Object.entries(MOCK_PLAYERS)) {
    if (key.includes(clean) || p.username.toLowerCase().includes(clean)) {
      players.push({
        name: p.username,
        type: 'player',
        subtitle: `Lv. ${p.characters[0]?.level || 106} ${p.characters[0]?.name || 'Adventurer'}`,
        guild: p.guild ? `Guild: ${p.guild.name}` : undefined,
      });
    }
  }

  if ('kingdomofragni'.includes(clean)) {
    guilds.push({ name: 'KingdomOfRagni', prefix: 'KOR' });
  }
  if ('spectral cabbage'.includes(clean) || 'spc'.includes(clean)) {
    guilds.push({ name: 'Spectral Cabbage', prefix: 'SPC' });
  }
  if ('wynncraft staff'.includes(clean) || 'wyn'.includes(clean)) {
    guilds.push({ name: 'Wynncraft Staff', prefix: 'WYN' });
  }

  if (players.length === 0) {
    players.push({
      name: clean.charAt(0).toUpperCase() + clean.slice(1),
      type: 'player',
      subtitle: 'Query Wynncraft Player Codex',
    });
  }

  return { players, guilds };
}

export async function fetchWynnPlayer(username) {
  const clean = username.trim().toLowerCase();

  const headers = { Accept: 'application/json' };
  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetchWithCorsFallback(`/v3/player/${encodeURIComponent(username.trim())}`, headers);

    if (res.ok) {
      const data = await res.json();
      return formatApiPlayer(data);
    }

    if (res.status === 404) {
      if (MOCK_PLAYERS[clean]) {
        return MOCK_PLAYERS[clean];
      }
      throw new Error(`Player "${username}" was not found on Wynncraft.`);
    }

    throw new Error(`Wynncraft API error (status ${res.status}).`);
  } catch (err) {
    if (MOCK_PLAYERS[clean]) {
      return MOCK_PLAYERS[clean];
    }
    throw err;
  }
}

function formatApiPlayer(api) {
  const chars = [];
  const rawChars = api.characters || {};

  let totalCharsLevel = 0;
  for (const [id, charData] of Object.entries(rawChars)) {
    const cType = (charData.type || 'WARRIOR').toUpperCase();
    const reskin = charData.reskin ? charData.reskin.toUpperCase() : null;
    const emoji = CLASS_EMOJIS[reskin] || CLASS_EMOJIS[cType] || '⚔️';
    const lvl = charData.level || 1;
    totalCharsLevel += lvl;

    const profs = [];
    if (charData.professions) {
      for (const [pKey, pVal] of Object.entries(charData.professions)) {
        profs.push({
          name: pKey.charAt(0).toUpperCase() + pKey.slice(1),
          icon: PROFESSION_ICONS[pKey.toLowerCase()] || '✨',
          level: pVal.level || 0,
          xpPercent: Math.round(pVal.xpPercent || 0),
        });
      }
      profs.sort((a, b) => b.level - a.level);
      if (profs[0]) profs[0].highlight = true;
    }

    chars.push({
      id: id,
      name: charData.reskin || charData.type || 'Adventurer',
      type: cType,
      reskin: charData.reskin ? `Reskin of ${cType}` : `${cType} Class`,
      subtitle: charData.nickname || `${cType} Specialist`,
      emoji: emoji,
      level: lvl,
      characterTotalLevel: charData.totalLevel || lvl,
      xp: `${(charData.xp || 0).toLocaleString()} XP`,
      xpPercent: Math.min(100, Math.round(charData.xpPercent || 0)),
      isMaxXp: lvl >= 106,
      metrics: {
        mobsSlain: charData.mobsKilled || 0,
        chestsLooted: charData.chestsFound || 0,
        questsDone: (charData.quests && charData.quests.length) || 0,
        discoveries: charData.discoveries || 0,
        cavesExplored: charData.caves || 0,
        blocksWalked: charData.blocksWalked || 0,
        itemsIdentified: charData.itemsIdentified || 0,
        totalLogins: charData.logins || 0,
      },
      pvp: {
        kills: (charData.pvp && charData.pvp.kills) || 0,
        deaths: (charData.pvp && charData.pvp.deaths) || 0,
        kd: (charData.pvp && charData.pvp.deaths > 0
          ? ((charData.pvp.kills || 0) / charData.pvp.deaths).toFixed(2)
          : (charData.pvp?.kills || 0).toString()),
      },
      wars: charData.wars || 0,
      dungeonsCleared: (charData.dungeons?.list?.length) || 0,
      raidsCompleted: (charData.raids?.list?.length) || 0,
      professions: profs,
    });
  }

  chars.sort((a, b) => b.level - a.level);

  return {
    username: api.username,
    aka: api.nickname || api.username,
    uuid: api.uuid || '00000000-0000-0000-0000-000000000000',
    rank: api.rank || 'Player',
    rankColor: api.rank === 'Administrator' ? '#ff5555' : '#52d65b',
    supportRank: api.supportRank || 'MEMBER',
    isOnline: Boolean(api.online),
    firstJoin: api.firstJoin || new Date().toISOString(),
    lastJoin: api.lastJoin || new Date().toISOString(),
    playtime: Math.round(api.playtime || 0),
    totalLevel: api.globalData?.totalLevel || totalCharsLevel,
    peakLevel: api.globalData?.totalLevel || totalCharsLevel,
    contentRank: api.ranking?.playerContentRank ? `#${api.ranking.playerContentRank}` : '#--',
    contentRankPrev: '#--',
    guild: {
      name: api.guild?.name || 'Unaffiliated',
      prefix: api.guild?.prefix || 'NONE',
      rank: api.guild?.rank || 'MEMBER',
      stars: '★★★★☆',
    },
    raidTelemetry: {
      damageDealt: api.globalData?.raids?.damageDealt || 0,
      damageAbsorbed: api.globalData?.raids?.damageAbsorbed || 0,
      healingDone: api.globalData?.raids?.healingDone || 0,
      buffsTaken: api.globalData?.raids?.buffsTaken || 0,
      raidDeaths: api.globalData?.raids?.deaths || 0,
    },
    dungeons: [
      { name: 'Decrepit Sewers', type: 'Dungeon', count: 'Completed', theme: 'emerald' },
      { name: 'Nest of the Grootslangs', type: 'Raid', count: 'Active', theme: 'amber' },
    ],
    trackedQuests: api.characters && Object.values(api.characters)[0]?.quests?.slice(0, 3) || ['King’s Recruit'],
    telemetry: {
      firstRecordedLogin: api.firstJoin ? api.firstJoin.slice(0, 10) : '2020-01-01',
      serverAccess: 'Public Realm Access',
      codexPoints: 'Synchronized',
    },
    characters: chars.length > 0 ? chars : MOCK_PLAYERS.nepmia.characters,
  };
}
