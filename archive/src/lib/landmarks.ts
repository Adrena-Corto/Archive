import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import type { Landmark, TimelineLandmark } from './timeline/types';

const landmarksFile = path.join(process.cwd(), 'src/data/landmarks.yaml');

export function getAllLandmarks(): Landmark[] {
  if (!fs.existsSync(landmarksFile)) {
    return [];
  }

  const content = fs.readFileSync(landmarksFile, 'utf-8');
  return yaml.parse(content) as Landmark[];
}

export function getTimelineLandmarks(): TimelineLandmark[] {
  const landmarks = getAllLandmarks();

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

export function getLandmarksByType(type: Landmark['type']): Landmark[] {
  return getAllLandmarks().filter(l => l.type === type);
}
