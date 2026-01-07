import { Application, Container, Graphics, Text, TextStyle, FederatedPointerEvent } from 'pixi.js';
import type { TimelineItem, TimelineLandmark, ZoomLevel } from './types';
import { TIMELINE_BOUNDS, ZOOM_CONFIGS } from './types';

interface Dot {
  item: TimelineItem;
  graphics: Graphics;
  label: Text | null;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  hovered: boolean;
}

interface LandmarkBar {
  landmark: TimelineLandmark;
  graphics: Graphics;
  label: Text;
  startX: number;
  endX: number;
  y: number;
  row: number;  // For staggered positioning
}

interface PersonMarker {
  landmark: TimelineLandmark;
  graphics: Graphics;
  label: Text;
  x: number;
  targetX: number;
  y: number;
  row: number;  // For staggered positioning
}

interface TooltipData {
  title: string;
  subtitle: string;
  x: number;
  y: number;
}

export class PixiTimeline {
  private app: Application;
  private canvas: HTMLCanvasElement;

  // Containers
  private landmarksContainer!: Container;
  private personsContainer!: Container;
  private axisContainer!: Container;
  private dotsContainer!: Container;
  private labelsContainer!: Container;
  private tooltipContainer!: Container;

  // Data
  private items: TimelineItem[];
  private landmarks: TimelineLandmark[];
  private dots: Dot[] = [];
  private landmarkBars: LandmarkBar[] = [];
  private personMarkers: PersonMarker[] = [];

  // Viewport state
  private viewportStart: number;
  private viewportEnd: number;
  private width: number = 800;
  private height: number = 500;

  // Interaction state
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartViewportStart: number = 0;
  private dragStartViewportEnd: number = 0;

  // Touch state
  private lastTouchDistance: number = 0;
  private lastTouchCenter: number = 0;

  // Tooltip
  private tooltipGraphics: Graphics | null = null;
  private tooltipText: Text | null = null;
  private tooltipSubtext: Text | null = null;
  private currentTooltip: TooltipData | null = null;

  // Cursor tracking line
  private cursorLineContainer!: Container;
  private cursorLine: Graphics | null = null;
  private cursorYearText: Text | null = null;
  private mouseX: number = -1;

  // Config
  private baseUrl: string;
  private readonly AXIS_Y_RATIO = 0.88;        // Axis position (near bottom, with bottom padding)
  private readonly MIN_Y_RATIO = 0.55;         // Dots can stack up to here
  private readonly LANDMARK_Y_RATIO = 0.42;    // Landmarks (top padding)
  private readonly LANDMARK_SPACING = 28;      // Vertical spacing between landmark rows
  private readonly DOT_RADIUS = 6;
  private readonly DOT_Y_RATIO = 0.78;         // Collection items near axis
  private readonly PERSON_Y_RATIO = 0.52;      // People - below landmarks
  private readonly PERSON_SPACING = 26;        // Vertical spacing between person rows
  private readonly COLORS = {
    cyan: 0x22d3ee,
    gold: 0xf59e0b,
    purple: 0xa855f7,   // Purple for famous people
    surface: 0x1a1a1a,
    border: 0x333333,
    textDim: 0x6b7280,
    textMuted: 0x9ca3af,
  };

  constructor(
    canvas: HTMLCanvasElement,
    items: TimelineItem[],
    landmarks: TimelineLandmark[],
    baseUrl: string = '/Archive'
  ) {
    this.canvas = canvas;
    this.items = items;
    this.landmarks = landmarks;
    this.baseUrl = baseUrl;
    this.app = new Application();

    // Initialize viewport to show all items
    const years = items.map(i => i.yearMidpoint);
    const minYear = years.length > 0 ? Math.min(...years) : TIMELINE_BOUNDS.startYear;
    const maxYear = years.length > 0 ? Math.max(...years) : TIMELINE_BOUNDS.endYear;
    const padding = (maxYear - minYear) * 0.2;

    this.viewportStart = Math.max(TIMELINE_BOUNDS.startYear, minYear - padding);
    this.viewportEnd = Math.min(TIMELINE_BOUNDS.endYear, maxYear + padding);
  }

  async init(): Promise<void> {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    await this.app.init({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      backgroundColor: this.COLORS.surface,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    this.setupContainers();
    this.createDots();
    this.createLandmarkBars();
    this.createPersonMarkers();
    this.setupInteractions();
    this.setupTooltip();
    this.setupCursorLine();

    // Start render loop
    this.app.ticker.add(() => this.update());

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  private setupContainers(): void {
    this.cursorLineContainer = new Container();
    this.personsContainer = new Container();
    this.landmarksContainer = new Container();
    this.axisContainer = new Container();
    this.dotsContainer = new Container();
    this.labelsContainer = new Container();
    this.tooltipContainer = new Container();

    this.app.stage.addChild(this.cursorLineContainer);
    this.app.stage.addChild(this.personsContainer);
    this.app.stage.addChild(this.landmarksContainer);
    this.app.stage.addChild(this.axisContainer);
    this.app.stage.addChild(this.dotsContainer);
    this.app.stage.addChild(this.labelsContainer);
    this.app.stage.addChild(this.tooltipContainer);
  }

  private createDots(): void {
    for (const item of this.items) {
      const graphics = new Graphics();
      // Small diamond shape (like a gem/coin)
      const size = 5;
      graphics.moveTo(0, -size);
      graphics.lineTo(size, 0);
      graphics.lineTo(0, size);
      graphics.lineTo(-size, 0);
      graphics.closePath();
      graphics.fill({ color: this.COLORS.cyan, alpha: 0.9 });

      // Enable interaction
      graphics.eventMode = 'static';
      graphics.cursor = 'pointer';

      const dot: Dot = {
        item,
        graphics,
        label: null,
        x: 0,
        y: this.height * this.DOT_Y_RATIO,
        targetX: 0,
        targetY: this.height * this.DOT_Y_RATIO,
        vx: 0,
        vy: 0,
        baseRadius: this.DOT_RADIUS,
        hovered: false,
      };

      // Create label
      const labelStyle = new TextStyle({
        fontFamily: 'monospace',
        fontSize: 10,
        fill: this.COLORS.cyan,
      });
      dot.label = new Text({ text: this.truncateName(item.name, 20), style: labelStyle });
      dot.label.anchor.set(0.5, 0);
      dot.label.alpha = 0;
      this.labelsContainer.addChild(dot.label);

      // Hover events
      graphics.on('pointerover', () => this.onDotHover(dot, true));
      graphics.on('pointerout', () => this.onDotHover(dot, false));
      graphics.on('pointertap', () => this.onDotClick(dot));

      this.dots.push(dot);
      this.dotsContainer.addChild(graphics);
    }
  }

  private createLandmarkBars(): void {
    // Sort landmarks by start year to help with row assignment
    // Filter out 'person' type - those are handled separately
    const sortedLandmarks = [...this.landmarks]
      .filter(l => l.yearStart !== undefined && l.yearEnd !== undefined && l.type !== 'person')
      .sort((a, b) => a.yearStart! - b.yearStart!);

    // Track which rows have which year ranges occupied
    const rows: { start: number; end: number }[][] = [];

    for (const landmark of sortedLandmarks) {
      const graphics = new Graphics();
      const labelStyle = new TextStyle({
        fontFamily: 'monospace',
        fontSize: 9,
        fill: this.COLORS.gold,
      });
      const label = new Text({ text: landmark.name, style: labelStyle });
      label.anchor.set(0.5, 1);
      label.alpha = 0.7;

      const landmarkStart = landmark.yearStart!;
      const landmarkEnd = landmark.yearEnd!;
      const buffer = 100; // Year buffer to prevent visual crowding

      // Find first row where this landmark doesn't overlap with any existing
      let assignedRow = 0;
      let foundRow = false;

      for (let i = 0; i < rows.length; i++) {
        const rowOccupied = rows[i];
        let hasOverlap = false;

        for (const occupied of rowOccupied) {
          // Check if this landmark overlaps with any occupied range in this row
          if (!(landmarkEnd + buffer < occupied.start || landmarkStart - buffer > occupied.end)) {
            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) {
          assignedRow = i;
          foundRow = true;
          break;
        }
      }

      if (!foundRow) {
        assignedRow = rows.length;
        rows.push([]);
      }

      // Add this landmark's range to the row
      rows[assignedRow].push({ start: landmarkStart, end: landmarkEnd });

      const bar: LandmarkBar = {
        landmark,
        graphics,
        label,
        startX: 0,
        endX: 0,
        y: this.height * this.LANDMARK_Y_RATIO,
        row: assignedRow,
      };

      this.landmarkBars.push(bar);
      this.landmarksContainer.addChild(graphics);
      this.landmarksContainer.addChild(label);
    }
  }

  private createPersonMarkers(): void {
    // Filter only 'person' type landmarks and sort by year
    const persons = this.landmarks
      .filter(l => l.type === 'person')
      .sort((a, b) => a.yearMidpoint - b.yearMidpoint);

    // Track which rows have which year ranges occupied (using midpoint +/- buffer for label width)
    const rows: { start: number; end: number }[][] = [];
    const yearBuffer = 80; // Years buffer to account for label width horizontally

    for (const person of persons) {
      const graphics = new Graphics();

      // Thin vertical line marker instead of circle
      graphics.rect(-1, -6, 2, 12);
      graphics.fill({ color: this.COLORS.purple, alpha: 0.9 });

      const labelStyle = new TextStyle({
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 9,
        fill: this.COLORS.purple,
        fontWeight: '500',
      });
      const label = new Text({ text: person.name, style: labelStyle });
      label.anchor.set(0.5, 0);
      label.alpha = 0.85;

      const personYear = person.yearMidpoint;

      // Find first row where this person doesn't overlap with any existing
      let assignedRow = 0;
      let foundRow = false;

      for (let i = 0; i < rows.length; i++) {
        const rowOccupied = rows[i];
        let hasOverlap = false;

        for (const occupied of rowOccupied) {
          // Check if this person overlaps with any occupied range in this row
          if (!(personYear + yearBuffer < occupied.start || personYear - yearBuffer > occupied.end)) {
            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) {
          assignedRow = i;
          foundRow = true;
          break;
        }
      }

      if (!foundRow) {
        assignedRow = rows.length;
        rows.push([]);
      }

      // Add this person's range to the row
      rows[assignedRow].push({ start: personYear - yearBuffer, end: personYear + yearBuffer });

      const marker: PersonMarker = {
        landmark: person,
        graphics,
        label,
        x: 0,
        targetX: 0,
        y: this.height * this.PERSON_Y_RATIO,
        row: assignedRow,
      };

      this.personMarkers.push(marker);
      this.personsContainer.addChild(graphics);
      this.personsContainer.addChild(label);
    }
  }

  private setupTooltip(): void {
    this.tooltipGraphics = new Graphics();
    this.tooltipText = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 13,
        fill: 0xffffff,
        fontWeight: '600',
      }),
    });
    this.tooltipSubtext = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: 'monospace',
        fontSize: 11,
        fill: this.COLORS.cyan,
      }),
    });

    this.tooltipContainer.addChild(this.tooltipGraphics);
    this.tooltipContainer.addChild(this.tooltipText);
    this.tooltipContainer.addChild(this.tooltipSubtext);
    this.tooltipContainer.visible = false;
  }

  private setupCursorLine(): void {
    this.cursorLine = new Graphics();
    this.cursorYearText = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: 'monospace',
        fontSize: 11,
        fill: this.COLORS.cyan,
        fontWeight: '600',
      }),
    });
    this.cursorYearText.anchor.set(0.5, 1);

    this.cursorLineContainer.addChild(this.cursorLine);
    this.cursorLineContainer.addChild(this.cursorYearText);
    this.cursorLineContainer.visible = false;
  }

  private setupInteractions(): void {
    const canvas = this.canvas;

    // Wheel zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.handleZoom(e.deltaY > 0 ? 0.9 : 1.1, e.offsetX);
    }, { passive: false });

    // Mouse drag
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.offsetX;
      this.dragStartViewportStart = this.viewportStart;
      this.dragStartViewportEnd = this.viewportEnd;
      canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('mousemove', (e) => {
      // Track cursor position for the vertical line
      this.mouseX = e.offsetX;

      if (this.isDragging) {
        const dx = e.offsetX - this.dragStartX;
        const yearRange = this.dragStartViewportEnd - this.dragStartViewportStart;
        const yearPerPixel = yearRange / this.width;
        const yearDelta = -dx * yearPerPixel;

        this.viewportStart = this.dragStartViewportStart + yearDelta;
        this.viewportEnd = this.dragStartViewportEnd + yearDelta;
        this.clampViewport();
      }
    });

    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.mouseX = -1; // Hide cursor line when mouse leaves
      canvas.style.cursor = 'grab';
    });

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX;
        this.dragStartViewportStart = this.viewportStart;
        this.dragStartViewportEnd = this.viewportEnd;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        this.lastTouchDistance = this.getTouchDistance(e.touches);
        this.lastTouchCenter = this.getTouchCenter(e.touches);
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && this.isDragging) {
        const dx = e.touches[0].clientX - this.dragStartX;
        const yearRange = this.dragStartViewportEnd - this.dragStartViewportStart;
        const yearPerPixel = yearRange / this.width;
        const yearDelta = -dx * yearPerPixel;

        this.viewportStart = this.dragStartViewportStart + yearDelta;
        this.viewportEnd = this.dragStartViewportEnd + yearDelta;
        this.clampViewport();
      } else if (e.touches.length === 2) {
        const newDistance = this.getTouchDistance(e.touches);
        const newCenter = this.getTouchCenter(e.touches);
        const zoomFactor = newDistance / this.lastTouchDistance;

        this.handleZoom(zoomFactor, newCenter);
        this.lastTouchDistance = newDistance;
        this.lastTouchCenter = newCenter;
      }
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    canvas.style.cursor = 'grab';
  }

  private getTouchDistance(touches: TouchList): number {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getTouchCenter(touches: TouchList): number {
    return (touches[0].clientX + touches[1].clientX) / 2;
  }

  private handleZoom(factor: number, centerX: number): void {
    const currentSpan = this.viewportEnd - this.viewportStart;
    const newSpan = currentSpan / factor;

    // Clamp zoom
    const minSpan = 50; // Minimum 50 years visible
    const maxSpan = TIMELINE_BOUNDS.endYear - TIMELINE_BOUNDS.startYear;
    const clampedSpan = Math.max(minSpan, Math.min(maxSpan, newSpan));

    // Zoom centered on mouse position
    const ratio = centerX / this.width;
    const centerYear = this.viewportStart + currentSpan * ratio;

    this.viewportStart = centerYear - clampedSpan * ratio;
    this.viewportEnd = centerYear + clampedSpan * (1 - ratio);
    this.clampViewport();
  }

  private clampViewport(): void {
    const span = this.viewportEnd - this.viewportStart;

    if (this.viewportStart < TIMELINE_BOUNDS.startYear) {
      this.viewportStart = TIMELINE_BOUNDS.startYear;
      this.viewportEnd = this.viewportStart + span;
    }

    if (this.viewportEnd > TIMELINE_BOUNDS.endYear) {
      this.viewportEnd = TIMELINE_BOUNDS.endYear;
      this.viewportStart = this.viewportEnd - span;
    }
  }

  private yearToPixel(year: number): number {
    const span = this.viewportEnd - this.viewportStart;
    return ((year - this.viewportStart) / span) * this.width;
  }

  private pixelToYear(pixel: number): number {
    const span = this.viewportEnd - this.viewportStart;
    return this.viewportStart + (pixel / this.width) * span;
  }

  private getZoomLevel(): ZoomLevel {
    const yearsVisible = this.viewportEnd - this.viewportStart;
    if (yearsVisible >= 2500) return 1;
    if (yearsVisible >= 250) return 2;
    if (yearsVisible >= 50) return 3;
    return 4;
  }

  private calculateDensityY(dot: Dot, index: number): number {
    // Fixed Y position for all collection items - no stacking
    return this.height * this.DOT_Y_RATIO;
  }

  private onDotHover(dot: Dot, hovered: boolean): void {
    dot.hovered = hovered;

    if (hovered) {
      this.currentTooltip = {
        title: dot.item.name,
        subtitle: dot.item.era || '',
        x: dot.x,
        y: dot.y - 20,
      };
    } else {
      this.currentTooltip = null;
    }
  }

  private onDotClick(dot: Dot): void {
    const url = `${this.baseUrl}/item/${dot.item.id}`.replace(/\/+/g, '/');
    window.location.href = url;
  }

  private truncateName(name: string, maxLength: number): string {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength - 1) + '…';
  }

  private formatYear(year: number): string {
    if (year === 0) return '1 AD';
    if (year < 0) return `${Math.abs(year)} BC`;
    return `${year} AD`;
  }

  private update(): void {
    const zoomLevel = this.getZoomLevel();
    const showLabels = zoomLevel >= 2;  // Show labels at Period zoom and higher

    // Update dots
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];
      // Calculate position - instant, no physics
      dot.x = this.yearToPixel(dot.item.yearMidpoint);
      dot.y = this.calculateDensityY(dot, i);

      // Update graphics
      dot.graphics.position.set(dot.x, dot.y);

      // Hover effect
      const scale = dot.hovered ? 1.5 : 1;
      dot.graphics.scale.set(scale);

      // Update label - position below the axis line and year labels
      if (dot.label) {
        const axisY = this.height * this.AXIS_Y_RATIO;
        dot.label.position.set(dot.x, axisY + 30);  // Below axis labels
        dot.label.alpha = showLabels ? 0.8 : 0;
      }

      // Hide if off-screen
      const visible = dot.x > -50 && dot.x < this.width + 50;
      dot.graphics.visible = visible;
      if (dot.label) dot.label.visible = visible && showLabels;
    }

    // Update landmark bars
    this.updateLandmarks();

    // Update person markers
    this.updatePersonMarkers();

    // Update axis
    this.drawAxis();

    // Update cursor line
    this.updateCursorLine();

    // Update tooltip
    this.updateTooltip();
  }

  private updateLandmarks(): void {
    const baseY = this.height * this.LANDMARK_Y_RATIO;

    for (const bar of this.landmarkBars) {
      const startX = this.yearToPixel(bar.landmark.yearStart!);
      const endX = this.yearToPixel(bar.landmark.yearEnd!);
      const barWidth = endX - startX;
      // Stack rows upward from base position
      const y = baseY - (bar.row * this.LANDMARK_SPACING);

      // Redraw bar
      bar.graphics.clear();

      // Only draw if visible on screen
      if (endX < -50 || startX > this.width + 50) {
        bar.graphics.visible = false;
        bar.label.visible = false;
        continue;
      }

      bar.graphics.visible = true;

      // Always show label if any part of the bar is visible
      const labelWidth = bar.label.width;
      bar.label.visible = true;

      // Clamp bar drawing to screen edges for partial visibility
      const drawStartX = Math.max(-10, startX);
      const drawEndX = Math.min(this.width + 10, endX);
      const drawWidth = drawEndX - drawStartX;

      if (drawWidth > 0) {
        // Bar rectangle
        bar.graphics.rect(drawStartX, y - 2, drawWidth, 4);
        bar.graphics.fill({ color: this.COLORS.gold, alpha: 0.3 });
      }

      // Endpoints (diamonds) - only draw if on screen
      if (startX > -10 && startX < this.width + 10) {
        this.drawDiamond(bar.graphics, startX, y, 4);
      }
      if (endX > -10 && endX < this.width + 10) {
        this.drawDiamond(bar.graphics, endX, y, 4);
      }

      // Label positioned above the bar center, clamped to stay on screen
      const barCenterX = (startX + endX) / 2;
      const clampedX = Math.max(labelWidth / 2 + 5, Math.min(this.width - labelWidth / 2 - 5, barCenterX));
      bar.label.position.set(clampedX, y - 8);
    }
  }

  private updatePersonMarkers(): void {
    const baseY = this.height * this.PERSON_Y_RATIO;

    for (const marker of this.personMarkers) {
      // Calculate X position based on the midpoint of their life - instant, no physics
      const midYear = marker.landmark.yearMidpoint;
      marker.x = this.yearToPixel(midYear);

      // Calculate Y position with row staggering (rows go downward)
      const y = baseY + (marker.row * this.PERSON_SPACING);

      // Check if visible
      const visible = marker.x > -50 && marker.x < this.width + 50;
      marker.graphics.visible = visible;
      marker.label.visible = visible;

      if (!visible) continue;

      // Position the marker
      marker.graphics.position.set(marker.x, y);

      // Position label below the marker
      marker.label.position.set(marker.x, y + 8);
    }
  }

  private drawDiamond(graphics: Graphics, x: number, y: number, size: number): void {
    graphics.moveTo(x, y - size);
    graphics.lineTo(x + size, y);
    graphics.lineTo(x, y + size);
    graphics.lineTo(x - size, y);
    graphics.closePath();
    graphics.fill({ color: this.COLORS.gold, alpha: 0.8 });
  }

  private drawAxis(): void {
    const zoomLevel = this.getZoomLevel();
    const y = this.height * this.AXIS_Y_RATIO;

    this.axisContainer.removeChildren();

    const axis = new Graphics();

    // Main line
    axis.moveTo(0, y);
    axis.lineTo(this.width, y);
    axis.stroke({ color: this.COLORS.cyan, alpha: 0.3, width: 1 });

    // Determine tick interval
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

    const startTick = Math.floor(this.viewportStart / minorInterval) * minorInterval;
    const endTick = Math.ceil(this.viewportEnd / minorInterval) * minorInterval;

    for (let year = startTick; year <= endTick; year += minorInterval) {
      const x = this.yearToPixel(year);
      if (x < -10 || x > this.width + 10) continue;

      const isMajor = year % majorInterval === 0;
      const tickHeight = isMajor ? 8 : 4;

      axis.moveTo(x, y - tickHeight);
      axis.lineTo(x, y + tickHeight);
      axis.stroke({ color: this.COLORS.cyan, alpha: isMajor ? 0.5 : 0.2, width: 1 });

      // Label for major ticks
      if (isMajor) {
        const label = new Text({
          text: this.formatYear(year),
          style: new TextStyle({
            fontFamily: 'monospace',
            fontSize: 10,
            fill: this.COLORS.textDim,
          }),
        });
        label.anchor.set(0.5, 0);
        label.position.set(x, y + 12);
        this.axisContainer.addChild(label);
      }
    }

    this.axisContainer.addChild(axis);
  }

  private updateTooltip(): void {
    if (!this.tooltipGraphics || !this.tooltipText || !this.tooltipSubtext) return;

    if (this.currentTooltip) {
      this.tooltipContainer.visible = true;

      const padding = 12;

      // Set text first to measure it
      this.tooltipText.text = this.currentTooltip.title;
      this.tooltipSubtext.text = this.currentTooltip.subtitle;

      // Calculate dynamic width based on text
      const textWidth = Math.max(this.tooltipText.width, this.tooltipSubtext.width);
      const width = Math.min(300, Math.max(180, textWidth + padding * 2));
      const height = 56;

      let x = this.currentTooltip.x - width / 2;
      let y = this.currentTooltip.y - height - 15;

      // Keep on screen horizontally
      x = Math.max(10, Math.min(this.width - width - 10, x));

      // If tooltip would go above canvas, show below the dot instead
      if (y < 10) {
        y = this.currentTooltip.y + 30;
      }

      // Background
      this.tooltipGraphics.clear();
      this.tooltipGraphics.roundRect(x, y, width, height, 8);
      this.tooltipGraphics.fill({ color: 0x0a0a0a, alpha: 0.95 });
      this.tooltipGraphics.stroke({ color: this.COLORS.cyan, alpha: 0.6, width: 1 });

      // Text positioning
      this.tooltipText.position.set(x + padding, y + padding);
      this.tooltipSubtext.position.set(x + padding, y + padding + 22);
    } else {
      this.tooltipContainer.visible = false;
    }
  }

  private updateCursorLine(): void {
    if (!this.cursorLine || !this.cursorYearText) return;

    if (this.mouseX >= 0 && this.mouseX <= this.width) {
      this.cursorLineContainer.visible = true;

      // Get the year at cursor position
      const year = this.pixelToYear(this.mouseX);
      const yearFormatted = this.formatYear(Math.round(year));

      // Draw vertical line
      this.cursorLine.clear();
      this.cursorLine.moveTo(this.mouseX, 0);
      this.cursorLine.lineTo(this.mouseX, this.height);
      this.cursorLine.stroke({ color: this.COLORS.textDim, alpha: 0.4, width: 1 });

      // Position year text at axis level
      const axisY = this.height * this.AXIS_Y_RATIO;
      this.cursorYearText.text = yearFormatted;
      this.cursorYearText.position.set(this.mouseX, axisY - 5);
    } else {
      this.cursorLineContainer.visible = false;
    }
  }

  private handleResize(): void {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.app.renderer.resize(this.width, this.height);

    // Update landmark Y positions
    for (const bar of this.landmarkBars) {
      bar.y = this.height * this.LANDMARK_Y_RATIO;
    }
  }

  // Public API methods for external controls

  getState(): {
    viewportStart: number;
    viewportEnd: number;
    zoomLevel: number;
    visibleItems: number;
    visibleLandmarks: number;
  } {
    const visibleItems = this.dots.filter(d =>
      d.graphics.visible && d.x > 0 && d.x < this.width
    ).length;

    const visibleLandmarks = this.landmarkBars.filter(b => b.graphics.visible).length;

    return {
      viewportStart: Math.round(this.viewportStart),
      viewportEnd: Math.round(this.viewportEnd),
      zoomLevel: this.getZoomLevel(),
      visibleItems,
      visibleLandmarks,
    };
  }

  zoomIn(): void {
    const centerX = this.width / 2;
    this.handleZoom(1.5, centerX);
  }

  zoomOut(): void {
    const centerX = this.width / 2;
    this.handleZoom(0.67, centerX);
  }

  destroy(): void {
    this.app.destroy(true, { children: true, texture: true });
  }
}
