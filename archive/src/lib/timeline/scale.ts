import { TIMELINE_BOUNDS, ZOOM_CONFIGS, type ZoomLevel } from './types';

export function yearToPercent(year: number): number {
  const { startYear, endYear } = TIMELINE_BOUNDS;
  const range = endYear - startYear;
  return ((year - startYear) / range) * 100;
}

export function percentToYear(percent: number): number {
  const { startYear, endYear } = TIMELINE_BOUNDS;
  const range = endYear - startYear;
  return startYear + (percent / 100) * range;
}

export function yearToPixel(year: number, containerWidth: number, zoom: number, panOffset: number): number {
  const percent = yearToPercent(year);
  const scaledWidth = containerWidth * zoom;
  return (percent / 100) * scaledWidth + panOffset;
}

export function pixelToYear(pixel: number, containerWidth: number, zoom: number, panOffset: number): number {
  const scaledWidth = containerWidth * zoom;
  const percent = ((pixel - panOffset) / scaledWidth) * 100;
  return percentToYear(percent);
}

export function getVisibleRange(
  containerWidth: number,
  zoom: number,
  panOffset: number
): { startYear: number; endYear: number } {
  const startYear = pixelToYear(0, containerWidth, zoom, panOffset);
  const endYear = pixelToYear(containerWidth, containerWidth, zoom, panOffset);
  return { startYear, endYear };
}

export function getZoomForYearsVisible(yearsVisible: number): number {
  const { startYear, endYear } = TIMELINE_BOUNDS;
  const totalYears = endYear - startYear;
  return totalYears / yearsVisible;
}

export function getYearsVisibleAtZoom(zoom: number): number {
  const { startYear, endYear } = TIMELINE_BOUNDS;
  const totalYears = endYear - startYear;
  return totalYears / zoom;
}

export function zoomLevelToScale(level: ZoomLevel): number {
  const config = ZOOM_CONFIGS[level];
  return getZoomForYearsVisible(config.yearsVisible);
}

export function scaleToZoomLevel(scale: number): ZoomLevel {
  const yearsVisible = getYearsVisibleAtZoom(scale);

  if (yearsVisible >= 2500) return 1;
  if (yearsVisible >= 250) return 2;
  if (yearsVisible >= 50) return 3;
  return 4;
}

export function clampPan(
  panOffset: number,
  containerWidth: number,
  zoom: number
): number {
  const scaledWidth = containerWidth * zoom;
  const maxPan = 0;
  const minPan = containerWidth - scaledWidth;

  return Math.max(minPan, Math.min(maxPan, panOffset));
}

export function centerOnYear(
  year: number,
  containerWidth: number,
  zoom: number
): number {
  const percent = yearToPercent(year);
  const scaledWidth = containerWidth * zoom;
  const yearPixel = (percent / 100) * scaledWidth;
  const targetPan = containerWidth / 2 - yearPixel;

  return clampPan(targetPan, containerWidth, zoom);
}

export interface AxisTick {
  year: number;
  label: string;
  major: boolean;
}

export function generateAxisTicks(
  startYear: number,
  endYear: number,
  zoomLevel: ZoomLevel
): AxisTick[] {
  const ticks: AxisTick[] = [];

  let majorInterval: number;
  let minorInterval: number;

  switch (zoomLevel) {
    case 1:
      majorInterval = 1000;
      minorInterval = 500;
      break;
    case 2:
      majorInterval = 100;
      minorInterval = 50;
      break;
    case 3:
      majorInterval = 50;
      minorInterval = 10;
      break;
    case 4:
      majorInterval = 10;
      minorInterval = 5;
      break;
  }

  const roundedStart = Math.floor(startYear / minorInterval) * minorInterval;
  const roundedEnd = Math.ceil(endYear / minorInterval) * minorInterval;

  for (let year = roundedStart; year <= roundedEnd; year += minorInterval) {
    const isMajor = year % majorInterval === 0;
    const label = formatTickLabel(year, zoomLevel);

    ticks.push({ year, label, major: isMajor });
  }

  return ticks;
}

function formatTickLabel(year: number, zoomLevel: ZoomLevel): string {
  if (year === 0) return '1 AD';

  if (year < 0) {
    const absYear = Math.abs(year);
    if (zoomLevel <= 2 && absYear >= 1000) {
      return `${(absYear / 1000).toFixed(absYear % 1000 === 0 ? 0 : 1)}k BC`;
    }
    return `${absYear} BC`;
  }

  if (zoomLevel <= 2 && year >= 1000) {
    return `${(year / 1000).toFixed(year % 1000 === 0 ? 0 : 1)}k AD`;
  }
  return `${year} AD`;
}
