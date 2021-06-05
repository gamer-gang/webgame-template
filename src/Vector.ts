export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalize(): Vector {
    const l = this.length;
    if (l > 0) {
      this.x /= l;
      this.y /= l;
    }
    return this;
  }

  multiply(multiplier: number): Vector {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  divide(divisor: number): Vector {
    return new Vector(this.x / divisor, this.y / divisor);
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  dotProduct(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  distance(other: Vector): number {
    return Math.sqrt(
      (other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y)
    );
  }

  matrixMultiply(a: number, b: number, c: number, d: number): Vector {
    return new Vector(a * this.x + b * this.y, c * this.x + d * this.y);
  }

  static flattenPointsOn(points: Vector[], normal: Vector): [number, number] {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    for (const vector of points) {
      const dot = vector.dotProduct(normal);
      if (dot < min) min = dot;
      if (dot > max) max = dot;
    }
    return [min, max];
  }

  get length(): number {
    return Math.sqrt(this.dotProduct(this));
  }
}
