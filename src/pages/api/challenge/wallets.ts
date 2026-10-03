import type { APIRoute } from 'astro';
import { coinstats, config, json } from '../../../lib/challenge';

export const prerender = false;

// GET /api/challenge/wallets — current balance of every challenge wallet (CDN-cached 60 s)
export const GET: APIRoute = async () => {
  const { key, portfolios, started, start } = config();
  if (!started) return json({ started: false, start: Number.isNaN(start) ? null : new Date(start).toISOString() }, 300);

  const wallets = await Promise.all(portfolios.map(async (w) => {
    const data = await coinstats(key!, `/portfolio/coins?portfolioId=${encodeURIComponent(w.portfolioId)}&limit=100`);
    const tokens = ((data && data.result) || [])
      .map((c: any) => {
        const price = typeof c.price === 'object' ? Number(c.price?.USD) : Number(c.price);
        const amount = Number(c.count) || 0;
        return { symbol: c.coin?.symbol || '?', amount, value: amount * (price || 0) };
      })
      .filter((t: any) => t.value >= 1)
      .sort((a: any, b: any) => b.value - a.value);
    return { label: w.label, chain: w.chain, address: w.address, total: tokens.reduce((s: number, t: any) => s + t.value, 0), tokens };
  }));

  return json({ started: true, updatedAt: new Date().toISOString(), total: wallets.reduce((s, w) => s + w.total, 0), wallets }, 60);
};
