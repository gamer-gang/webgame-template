import { DisplayObject, Resource, Sprite, Texture } from 'pixi.js';
import { Vector } from './Vector';

export abstract class GameObject extends Sprite {
  vel = new Vector(0, 0);

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

  readonly update = (delta: number): void => {
    this.x += this.vel.x * delta;
    this.y += this.vel.y * delta;

    this.onUpdate(delta);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate(delta: number): void {
    // nothing
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

  distanceTo(other: GameObject): Vector {
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
