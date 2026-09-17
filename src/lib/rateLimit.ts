/**
 * Fixed-window rate limiter, held in process memory.
 *
 * SCOPE / LIMITS - read before relying on this:
 *   • State lives in the Node process. Each serverless instance keeps its own
 *     counters, so on a platform that runs several instances the effective
 *     limit is (limit x instances). That is fine for keeping a bored spammer
 *     out of an enquiry inbox; it is NOT a defence against a distributed flood.
 *   • Restarts and cold starts clear all counters.
 *   • Keyed by client IP, which is spoofable behind a misconfigured proxy and
 *     shared by everyone behind one office NAT.
 *
 * If enquiry spam ever becomes a real problem, move this to Upstash Redis or
 * Vercel KV - the `check` signature is deliberately storage-agnostic so only
 * the body below has to change.
 */

interface Bucket {
  count: number;
  /** Epoch ms at which this window expires and the count resets. */
  resetAt: number;
}

export interface RateLimitRule {
  /** Max requests allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  /** Requests still available in the current window. */
  remaining: number;
  /** Whole seconds until the window resets - use for the Retry-After header. */
  retryAfterSeconds: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Drop expired windows so the Map cannot grow without bound on a long-lived
 * server. Cheap because it only runs when the Map is already sizeable.
 */
function sweep(now: number) {
  if (buckets.size < 500) return;
  const stale: string[] = [];
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) stale.push(key);
  });
  stale.forEach((key) => buckets.delete(key));
}

/**
 * Count one hit against `key` and report whether it is allowed.
 * Every rule in `rules` must pass; the tightest failure wins.
 */
export function check(key: string, rules: RateLimitRule[]): RateLimitResult {
  const now = Date.now();
  sweep(now);

  let allowed = true;
  let retryAfterMs = 0;
  let remaining = Number.POSITIVE_INFINITY;

  rules.forEach((rule, index) => {
    const bucketKey = `${key}:${index}`;
    const existing = buckets.get(bucketKey);
    const bucket: Bucket =
      existing && existing.resetAt > now
        ? existing
        : { count: 0, resetAt: now + rule.windowMs };

    bucket.count += 1;
    buckets.set(bucketKey, bucket);

    if (bucket.count > rule.limit) {
      allowed = false;
      retryAfterMs = Math.max(retryAfterMs, bucket.resetAt - now);
    }
    remaining = Math.min(remaining, Math.max(0, rule.limit - bucket.count));
  });

  return {
    ok: allowed,
    remaining: Number.isFinite(remaining) ? remaining : 0,
    retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
  };
}

/**
 * Best-effort client IP. `x-forwarded-for` is set by Vercel and most proxies;
 * the first entry is the original client. Falls back to a constant so a request
 * with no usable IP is still limited (as one shared bucket) rather than exempt.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
