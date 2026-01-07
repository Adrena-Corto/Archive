import type { ParsedDate } from './types';

const CENTURY_MIDPOINTS: Record<string, number> = {
  '1st': 50, '2nd': 150, '3rd': 250, '4th': 350, '5th': 450,
  '6th': 550, '7th': 650, '8th': 750, '9th': 850, '10th': 950,
  '11th': 1050, '12th': 1150, '13th': 1250, '14th': 1350, '15th': 1450,
  '16th': 1550, '17th': 1650, '18th': 1750, '19th': 1850, '20th': 1950, '21st': 2050,
};

function parseYear(yearStr: string, era?: string): number {
  const num = parseInt(yearStr.replace(/[^\d]/g, ''), 10);
  if (isNaN(num)) return 0;

  const isBC = era?.toUpperCase().includes('BC') || era?.toUpperCase().includes('BCE');
  return isBC ? -num : num;
}

function parseCentury(centuryStr: string, era?: string): { start: number; end: number } {
  const match = centuryStr.match(/(\d+)(?:st|nd|rd|th)/i);
  if (!match) return { start: 0, end: 0 };

  const century = parseInt(match[1], 10);
  const isBC = era?.toUpperCase().includes('BC') || era?.toUpperCase().includes('BCE');

  if (isBC) {
    return {
      start: -(century * 100),
      end: -((century - 1) * 100),
    };
  }

  return {
    start: (century - 1) * 100,
    end: century * 100,
  };
}

export function parseEra(era: string): ParsedDate {
  const normalized = era.trim();

  // Handle century ranges: "6th-7th Century AD"
  const centuryRangeMatch = normalized.match(
    /(\d+)(?:st|nd|rd|th)[-–](\d+)(?:st|nd|rd|th)\s*Century\s*(BC|AD|BCE|CE)?/i
  );
  if (centuryRangeMatch) {
    const [, startCent, endCent, centEra] = centuryRangeMatch;
    const startParsed = parseCentury(`${startCent}th`, centEra);
    const endParsed = parseCentury(`${endCent}th`, centEra);

    const yearStart = Math.min(startParsed.start, endParsed.start);
    const yearEnd = Math.max(startParsed.end, endParsed.end);

    return {
      yearStart,
      yearEnd,
      midpoint: (yearStart + yearEnd) / 2,
      display: era,
    };
  }

  // Handle single century: "6th Century BC"
  const centuryMatch = normalized.match(
    /(\d+)(?:st|nd|rd|th)\s*Century\s*(BC|AD|BCE|CE)?/i
  );
  if (centuryMatch) {
    const [, cent, centEra] = centuryMatch;
    const parsed = parseCentury(`${cent}th`, centEra);

    return {
      yearStart: parsed.start,
      yearEnd: parsed.end,
      midpoint: (parsed.start + parsed.end) / 2,
      display: era,
    };
  }

  // Handle year ranges: "2400-2200 BC", "27 BC - 14 AD"
  const rangeMatch = normalized.match(
    /(\d+)\s*(BC|AD|BCE|CE)?\s*[-–]\s*(\d+)\s*(BC|AD|BCE|CE)?/i
  );
  if (rangeMatch) {
    let [, start, startEra, end, endEra] = rangeMatch;

    // If only one era specified, it applies to both (for same-era ranges)
    if (!startEra && endEra) startEra = endEra;
    if (startEra && !endEra) endEra = startEra;

    // Default to BC for ancient items if no era specified
    if (!startEra && !endEra) {
      const hasBC = normalized.toUpperCase().includes('BC');
      const hasAD = normalized.toUpperCase().includes('AD');
      if (!hasBC && !hasAD) {
        startEra = 'BC';
        endEra = 'BC';
      }
    }

    let yearStart = parseYear(start, startEra);
    let yearEnd = parseYear(end, endEra);

    // Ensure start < end
    if (yearStart > yearEnd) {
      [yearStart, yearEnd] = [yearEnd, yearStart];
    }

    return {
      yearStart,
      yearEnd,
      midpoint: (yearStart + yearEnd) / 2,
      display: era,
    };
  }

  // Handle single year: "476 AD", "2400 BC"
  const singleMatch = normalized.match(/(\d+)\s*(BC|AD|BCE|CE)/i);
  if (singleMatch) {
    const [, year, yearEra] = singleMatch;
    const parsedYear = parseYear(year, yearEra);

    return {
      yearStart: parsedYear,
      yearEnd: parsedYear,
      midpoint: parsedYear,
      display: era,
    };
  }

  // Handle plain year ranges without era: "2400-2200" (assume BC for ancient)
  const plainRangeMatch = normalized.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (plainRangeMatch) {
    const [, start, end] = plainRangeMatch;
    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    // If numbers are large (>1000), assume BC
    const isAncient = startNum > 1000 || endNum > 1000;
    const yearStart = isAncient ? -Math.max(startNum, endNum) : Math.min(startNum, endNum);
    const yearEnd = isAncient ? -Math.min(startNum, endNum) : Math.max(startNum, endNum);

    return {
      yearStart,
      yearEnd,
      midpoint: (yearStart + yearEnd) / 2,
      display: era,
    };
  }

  // Fallback: try to extract any number
  const numMatch = normalized.match(/\d+/);
  const fallbackYear = numMatch ? -parseInt(numMatch[0], 10) : 0;

  return {
    yearStart: fallbackYear,
    yearEnd: fallbackYear,
    midpoint: fallbackYear,
    display: era,
  };
}

export function formatYear(year: number): string {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }
  return `${year} AD`;
}
