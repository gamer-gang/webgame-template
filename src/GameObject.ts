import { DisplayObject, Resource, Sprite, Texture } from 'pixi.js';
import { Vector } from './Vector';

export abstract class GameObject extends Sprite {
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
    // avoid floating point math hell
    if (Math.abs(this.vel.x) < 0.1) this.vel.x = 0;
    if (Math.abs(this.vel.y) < 0.1) this.vel.y = 0;

    this.x += this.vel.x * delta;
    this.y += this.vel.y * delta;
  }

  collide(...objects: GameObject[]): void {
    objects.forEach((object: GameObject) => {
      if (object == this) return;
      if (this.checkCollision(object)) {
        const distance = this.differenceVector(object);
        const timeToCollision = new Vector(
          this.vel.x != 0 ? Math.abs(distance.x / this.vel.x) : 0,
          this.vel.y != 0 ? Math.abs(distance.y / this.vel.y) : 0
        );
        const shortest = Math.min(timeToCollision.x, timeToCollision.y);

        // console.log(distance, timeToCollision);

        if (this.vel.x != 0 && this.vel.y == 0) {
          this.vel.x *= shortest;
        } else if (this.vel.x == 0 && this.vel.y != 0) {
          this.vel.y *= shortest;
        } else {
          // if we hit the x axis first, we should flatten our direction onto it
          if (shortest == timeToCollision.x) {
            // we are rubbing against the left/right side of the box
            this.vel.x = 0;
            this.vel.y *= this.friction;
          } else {
            // we are rubbing against the bottom/top side of a box
            this.vel.x *= this.friction;
            this.vel.y = 0;
          }
        }
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
    const distance = new Vector(0, 0);

    if (this.x < other.x) {
      distance.x = other.x - (this.x + this.width);
    } else if (this.x > other.x) {
      distance.x = this.x - (other.x + other.width);
    }

    if (this.y < other.y) {
      distance.y = other.y - (this.y + this.height);
    } else if (this.y > other.y) {
      distance.y = this.y - (other.y + other.height);
    }

    return distance;
  }
}
