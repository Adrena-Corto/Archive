import { Application, Container, Graphics, Text, TextStyle, FederatedPointerEvent, Sprite, Texture, Assets } from 'pixi.js';
import type { TimelineItem, TimelineLandmark, ZoomLevel } from './types';
import { TIMELINE_BOUNDS, ZOOM_CONFIGS } from './types';

const IMAGE_CACHE = new Map<string, Texture>();
const LOADING_IMAGES = new Set<string>();

interface Dot {
  item: TimelineItem;
  graphics: Graphics;
  rangeGraphics: Graphics;
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
  imageUrl: string | null;
  itemId: string;
}

interface Cluster {
  dots: Dot[];
  centerX: number;
  centerYear: number;
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
  private thumbnailsContainer!: Container;
  private badgesContainer!: Container;
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
  private tooltipSprite: Sprite | null = null;
  private tooltipImageMask: Graphics | null = null;
  private currentTooltip: TooltipData | null = null;

  // Floating thumbnails for sparse view
  private floatingThumbnails: Map<string, {
    sprite: Sprite;
    mask: Graphics;
    border: Graphics;
    targetX: number;
    targetY: number;
    targetScale: number;
    targetAlpha: number;
    targetRadius: number;
    currentScale: number;
    currentRadius: number;
  }> = new Map();
  private clusterBadges: Map<string, { bg: Graphics; text: Text }> = new Map();
  private clusterDiamonds: Map<string, { graphics: Graphics; targetX: number; targetY: number; targetScale: number; currentScale: number }> = new Map();
  private clusterLabels: Map<string, Text> = new Map();
  private labelCollisionGroups: Map<string, Text> = new Map();
  private clusteredDotIds: Set<string> = new Set();
  private activeClusterKeys: Set<string> = new Set();
  private labelCollisionGroupIds: Set<string> = new Set();

  // Item popup callback
  private onItemSelect: ((itemId: string) => void) | null = null;

  // Cursor tracking line
  private cursorLineContainer!: Container;
  private cursorLine: Graphics | null = null;
  private cursorYearText: Text | null = null;
  private mouseX: number = -1;

  // Animation time for pulsing effects
  private animTime: number = 0;

  // Track if thumbnails are currently being shown
  private thumbnailsVisible: boolean = false;

  // Category filtering
  private activeCategories: Set<string> = new Set(['coin', 'jewelry', 'ring', 'seal', 'misc']);

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
    baseUrl: string = ''
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
    this.thumbnailsContainer = new Container();
    this.badgesContainer = new Container();
    this.tooltipContainer = new Container();

    this.app.stage.addChild(this.cursorLineContainer);
    this.app.stage.addChild(this.personsContainer);
    this.app.stage.addChild(this.landmarksContainer);
    this.app.stage.addChild(this.axisContainer);
    this.app.stage.addChild(this.dotsContainer);
    this.app.stage.addChild(this.labelsContainer);
    this.app.stage.addChild(this.thumbnailsContainer);
    this.app.stage.addChild(this.badgesContainer);
    this.app.stage.addChild(this.tooltipContainer);
  }

  private createDots(): void {
    for (const item of this.items) {
      // Range indicator (drawn behind the diamond)
      const rangeGraphics = new Graphics();
      this.dotsContainer.addChild(rangeGraphics);

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
        rangeGraphics,
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

      // Create label (2-line format for better horizontal space usage)
      const labelStyle = new TextStyle({
        fontFamily: 'monospace',
        fontSize: 10,
        fill: this.COLORS.cyan,
        align: 'center',
      });
      dot.label = new Text({ text: this.formatNameMultiLine(item.name, 12, 3), style: labelStyle });
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

    // Use smaller font on mobile
    const isMobile = this.width < 500;
    const fontSize = isMobile ? 7 : 9;

    for (const landmark of sortedLandmarks) {
      const graphics = new Graphics();
      const labelStyle = new TextStyle({
        fontFamily: 'monospace',
        fontSize,
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

    // Use smaller font on mobile
    const isMobile = this.width < 500;
    const fontSize = isMobile ? 7 : 9;

    for (const person of persons) {
      const graphics = new Graphics();

      // Thin vertical line marker instead of circle
      graphics.rect(-1, -6, 2, 12);
      graphics.fill({ color: this.COLORS.purple, alpha: 0.9 });

      const labelStyle = new TextStyle({
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize,
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
    this.tooltipSprite = new Sprite();
    this.tooltipSprite.visible = false;

    // Create rounded rect mask for tooltip image
    this.tooltipImageMask = new Graphics();
    this.tooltipContainer.addChild(this.tooltipImageMask);
    this.tooltipSprite.mask = this.tooltipImageMask;

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
    this.tooltipContainer.addChild(this.tooltipSprite);
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

  private getClusterThreshold(): number {
    const isMobile = this.width < 500;
    return isMobile ? 32 : 50;
  }

  private detectClusters(visibleDots: Dot[]): Cluster[] {
    if (visibleDots.length === 0) return [];

    const threshold = this.getClusterThreshold();
    const sorted = [...visibleDots].sort((a, b) => a.x - b.x);
    const clusters: Cluster[] = [];
    let currentCluster: Dot[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const dot = sorted[i];
      const lastDot = currentCluster[currentCluster.length - 1];

      if (dot.x - lastDot.x < threshold) {
        currentCluster.push(dot);
      } else {
        clusters.push(this.createCluster(currentCluster));
        currentCluster = [dot];
      }
    }

    clusters.push(this.createCluster(currentCluster));
    return clusters;
  }

  private createCluster(dots: Dot[]): Cluster {
    const centerX = dots.reduce((sum, d) => sum + d.x, 0) / dots.length;
    const centerYear = dots.reduce((sum, d) => sum + d.item.yearMidpoint, 0) / dots.length;
    return { dots, centerX, centerYear };
  }

  private zoomToCluster(cluster: Cluster): void {
    const years = cluster.dots.map(d => d.item.yearMidpoint);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const range = Math.max(maxYear - minYear, 50);
    const padding = range * 0.3;

    this.animateToViewport(minYear - padding, maxYear + padding);
  }

  private animateToViewport(targetStart: number, targetEnd: number): void {
    const duration = 300;
    const startTime = performance.now();
    const fromStart = this.viewportStart;
    const fromEnd = this.viewportEnd;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      this.viewportStart = fromStart + (targetStart - fromStart) * eased;
      this.viewportEnd = fromEnd + (targetEnd - fromEnd) * eased;
      this.clampViewport();

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private onDotHover(dot: Dot, hovered: boolean): void {
    dot.hovered = hovered;

    if (hovered) {
      const firstImage = dot.item.images?.[0];
      const imageUrl = firstImage ? `${this.baseUrl}/images/items/${dot.item.id}/${firstImage}`.replace(/\/+/g, '/') : null;

      this.currentTooltip = {
        title: dot.item.name,
        subtitle: dot.item.era || '',
        x: dot.x,
        y: dot.y - 20,
        imageUrl,
        itemId: dot.item.id,
      };

      if (imageUrl) {
        this.loadThumbnail(imageUrl);
      }
    } else {
      this.currentTooltip = null;
    }
  }

  private async loadThumbnail(url: string): Promise<Texture | null> {
    if (IMAGE_CACHE.has(url)) {
      return IMAGE_CACHE.get(url)!;
    }

    if (LOADING_IMAGES.has(url)) {
      return null;
    }

    LOADING_IMAGES.add(url);

    try {
      const texture = await Assets.load(url);
      IMAGE_CACHE.set(url, texture);
      LOADING_IMAGES.delete(url);
      return texture;
    } catch {
      LOADING_IMAGES.delete(url);
      return null;
    }
  }

  private onDotClick(dot: Dot): void {
    if (this.onItemSelect) {
      this.onItemSelect(dot.item.id);
    } else {
      const url = `${this.baseUrl}/item/${dot.item.id}`.replace(/\/+/g, '/');
      window.location.href = url;
    }
  }

  setItemSelectHandler(handler: (itemId: string) => void): void {
    this.onItemSelect = handler;
  }

  setActiveCategories(categories: string[]): void {
    this.activeCategories = new Set(categories);
  }

  getActiveCategories(): string[] {
    return Array.from(this.activeCategories);
  }

  toggleCategory(category: string): void {
    if (this.activeCategories.has(category)) {
      this.activeCategories.delete(category);
    } else {
      this.activeCategories.add(category);
    }
  }

  private truncateName(name: string, maxLength: number): string {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength - 1) + '…';
  }

  private formatNameMultiLine(name: string, maxLineLength: number = 12, maxLines: number = 3): string {
    if (name.length <= maxLineLength) return name;

    const words = name.split(' ');
    if (words.length === 1) {
      const maxTotal = maxLineLength * maxLines;
      return name.length > maxTotal
        ? name.substring(0, maxTotal - 1) + '…'
        : name;
    }

    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (currentLine.length === 0 || currentLine.length + word.length + 1 <= maxLineLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
        if (lines.length >= maxLines - 1) break;
      }
    }

    if (currentLine) {
      if (lines.length >= maxLines) {
        lines[maxLines - 1] = lines[maxLines - 1].substring(0, maxLineLength - 1) + '…';
      } else {
        if (currentLine.length > maxLineLength) {
          currentLine = currentLine.substring(0, maxLineLength - 1) + '…';
        }
        lines.push(currentLine);
      }
    }

    return lines.join('\n');
  }

  private formatYear(year: number): string {
    if (year === 0) return '1 AD';
    if (year < 0) return `${Math.abs(year)} BC`;
    return `${year} AD`;
  }

  private update(): void {
    // Update animation time for pulsing effects
    this.animTime += 0.02;

    const zoomLevel = this.getZoomLevel();
    const showLabels = zoomLevel >= 2;

    // Update dot positions first (only for active categories)
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];
      const isActiveCategory = this.activeCategories.has(dot.item.category);
      if (isActiveCategory) {
        dot.x = this.yearToPixel(dot.item.yearMidpoint);
        dot.y = this.calculateDensityY(dot, i);
      } else {
        // Move off-screen when category is hidden
        dot.x = -1000;
      }
    }

    // Update floating thumbnails (this populates clusteredDotIds)
    this.updateFloatingThumbnails();

    // Detect label collisions for non-clustered items
    const LABEL_COLLISION_THRESHOLD = 80; // pixels - labels closer than this will show "X items"
    const axisY = this.height * this.AXIS_Y_RATIO;

    // Find non-clustered visible dots and detect label collisions
    const nonClusteredDots = this.dots.filter(d =>
      !this.clusteredDotIds.has(d.item.id) && d.x > -50 && d.x < this.width + 50
    ).sort((a, b) => a.x - b.x);

    // Group labels that would collide
    const labelGroups: Dot[][] = [];
    let currentGroup: Dot[] = [];

    for (const dot of nonClusteredDots) {
      if (currentGroup.length === 0) {
        currentGroup.push(dot);
      } else {
        const lastDot = currentGroup[currentGroup.length - 1];
        if (dot.x - lastDot.x < LABEL_COLLISION_THRESHOLD) {
          currentGroup.push(dot);
        } else {
          labelGroups.push(currentGroup);
          currentGroup = [dot];
        }
      }
    }
    if (currentGroup.length > 0) {
      labelGroups.push(currentGroup);
    }

    // Track which dots have colliding labels
    this.labelCollisionGroupIds.clear();
    const activeCollisionGroupKeys = new Set<string>();

    for (const group of labelGroups) {
      if (group.length > 1) {
        // Labels would collide - hide individual labels and show group label
        for (const dot of group) {
          this.labelCollisionGroupIds.add(dot.item.id);
        }

        const groupKey = group.map(d => d.item.id).join('-');
        activeCollisionGroupKeys.add(groupKey);

        let groupLabel = this.labelCollisionGroups.get(groupKey);
        if (!groupLabel) {
          groupLabel = new Text({
            text: '',
            style: { fontSize: 10, fill: this.COLORS.cyan, fontFamily: 'monospace', align: 'center' }
          });
          groupLabel.anchor.set(0.5, 0);
          this.labelsContainer.addChild(groupLabel);
          this.labelCollisionGroups.set(groupKey, groupLabel);
        }

        const centerX = group.reduce((sum, d) => sum + d.x, 0) / group.length;
        groupLabel.text = `${group.length} items`;
        groupLabel.position.set(centerX, axisY + 30);
        groupLabel.alpha = showLabels ? 0.8 : 0;
        groupLabel.visible = showLabels;
      }
    }

    // Hide inactive collision group labels
    for (const [key, label] of this.labelCollisionGroups) {
      if (!activeCollisionGroupKeys.has(key)) {
        label.visible = false;
      }
    }

    // Update dot visibility and graphics
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];
      const isClustered = this.clusteredDotIds.has(dot.item.id);
      const hasCollidingLabel = this.labelCollisionGroupIds.has(dot.item.id);

      dot.graphics.position.set(dot.x, dot.y);

      const scale = dot.hovered ? 1.5 : 1;
      dot.graphics.scale.set(scale);

      // Draw date range indicator when hovered and item has a date range
      dot.rangeGraphics.clear();
      const hasDateRange = dot.item.yearStart !== dot.item.yearEnd;
      if (dot.hovered && hasDateRange) {
        const startX = this.yearToPixel(dot.item.yearStart);
        const endX = this.yearToPixel(dot.item.yearEnd);
        dot.rangeGraphics.rect(startX, dot.y - 2, endX - startX, 4);
        dot.rangeGraphics.fill({ color: this.COLORS.cyan, alpha: 0.25 });
        // Small diamonds at the endpoints
        this.drawSmallDiamond(dot.rangeGraphics, startX, dot.y, 3, this.COLORS.cyan, 0.4);
        this.drawSmallDiamond(dot.rangeGraphics, endX, dot.y, 3, this.COLORS.cyan, 0.4);
      }
      dot.rangeGraphics.visible = dot.hovered && hasDateRange;

      if (dot.label) {
        dot.label.position.set(dot.x, axisY + 30);
        // Show label if: (labels enabled OR thumbnails visible) AND not clustered AND no collision
        const shouldShowLabel = (showLabels || this.thumbnailsVisible) && !isClustered && !hasCollidingLabel;
        dot.label.alpha = shouldShowLabel ? 0.8 : 0;
      }

      const onScreen = dot.x > -50 && dot.x < this.width + 50;
      dot.graphics.visible = onScreen && !isClustered;
      const shouldShowLabel = (showLabels || this.thumbnailsVisible) && !isClustered && !hasCollidingLabel;
      if (dot.label) dot.label.visible = onScreen && shouldShowLabel;
    }

    this.updateLandmarks();
    this.updatePersonMarkers();
    this.drawAxis();
    this.updateCursorLine();
    this.updateTooltip();
  }

  private updateFloatingThumbnails(): void {
    const isMobile = this.width < 500;
    const MAX_THUMBNAILS = isMobile ? 30 : 25;
    const THUMB_SIZE = isMobile ? 28 : 48;
    const GROUP_SIZE = THUMB_SIZE * 1.5;
    const MAX_VISIBLE_IN_CLUSTER = isMobile ? 3 : 4;
    const LERP_SPEED = 0.25;

    const visibleDots = this.dots.filter(d =>
      d.x > 20 && d.x < this.width - 20
    );

    const shouldShowThumbnails = visibleDots.length > 0 && visibleDots.length <= MAX_THUMBNAILS;
    this.thumbnailsVisible = shouldShowThumbnails;

    this.clusteredDotIds.clear();
    this.activeClusterKeys.clear();

    if (!shouldShowThumbnails) {
      for (const entry of this.floatingThumbnails.values()) {
        entry.targetAlpha = 0;
        entry.targetScale = 0;
        entry.targetRadius = 0;
      }
      for (const badge of this.clusterBadges.values()) {
        badge.bg.visible = false;
        badge.text.visible = false;
      }
      for (const diamond of this.clusterDiamonds.values()) {
        diamond.targetScale = 0;
      }
      for (const label of this.clusterLabels.values()) {
        label.visible = false;
      }
      this.animateThumbnails(LERP_SPEED);
      return;
    }

    const clusters = this.detectClusters(visibleDots);
    const visibleIds = new Set<string>();
    const visibleClusterIds = new Set<string>();

    for (const cluster of clusters) {
      const isCluster = cluster.dots.length > 1;
      const clusterKey = cluster.dots.map(d => d.item.id).join('-');
      const displayCount = Math.min(cluster.dots.length, MAX_VISIBLE_IN_CLUSTER);
      const extraCount = cluster.dots.length - MAX_VISIBLE_IN_CLUSTER;

      if (isCluster) {
        this.activeClusterKeys.add(clusterKey);
        for (const dot of cluster.dots) {
          this.clusteredDotIds.add(dot.item.id);
        }

        let diamond = this.clusterDiamonds.get(clusterKey);
        if (!diamond) {
          const graphics = new Graphics();
          const size = 5;
          graphics.moveTo(0, -size);
          graphics.lineTo(size, 0);
          graphics.lineTo(0, size);
          graphics.lineTo(-size, 0);
          graphics.closePath();
          graphics.fill({ color: this.COLORS.cyan, alpha: 0.9 });
          graphics.eventMode = 'static';
          graphics.cursor = 'pointer';

          const initialX = cluster.centerX;
          const initialY = cluster.dots[0].y;
          graphics.position.set(initialX, initialY);
          graphics.scale.set(0);

          this.dotsContainer.addChild(graphics);
          diamond = { graphics, targetX: initialX, targetY: initialY, targetScale: 1, currentScale: 0 };
          this.clusterDiamonds.set(clusterKey, diamond);
        }

        // Update click handler to zoom to current cluster
        diamond.graphics.removeAllListeners();
        const clusterRef = cluster;
        diamond.graphics.on('pointertap', () => this.zoomToCluster(clusterRef));

        diamond.targetX = cluster.centerX;
        diamond.targetY = cluster.dots[0].y;
        diamond.targetScale = 1;
        diamond.graphics.visible = true;
      }

      const thumbSize = isCluster
        ? Math.max(24, THUMB_SIZE / Math.sqrt(displayCount))
        : THUMB_SIZE;
      const thumbRadius = thumbSize / 2;

      // Calculate total height of the grid for clusters
      const rows = isCluster ? Math.ceil(displayCount / 2) : 1;
      const gap = isCluster ? Math.max(1, 4 - displayCount) : 0;
      const totalGridHeight = rows * thumbSize + (rows - 1) * gap;

      // Position so bottom of grid is at same level as single thumbnail bottom
      // Single thumbnail bottom: dot.y - 8
      // So cluster grid bottom should also be at dot.y - 8
      const gridBottomY = cluster.dots[0].y - 8;
      const gridTopY = gridBottomY - totalGridHeight;

      for (let i = 0; i < displayCount; i++) {
        const dot = cluster.dots[i];
        const itemId = dot.item.id;
        const firstImage = dot.item.images?.[0];
        if (!firstImage) continue;

        visibleIds.add(itemId);
        const imageUrl = `${this.baseUrl}/images/items/${itemId}/${firstImage}`.replace(/\/+/g, '/');

        if (!IMAGE_CACHE.has(imageUrl)) {
          this.loadThumbnail(imageUrl);
          continue;
        }

        const texture = IMAGE_CACHE.get(imageUrl)!;
        let entry = this.floatingThumbnails.get(itemId);

        if (!entry) {
          const sprite = new Sprite(texture);
          sprite.anchor.set(0.5, 0.5);
          sprite.eventMode = 'static';
          sprite.cursor = 'pointer';

          const mask = new Graphics();
          sprite.mask = mask;

          const border = new Graphics();

          this.thumbnailsContainer.addChild(mask);
          this.thumbnailsContainer.addChild(sprite);
          this.thumbnailsContainer.addChild(border);

          const initialX = dot.x;
          const initialY = dot.y - 8 - thumbRadius;

          sprite.position.set(initialX, initialY);
          sprite.alpha = 0;
          mask.position.set(initialX, initialY);
          border.position.set(initialX, initialY);

          entry = {
            sprite,
            mask,
            border,
            targetX: initialX,
            targetY: initialY,
            targetScale: 1,
            targetAlpha: 0.9,
            targetRadius: thumbRadius,
            currentScale: 0,
            currentRadius: thumbRadius,
          };
          this.floatingThumbnails.set(itemId, entry);
        }

        entry.sprite.texture = texture;
        const baseScale = Math.max(thumbSize / texture.width, thumbSize / texture.height);

        entry.sprite.removeAllListeners();

        // All thumbnails (clustered or not) show item tooltip on hover and navigate on click
        entry.sprite.on('pointertap', () => {
          if (this.onItemSelect) {
            this.onItemSelect(itemId);
          } else {
            window.location.href = `${this.baseUrl}/item/${itemId}`.replace(/\/+/g, '/');
          }
        });
        entry.sprite.on('pointerover', () => {
          const matchingDot = this.dots.find(d => d.item.id === itemId);
          if (matchingDot) this.onDotHover(matchingDot, true);
        });
        entry.sprite.on('pointerout', () => {
          const matchingDot = this.dots.find(d => d.item.id === itemId);
          if (matchingDot) this.onDotHover(matchingDot, false);
        });

        let posX: number, posY: number;

        if (isCluster) {
          const cols = displayCount <= 2 ? displayCount : 2;
          const row = Math.floor(i / cols);
          const col = i % cols;
          const itemsInRow = Math.min(cols, displayCount - row * cols);
          const rowWidth = itemsInRow * thumbSize + (itemsInRow - 1) * gap;
          const startX = cluster.centerX - rowWidth / 2 + thumbRadius;

          posX = startX + col * (thumbSize + gap);
          // Position from top of grid down
          posY = gridTopY + row * (thumbSize + gap) + thumbRadius;
        } else {
          posX = dot.x;
          posY = dot.y - 8 - thumbRadius;
        }

        entry.targetX = posX;
        entry.targetY = posY;
        entry.targetScale = baseScale;
        entry.targetAlpha = dot.hovered ? 0.3 : 0.9;
        entry.targetRadius = thumbRadius;
        entry.sprite.visible = true;
        entry.mask.visible = true;
        entry.border.visible = true;
      }

      if (isCluster) {
        visibleClusterIds.add(clusterKey);
        let badge = this.clusterBadges.get(clusterKey);

        if (!badge) {
          const bg = new Graphics();
          bg.eventMode = 'static';
          bg.cursor = 'pointer';

          const text = new Text({
            text: '',
            style: { fontSize: 10, fill: 0xaaaaaa, fontFamily: 'system-ui' }
          });
          text.anchor.set(0.5, 0.5);
          text.eventMode = 'none';

          this.badgesContainer.addChild(bg);
          this.badgesContainer.addChild(text);
          badge = { bg, text };
          this.clusterBadges.set(clusterKey, badge);
        }

        // Update click handler to zoom to current cluster
        badge.bg.removeAllListeners();
        const clusterRef = cluster;
        badge.bg.on('pointertap', () => this.zoomToCluster(clusterRef));

        // Show +X if there are extra hidden items, otherwise show expand icon
        if (extraCount > 0) {
          badge.text.text = `+${extraCount}`;
          badge.text.style.fontSize = 9;
        } else {
          badge.text.text = '⤢';
          badge.text.style.fontSize = 12;
        }

        // Calculate grid dimensions to position badge at top-right
        const gridWidth = displayCount <= 2
          ? displayCount * thumbSize + (displayCount - 1) * gap
          : 2 * thumbSize + gap;
        const badgeX = cluster.centerX + gridWidth / 2 + 6;
        const badgeY = gridTopY + 6;

        badge.bg.clear();
        badge.bg.circle(0, 0, 10);
        badge.bg.fill({ color: 0x333333 });
        badge.bg.stroke({ color: 0x555555, width: 1 });
        badge.bg.position.set(badgeX, badgeY);
        badge.text.position.set(badgeX, badgeY);
        badge.bg.visible = true;
        badge.text.visible = true;
      }

      if (isCluster) {
        let clusterLabel = this.clusterLabels.get(clusterKey);
        if (!clusterLabel) {
          clusterLabel = new Text({
            text: '',
            style: { fontSize: 10, fill: this.COLORS.cyan, fontFamily: 'monospace', align: 'center' }
          });
          clusterLabel.anchor.set(0.5, 0);
          clusterLabel.eventMode = 'static';
          clusterLabel.cursor = 'pointer';
          this.labelsContainer.addChild(clusterLabel);
          this.clusterLabels.set(clusterKey, clusterLabel);
        }

        // Update click handler to zoom to current cluster
        clusterLabel.removeAllListeners();
        const clusterRef = cluster;
        clusterLabel.on('pointertap', () => this.zoomToCluster(clusterRef));

        clusterLabel.text = `${cluster.dots.length} items ⤢`;
        const axisY = this.height * this.AXIS_Y_RATIO;
        clusterLabel.position.set(cluster.centerX, axisY + 30);
        clusterLabel.alpha = 0.8;
        clusterLabel.visible = true;
      }
    }

    for (const [itemId, entry] of this.floatingThumbnails) {
      if (!visibleIds.has(itemId)) {
        entry.targetAlpha = 0;
        entry.targetScale = 0;
        entry.targetRadius = 0;
      }
    }

    for (const [key, badge] of this.clusterBadges) {
      if (!visibleClusterIds.has(key)) {
        badge.bg.visible = false;
        badge.text.visible = false;
      }
    }

    for (const [key, diamond] of this.clusterDiamonds) {
      if (!this.activeClusterKeys.has(key)) {
        diamond.targetScale = 0;
        diamond.graphics.visible = false;
      }
    }

    for (const [key, label] of this.clusterLabels) {
      if (!this.activeClusterKeys.has(key)) {
        label.visible = false;
      }
    }

    this.animateThumbnails(LERP_SPEED);
  }

  private animateThumbnails(lerp: number): void {
    for (const entry of this.floatingThumbnails.values()) {
      const { sprite, mask, border } = entry;

      sprite.x += (entry.targetX - sprite.x) * lerp;
      sprite.y += (entry.targetY - sprite.y) * lerp;
      mask.x = sprite.x;
      mask.y = sprite.y;
      border.x = sprite.x;
      border.y = sprite.y;

      entry.currentScale += (entry.targetScale - entry.currentScale) * lerp;
      sprite.scale.set(entry.currentScale);

      entry.currentRadius += (entry.targetRadius - entry.currentRadius) * lerp;

      mask.clear();
      mask.circle(0, 0, entry.currentRadius);
      mask.fill({ color: 0xffffff });

      border.clear();
      if (entry.currentRadius > 1) {
        border.circle(0, 0, entry.currentRadius);
        border.stroke({ color: 0x444444, width: 1 });
      }

      sprite.alpha += (entry.targetAlpha - sprite.alpha) * lerp;
      border.alpha = sprite.alpha;

      if (sprite.alpha < 0.01) {
        sprite.visible = false;
        mask.visible = false;
        border.visible = false;
      }
    }

    for (const diamond of this.clusterDiamonds.values()) {
      diamond.graphics.x += (diamond.targetX - diamond.graphics.x) * lerp;
      diamond.graphics.y += (diamond.targetY - diamond.graphics.y) * lerp;
      diamond.currentScale += (diamond.targetScale - diamond.currentScale) * lerp;

      // Add subtle pulse effect to hint clickability
      const pulse = 1 + Math.sin(this.animTime * 2) * 0.15;
      diamond.graphics.scale.set(diamond.currentScale * pulse);

      if (diamond.currentScale < 0.01) {
        diamond.graphics.visible = false;
      }
    }
  }


  private updateLandmarks(): void {
    const baseY = this.height * this.LANDMARK_Y_RATIO;
    const isMobile = this.width < 500;

    // Collect visible labels with their positions for collision detection
    const visibleLabels: { bar: LandmarkBar; x: number; y: number; width: number }[] = [];

    for (const bar of this.landmarkBars) {
      const startX = this.yearToPixel(bar.landmark.yearStart!);
      const endX = this.yearToPixel(bar.landmark.yearEnd!);
      const y = baseY - (bar.row * this.LANDMARK_SPACING);

      bar.graphics.clear();

      if (endX < -50 || startX > this.width + 50) {
        bar.graphics.visible = false;
        bar.label.visible = false;
        continue;
      }

      bar.graphics.visible = true;

      const drawStartX = Math.max(-10, startX);
      const drawEndX = Math.min(this.width + 10, endX);
      const drawWidth = drawEndX - drawStartX;

      if (drawWidth > 0) {
        bar.graphics.rect(drawStartX, y - 2, drawWidth, 4);
        bar.graphics.fill({ color: this.COLORS.gold, alpha: 0.3 });
      }

      if (startX > -10 && startX < this.width + 10) {
        this.drawDiamond(bar.graphics, startX, y, 4);
      }
      if (endX > -10 && endX < this.width + 10) {
        this.drawDiamond(bar.graphics, endX, y, 4);
      }

      const barCenterX = (startX + endX) / 2;
      const labelWidth = bar.label.width;
      const clampedX = Math.max(labelWidth / 2 + 5, Math.min(this.width - labelWidth / 2 - 5, barCenterX));
      bar.label.position.set(clampedX, y - 8);

      visibleLabels.push({ bar, x: clampedX, y, width: labelWidth });
    }

    // On mobile, hide overlapping labels to prevent visual clutter
    if (isMobile && visibleLabels.length > 1) {
      visibleLabels.sort((a, b) => a.x - b.x);

      let lastVisibleX = -Infinity;
      const minGap = 10; // Minimum gap between labels

      for (const { bar, x, width } of visibleLabels) {
        const leftEdge = x - width / 2;
        if (leftEdge - lastVisibleX < minGap) {
          bar.label.visible = false;
        } else {
          bar.label.visible = true;
          lastVisibleX = x + width / 2;
        }
      }
    } else {
      for (const { bar } of visibleLabels) {
        bar.label.visible = true;
      }
    }
  }

  private updatePersonMarkers(): void {
    const baseY = this.height * this.PERSON_Y_RATIO;
    const isMobile = this.width < 500;

    // Collect visible markers for collision detection
    const visibleMarkers: { marker: PersonMarker; x: number; y: number; width: number }[] = [];

    for (const marker of this.personMarkers) {
      const midYear = marker.landmark.yearMidpoint;
      marker.x = this.yearToPixel(midYear);
      const y = baseY + (marker.row * this.PERSON_SPACING);

      const visible = marker.x > -50 && marker.x < this.width + 50;
      marker.graphics.visible = visible;

      if (!visible) {
        marker.label.visible = false;
        continue;
      }

      marker.graphics.position.set(marker.x, y);
      marker.label.position.set(marker.x, y + 8);

      visibleMarkers.push({ marker, x: marker.x, y, width: marker.label.width });
    }

    // On mobile, hide overlapping person labels
    if (isMobile && visibleMarkers.length > 1) {
      visibleMarkers.sort((a, b) => a.x - b.x);

      let lastVisibleX = -Infinity;
      const minGap = 10;

      for (const { marker, x, width } of visibleMarkers) {
        const leftEdge = x - width / 2;
        if (leftEdge - lastVisibleX < minGap) {
          marker.label.visible = false;
        } else {
          marker.label.visible = true;
          lastVisibleX = x + width / 2;
        }
      }
    } else {
      for (const { marker } of visibleMarkers) {
        marker.label.visible = true;
      }
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

  private drawSmallDiamond(graphics: Graphics, x: number, y: number, size: number, color: number, alpha: number): void {
    graphics.moveTo(x, y - size);
    graphics.lineTo(x + size, y);
    graphics.lineTo(x, y + size);
    graphics.lineTo(x - size, y);
    graphics.closePath();
    graphics.fill({ color, alpha });
  }

  private drawAxis(): void {
    const y = this.height * this.AXIS_Y_RATIO;

    this.axisContainer.removeChildren();

    const axis = new Graphics();

    // Main line
    axis.moveTo(0, y);
    axis.lineTo(this.width, y);
    axis.stroke({ color: this.COLORS.cyan, alpha: 0.3, width: 1 });

    // Calculate tick intervals based on viewport span for smoother transitions
    const yearsVisible = this.viewportEnd - this.viewportStart;
    const targetLabelCount = 8; // Aim for roughly this many labels on screen
    const rawInterval = yearsVisible / targetLabelCount;

    // Snap to nice round numbers: 5, 10, 25, 50, 100, 250, 500, 1000, etc.
    const niceIntervals = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
    let majorInterval = niceIntervals[0];
    for (const interval of niceIntervals) {
      if (interval >= rawInterval) {
        majorInterval = interval;
        break;
      }
      majorInterval = interval;
    }

    // Minor interval is typically half or a fifth of major
    const minorInterval = majorInterval >= 100 ? majorInterval / 2 : majorInterval / 5;

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
    if (!this.tooltipGraphics || !this.tooltipText || !this.tooltipSubtext || !this.tooltipSprite) return;

    if (this.currentTooltip) {
      this.tooltipContainer.visible = true;

      const padding = 14;
      const thumbSize = 100;
      const hasImage = this.currentTooltip.imageUrl && IMAGE_CACHE.has(this.currentTooltip.imageUrl);

      // Set text first to measure it
      this.tooltipText.text = this.currentTooltip.title;
      this.tooltipSubtext.text = this.currentTooltip.subtitle;

      // Calculate dimensions
      const textWidth = Math.max(this.tooltipText.width, this.tooltipSubtext.width);
      const textHeight = 44; // title + subtitle + gap

      let width: number;
      let height: number;

      if (hasImage) {
        // Image on left, text on right
        width = padding + thumbSize + padding + textWidth + padding;
        height = padding + Math.max(thumbSize, textHeight) + padding;
      } else {
        width = padding + textWidth + padding;
        height = padding + textHeight + padding;
      }

      // Clamp width
      width = Math.min(400, Math.max(160, width));

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
      this.tooltipGraphics.roundRect(x, y, width, height, 6);
      this.tooltipGraphics.fill({ color: 0x0a0a0a, alpha: 0.95 });
      this.tooltipGraphics.stroke({ color: this.COLORS.cyan, alpha: 0.5, width: 1 });

      if (hasImage && this.currentTooltip.imageUrl) {
        const texture = IMAGE_CACHE.get(this.currentTooltip.imageUrl)!;
        this.tooltipSprite.texture = texture;
        this.tooltipSprite.visible = true;

        // Scale image to fill thumbnail size (cover), cropping excess
        const scale = Math.max(thumbSize / texture.width, thumbSize / texture.height);
        this.tooltipSprite.scale.set(scale);

        // Center the image within the thumb area
        const scaledWidth = texture.width * scale;
        const scaledHeight = texture.height * scale;
        const imgX = x + padding + (thumbSize - scaledWidth) / 2;
        const imgY = y + padding + (thumbSize - scaledHeight) / 2;
        this.tooltipSprite.position.set(imgX, imgY);

        // Update rounded rect mask position
        if (this.tooltipImageMask) {
          this.tooltipImageMask.clear();
          this.tooltipImageMask.roundRect(x + padding, y + padding, thumbSize, thumbSize, 6);
          this.tooltipImageMask.fill({ color: 0xffffff });
        }

        // Text to the right of image, vertically centered
        const textX = x + padding + thumbSize + padding;
        const textY = y + padding + (Math.max(thumbSize, textHeight) - textHeight) / 2;
        this.tooltipText.position.set(textX, textY);
        this.tooltipSubtext.position.set(textX, textY + 24);
      } else {
        this.tooltipSprite.visible = false;

        // Text only - centered
        const textX = x + padding;
        const textY = y + padding;
        this.tooltipText.position.set(textX, textY);
        this.tooltipSubtext.position.set(textX, textY + 24);
      }
    } else {
      this.tooltipContainer.visible = false;
      this.tooltipSprite.visible = false;
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
      d.x > 0 && d.x < this.width
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
