import { DisplayObject, Resource, Sprite, Texture } from 'pixi.js';
import { Vector } from './Vector';

export abstract class GameObject extends Sprite {
  static maxSpeed = 16;
  vel = new Vector(0, 0);
  friction = 0.5;

  // differentiate gameobjects from regular displayobjects
  readonly type = 'gameobject';

  static isGameObject(object: DisplayObject): object is GameObject {
    return (object as GameObject).type === 'gameobject';
  }

  constructor(texture?: Texture<Resource>) {
    super(texture ?? Texture.from('assets/ohno.png'));

    // set position to the center because top left corner is dumb
    // this.anchor.set(0.5);
  }

  update(delta: number): void {
    this.x += this.vel.x * delta;
    this.y += this.vel.y * delta;
  }

  clampSpeed(): void {
    // avoid floating point math hell
    if (Math.abs(this.vel.x) < 0.1) this.vel.x = 0;
    if (Math.abs(this.vel.y) < 0.1) this.vel.y = 0;
    if (this.vel.x > GameObject.maxSpeed) this.vel.x = 16;
    if (this.vel.x < -GameObject.maxSpeed) this.vel.x = -16;
    if (this.vel.y > GameObject.maxSpeed) this.vel.y = 16;
    if (this.vel.y < -GameObject.maxSpeed) this.vel.y = -16;
  }

  collide(...objects: GameObject[]): void {
    objects.forEach((object: GameObject) => {
      if (object == this) return;
      if (this.checkCollision(object)) {
        const inner = this.differenceVector(object);

        if (Math.abs(inner.x) < Math.abs(inner.y)) this.vel.x += inner.x;
        else {
          this.vel.y += inner.y;
          console.log(inner.y);
        }
        // const shortest = new Vector(
        //   Math.abs(inner.x) < Math.abs(outer.x),
        //   Math.min(Math.abs(inner.y), Math.abs(outer.y))
        // );
        // if (shortest.x < shortest.y) this.vel.x += shortest.x;
        // else this.vel.y += shortest.y;
        // console.log(inner, outer, shortest);
      }
    });
  }

  // this.position.x + e1.velocity.x, e1.y + e1.velocity.y, e1.width, e1.height, e2.x, e2.y, e2.width, e2.height
  checkCollision(other: GameObject): boolean {
    const thisX = this.x + this.vel.x;
    const thisY = this.y + this.vel.y;

    return (
      thisX < other.x + other.width &&
      thisX + this.width > other.x &&
      thisY < other.y + other.height &&
      thisY + this.height > other.y
    );
  }

  differenceVector(other: GameObject): Vector {
    const inner = new Vector(0, 0);
    // const outer = new Vector(0, 0);

    if (this.x < other.x) {
      inner.x = other.x - (this.x + this.width + this.vel.x);
      // outer.x = this.x - (other.x + other.width);
    } else if (this.x > other.x) {
      inner.x = other.x + other.width - (this.x + this.vel.x);
      // outer.x = other.x - (this.x + this.width);
    }

    if (this.y < other.y) {
      inner.y = other.y - (this.y + this.height + this.vel.y);
      // outer.y = this.y - (other.y + other.height);
    } else if (this.y > other.y) {
      inner.y = other.y + other.height - (this.y + this.vel.y);
      // outer.y = other.y - (this.y + this.height);
    }
    console.log(inner);
    return inner;
  }

  setSize(w: number, h: number): this {
    this.width = w;
    this.height = h;
    return this;
  }

  setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }
}
