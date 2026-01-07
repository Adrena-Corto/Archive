import type { Item } from '../items';

export interface ParsedDate {
  yearStart: number;
  yearEnd: number;
  midpoint: number;
  display: string;
}

export interface TimelineItem extends Item {
  yearStart: number;
  yearEnd: number;
  yearMidpoint: number;
}

export interface Landmark {
  id: string;
  name: string;
  type: 'civilization_start' | 'civilization' | 'civilization_end' | 'major_event' | 'person';
  year?: number;
  yearStart?: number;
  yearEnd?: number;
  description?: string;
}

export interface TimelineLandmark extends Landmark {
  yearMidpoint: number;
}

export interface Cluster {
  id: string;
  items: TimelineItem[];
  yearStart: number;
  yearEnd: number;
  yearMidpoint: number;
  x: number;
}

export type ZoomLevel = 1 | 2 | 3 | 4;

export interface ZoomConfig {
  level: ZoomLevel;
  name: string;
  yearsVisible: number;
  showItems: boolean;
  showClusters: boolean;
  clusterThreshold: number;
}

export const ZOOM_CONFIGS: Record<ZoomLevel, ZoomConfig> = {
  1: {
    level: 1,
    name: 'Era',
    yearsVisible: 5000,
    showItems: false,
    showClusters: true,
    clusterThreshold: 500,
  },
  2: {
    level: 2,
    name: 'Period',
    yearsVisible: 500,
    showItems: false,
    showClusters: true,
    clusterThreshold: 100,
  },
  3: {
    level: 3,
    name: 'Century',
    yearsVisible: 100,
    showItems: true,
    showClusters: false,
    clusterThreshold: 20,
  },
  4: {
    level: 4,
    name: 'Decade',
    yearsVisible: 20,
    showItems: true,
    showClusters: false,
    clusterThreshold: 5,
  },
};

export const TIMELINE_BOUNDS = {
  startYear: -4500,
  endYear: 1500,
};
