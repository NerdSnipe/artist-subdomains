// Shared date-descending sort helper for CV-style list data (exhibitions, events,
// publications, awards) that arrives as free-text year/date strings rather than
// real Date fields. Items with an unparseable/missing date sort to the bottom,
// and relative order otherwise reflects the order the artist entered them in
// (stable sort).

// Parses a free-text date/year string into a millisecond timestamp for sorting.
// Handles ISO dates, full date strings ("March 2026"), and bare years ("2024").
// Returns null when nothing usable can be extracted.
function parseSortableDate(value: string | undefined | null): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) return parsed;

  const yearMatch = trimmed.match(/\b(1[89]\d{2}|20\d{2}|21\d{2})\b/);
  if (yearMatch) {
    return Date.parse(`${yearMatch[1]}-01-01`);
  }

  return null;
}

// Returns a new array sorted descending (most recent first) by the date extracted
// via `getDate`. Items with no parseable date are pushed to the end, preserving
// their relative order.
export function sortByDateDesc<T>(items: T[], getDate: (item: T) => string | undefined | null): T[] {
  return items
    .map((item, index) => ({ item, index, ts: parseSortableDate(getDate(item)) }))
    .sort((a, b) => {
      if (a.ts === null && b.ts === null) return a.index - b.index;
      if (a.ts === null) return 1;
      if (b.ts === null) return -1;
      if (a.ts !== b.ts) return b.ts - a.ts;
      return a.index - b.index;
    })
    .map((entry) => entry.item);
}
