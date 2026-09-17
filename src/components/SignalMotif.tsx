'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The site's signature element: a small routing topology whose links carry a
 * pulse of light on a slow loop - call routing / network signal, made literal.
 *
 * The pulse is a single dash chased along each path. Setting pathLength +
 * pathSpacing to sum to exactly 1 makes the dash pattern tile the path once, so
 * animating pathOffset 0 → 1 loops seamlessly with no visible seam or second dash.
 *
 * Geometry and timing are deterministic (derived from index, never random) so
 * the server and client render identical markup.
 */

interface Node {
  x: number;
  y: number;
  r: number;
}

const NODES: Node[] = [
  { x: 90, y: 250, r: 4 },
  { x: 190, y: 560, r: 4 },
  { x: 355, y: 140, r: 4 },
  { x: 430, y: 400, r: 6 }, // regional hub
  { x: 640, y: 630, r: 4 },
  { x: 720, y: 230, r: 4 },
  { x: 900, y: 430, r: 8 }, // core
  { x: 1120, y: 200, r: 4 },
  { x: 1090, y: 640, r: 4 },
];

const EDGES: Array<[number, number]> = [
  [0, 3],
  [1, 3],
  [2, 3],
  [2, 5],
  [3, 5],
  [3, 4],
  [5, 6],
  [4, 6],
  [6, 7],
  [6, 8],
];

const line = (a: Node, b: Node) => `M${a.x} ${a.y} L${b.x} ${b.y}`;

export default function SignalMotif({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 1200 760"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fades the topology out toward the edges so it never fights the copy. */}
        <radialGradient id="motif-fade" cx="62%" cy="48%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="motif-mask">
          <rect width="1200" height="760" fill="url(#motif-fade)" />
        </mask>
      </defs>

      <g mask="url(#motif-mask)">
        {/* Resting links */}
        {EDGES.map(([from, to], i) => (
          <path
            key={`base-${i}`}
            d={line(NODES[from], NODES[to])}
            stroke="#3FA679"
            strokeOpacity={0.28}
            strokeWidth={1}
          />
        ))}

        {/* Travelling pulses - omitted entirely when motion is reduced */}
        {!reduced &&
          EDGES.map(([from, to], i) => (
            <motion.path
              key={`pulse-${i}`}
              d={line(NODES[from], NODES[to])}
              stroke="#5CBE92"
              strokeWidth={1.75}
              strokeLinecap="round"
              style={{ pathLength: 0.18, pathSpacing: 0.82 }}
              initial={{ pathOffset: 0 }}
              animate={{ pathOffset: 1 }}
              transition={{
                duration: 4.5 + ((i * 7) % 5) * 0.7,
                delay: (i * 0.83) % 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

        {/* Nodes: a solid core with a slow breathing ring */}
        {NODES.map((n, i) => (
          <g key={`node-${i}`}>
            {/* `r` is animated directly rather than via scale - SVG circles have
                no transform-box, so scaling would need a per-node
                transform-origin to keep the ring centred on its node. */}
            {!reduced && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                fill="none"
                stroke="#3FA679"
                strokeWidth={1}
                initial={{ r: n.r, opacity: 0.5 }}
                animate={{ r: [n.r, n.r * 3.4], opacity: [0.5, 0] }}
                transition={{
                  duration: 3.6 + ((i * 3) % 4) * 0.5,
                  delay: (i * 0.62) % 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={n.r} fill="#3FA679" fillOpacity={n.r > 5 ? 0.95 : 0.7} />
          </g>
        ))}
      </g>
    </svg>
  );
}
