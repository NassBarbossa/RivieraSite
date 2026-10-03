// CoinStats access for the /challenge page. The API key stays server-side.
//
// Env (Vercel > Project > Settings > Environment Variables):
//   COINSTATS_API_KEY  key from https://openapi.coinstats.app
//   CHALLENGE_PORTFOLIOS  JSON list of the CoinStats portfolios that make up the challenge, e.g.
//     [{"label":"Solana","chain":"solana","portfolioId":"e4f96af0420c26e0","address":"FRj7…"}, …]
//   CHALLENGE_START    start date (e.g. 2026-10-15). Before it the page shows "démarre bientôt";
//                      the curve keeps only points from this date (older history holds deposits
//                      and withdrawals that are not part of the challenge).

const API = 'https://openapiv1.coinstats.app';

export type Portfolio = { label: string; chain: string; portfolioId: string; address: string };

const env = (k: string): string | undefined => (import.meta.env[k] as string | undefined) ?? process.env[k];

export function config() {
  const start = env('CHALLENGE_START') ? Date.parse(env('CHALLENGE_START')!) : NaN;
  let portfolios: Portfolio[] = [];
  try { portfolios = JSON.parse(env('CHALLENGE_PORTFOLIOS') || '[]'); } catch { portfolios = []; }
  const key = env('COINSTATS_API_KEY');
  const started = !!key && portfolios.length > 0 && !Number.isNaN(start) && Date.now() >= start;
  return { key, start, portfolios, started };
}

export async function coinstats(key: string, path: string): Promise<any | null> {
  const r = await fetch(API + path, { headers: { 'X-API-KEY': key, accept: 'application/json' } });
  if (!r.ok) return null;
  return r.json();
}

export function json(body: unknown, sMaxAge: number) {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // cached on Vercel's CDN: CoinStats is hit at most once per window, whatever the traffic
      'Cache-Control': `public, max-age=0, s-maxage=${sMaxAge}, stale-while-revalidate=${sMaxAge * 5}`,
    },
  });
}
