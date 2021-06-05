import { GameObject } from './GameObject';
import { app, game } from './index';
import { Vector } from './Vector';

export class Player extends GameObject {
  accel = new Vector(0, 0);
  acceleration = 0.9;
  friction = 0.8;
  accelFriction = 0.8;

  update(delta: number): void {
    this.move();

    this.vel = this.vel.add(this.accel);
    this.vel = this.vel.multiply(this.friction);
    this.accel = this.accel.multiply(this.accelFriction);

    this.collide(...(app.stage.children as GameObject[]));

    super.update(delta);
  }

  move(): void {
    const gamepad = game.keyhandler.gamepad;

    let accumulatorX = 0;
    let accumulatorY = 0;

    if (gamepad.left) accumulatorX -= this.acceleration;
    if (gamepad.right) accumulatorX += this.acceleration;
    if (gamepad.up) accumulatorY -= this.acceleration;
    if (gamepad.down) accumulatorY += this.acceleration;

    this.accel.x = accumulatorX;
    this.accel.y = accumulatorY;
  }
}
