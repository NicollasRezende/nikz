// Predefined animation states for different patterns
// Each pattern has a sequence of frames that loop
const PATTERN_SEQUENCES = {
  glider: [
    // Frame 0
    [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
    // Frame 1
    [[1, 0, 1], [0, 1, 1], [0, 1, 0]],
    // Frame 2
    [[0, 0, 1], [1, 0, 1], [0, 1, 1]],
    // Frame 3
    [[1, 0, 0], [0, 1, 1], [1, 1, 0]],
  ],
  blinker: [
    // Horizontal
    [[1, 1, 1]],
    // Vertical
    [[1], [1], [1]],
  ],
  toad: [
    // Frame 0
    [[0, 1, 1, 1], [1, 1, 1, 0]],
    // Frame 1
    [[0, 0, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 0, 0]],
  ],
  beacon: [
    // Frame 0
    [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]],
    // Frame 1
    [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]],
  ],
  pulsar: [
    // Simplified pulsar - 3 frames
    [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1]],
    [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0]],
    [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1]],
  ],
};

interface PatternInstance {
  sequence: number[][][];
  offsetX: number;
  offsetY: number;
  speed: number; // frames between updates
  currentFrame: number;
}

export class GameOfLife {
  private width: number;
  private height: number;
  private cellSize: number;
  private cols: number;
  private rows: number;
  private patterns: PatternInstance[];
  private frameCount: number = 0;

  constructor(width: number, height: number, cellSize: number = 50) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);
    this.patterns = this.createPatternInstances();
  }

  private createPatternInstances(): PatternInstance[] {
    // Create multiple animated pattern instances across screen
    return [
      { sequence: PATTERN_SEQUENCES.glider, offsetX: 5, offsetY: 5, speed: 15, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.blinker, offsetX: 15, offsetY: 8, speed: 20, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.toad, offsetX: 25, offsetY: 12, speed: 18, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.beacon, offsetX: 10, offsetY: 18, speed: 22, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.glider, offsetX: 30, offsetY: 5, speed: 16, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.pulsar, offsetX: 5, offsetY: 25, speed: 12, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.blinker, offsetX: 35, offsetY: 20, speed: 25, currentFrame: 0 },
      { sequence: PATTERN_SEQUENCES.toad, offsetX: 20, offsetY: 28, speed: 19, currentFrame: 0 },
    ];
  }

  public update(): void {
    this.frameCount++;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#7dcfff";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#7dcfff";

    // Draw each pattern instance
    this.patterns.forEach((instance) => {
      // Determine which frame of the sequence to show
      const sequenceIndex = Math.floor(this.frameCount / instance.speed) % instance.sequence.length;
      const currentPattern = instance.sequence[sequenceIndex];

      // Draw the pattern
      currentPattern.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === 1) {
            const x = ((instance.offsetX + j) % this.cols) * this.cellSize;
            const y = ((instance.offsetY + i) % this.rows) * this.cellSize;
            ctx.fillRect(x, y, this.cellSize - 2, this.cellSize - 2);
          }
        });
      });
    });
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.cols = Math.floor(width / this.cellSize);
    this.rows = Math.floor(height / this.cellSize);
    this.patterns = this.createPatternInstances();
    this.frameCount = 0;
  }
}
