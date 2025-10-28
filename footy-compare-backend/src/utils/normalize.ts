export function normalizeTeam(r: any) {
  const t = r.team ?? r;
  return {
    id: t.id,
    name: t.name,
    shortName: t.code ?? t.name,
    country: r.team?.country ?? r.country ?? null,
    founded: t.founded ?? null,
    logoUrl: t.logo ?? null,
  };
}

export function normalizeLeague(r: any) {
  const lg = r.league ?? r;
  return {
    id: lg.id,
    name: lg.name,
    country: r.country?.name ?? r.country ?? null,
    type: lg.type ?? null,
  };
}

export function pickPlayerCore(r: any) {
  const p = r.player ?? r;
  return {
    id: p.id,
    name: p.name,
    position: p.position ?? null,
    birthDate: p.birth?.date ? new Date(p.birth.date) : null,
    nationality: p.nationality ?? null,
    photoUrl: p.photo ?? null,
  };
}

export function mapPlayerStats(r: any) {
  const stats = r.statistics?.[0];
  if (!stats) return {};
  const s = stats;
  return {
    teamId: s.team?.id,
    minutes: Number(s.games?.minutes ?? 0),
    goals: Number(s.goals?.total ?? 0),
    assists: Number(s.goals?.assists ?? 0),
    shots: Number(s.shots?.total ?? 0),
    xg: s.expected?.goals ?? null,
    xa: s.expected?.assists ?? null,
  };
}
