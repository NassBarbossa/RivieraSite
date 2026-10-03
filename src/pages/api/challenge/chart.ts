import type { APIRoute } from 'astro';
import { coinstats, config, json } from '../../../lib/challenge';

export const prerender = false;

// GET /api/challenge/chart — one point per day since CHALLENGE_START (CDN-cached 1 h).
// The portfolios don't share timestamps, so each day sums every wallet's last known value.
export const GET: APIRoute = async () => {
  const { key, portfolios, started, start } = config();
  if (!started) return json({ started: false, chart: [] }, 300);

  const perWallet = await Promise.all(portfolios.map(async (w) => {
    const data = await coinstats(key!, `/portfolio/chart?portfolioId=${encodeURIComponent(w.portfolioId)}&type=all`);
    const perDay = new Map<number, number>();
    for (const [ts, value] of ((data && data.result) || []) as [number, number][]) {
      if (ts >= start) perDay.set(Math.floor(ts / 864e5), Number(value) || 0);   // keep the day's last point
    }
    return perDay;
  }));
  if (perWallet.some((m) => m.size === 0)) return json({ started: true, chart: [] }, 120);   // retry soon, don't pin a hole

  const days = [...new Set(perWallet.flatMap((m) => [...m.keys()]))].sort((a, b) => a - b);
  const lastKnown: (number | null)[] = perWallet.map(() => null);
  const chart: [number, number][] = [];
  for (const day of days) {
    perWallet.forEach((m, i) => { if (m.has(day)) lastKnown[i] = m.get(day)!; });
    if (lastKnown.every((v) => v !== null)) chart.push([day * 864e5 + 864e5 - 1, Math.round(lastKnown.reduce((s, v) => s! + v!, 0)!)]);
  }
  return json({ started: true, chart }, 3600);
};
