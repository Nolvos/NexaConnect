/**
 * A faint echo of the hero motif, drawn above the four service cards: one rail,
 * four nodes, a pulse travelling left to right - "one provider, one connected
 * stack".
 *
 * The node positions are computed to land on the exact horizontal centre of each
 * card in a 4-column grid with GAP_REM gutters, so the connector stays aligned
 * with the cards at any container width. Only shown at `lg`, where that 4-column
 * grid actually exists.
 */

/** Must match the `gap-6` on the service grid this sits above. */
const GAP_REM = 1.5;

/** Horizontal centre of card `i` (0-indexed) within the grid. */
const cardCenter = (i: number) =>
  `calc((100% - ${3 * GAP_REM}rem) * ${(i + 0.5) / 4} + ${i * GAP_REM}rem)`;

/** Distance from the container edge to the first/last card centre. */
const RAIL_INSET = `calc((100% - ${3 * GAP_REM}rem) * 0.125)`;

export default function ServiceConnector() {
  return (
    <div className="relative hidden h-14 lg:block" aria-hidden="true">
      {/* Resting rail */}
      <div
        className="absolute top-2 h-px bg-line"
        style={{ left: RAIL_INSET, right: RAIL_INSET }}
      />

      {/* Travelling pulse, riding the same rail */}
      <div
        className="absolute top-2 h-px animate-rail-sweep bg-[linear-gradient(90deg,transparent_0%,rgba(63,166,121,0)_35%,#3FA679_50%,rgba(63,166,121,0)_65%,transparent_100%)] bg-[length:200%_100%] bg-no-repeat"
        style={{ left: RAIL_INSET, right: RAIL_INSET }}
      />

      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute top-2" style={{ left: cardCenter(i) }}>
          {/* Node */}
          <span className="absolute -left-[3px] -top-[3px] block h-1.5 w-1.5 rounded-full bg-signal" />
          {/* Drop line into the card below */}
          <span className="absolute -left-px top-1 block h-10 w-px bg-gradient-to-b from-line to-transparent" />
        </div>
      ))}
    </div>
  );
}
