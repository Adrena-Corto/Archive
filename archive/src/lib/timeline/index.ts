import type { Item } from '../items';
import { getAllItems } from '../items';
import { parseEra } from './date-parser';
import type { TimelineItem, TimelineLandmark, Landmark } from './types';

export function getTimelineItems(): TimelineItem[] {
  const items = getAllItems();

  return items.map((item) => {
    const parsed = parseEra(item.era);
    return {
      ...item,
      yearStart: parsed.yearStart,
      yearEnd: parsed.yearEnd,
      yearMidpoint: parsed.midpoint,
    };
  }).sort((a, b) => a.yearMidpoint - b.yearMidpoint);
}

export function getTimelineLandmarks(landmarks: Landmark[]): TimelineLandmark[] {
  return landmarks.map((landmark) => {
    let yearMidpoint: number;

    if (landmark.year !== undefined) {
      yearMidpoint = landmark.year;
    } else if (landmark.yearStart !== undefined && landmark.yearEnd !== undefined) {
      yearMidpoint = (landmark.yearStart + landmark.yearEnd) / 2;
    } else {
      yearMidpoint = 0;
    }

    return {
      ...landmark,
      yearMidpoint,
    };
  }).sort((a, b) => a.yearMidpoint - b.yearMidpoint);
}

export * from './types';
export * from './date-parser';
export * from './scale';
