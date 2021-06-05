import { Application } from 'pixi.js';
import { Game } from './Game';
import { GameObject } from './GameObject';
import './index.css';
import { Vector } from './Vector';

const scale = 32;
const app = new Application({
  width: 16 * scale,
  height: 9 * scale,
  autoDensity: true,
  antialias: false,
  resolution: 4,
  backgroundColor: 0x111111,
});

// app.view.style.removeProperty('height');
// app.view.style.removeProperty('width');
document.querySelector('.game')?.appendChild(app.view);

const game = new Game(app);

class Player extends GameObject {
  accel = new Vector(0, 0);
  acceleration = 0.9;
  friction = 0.8;
  accelFriction = 0.8;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate(delta: number) {
    this.move();

    this.vel = this.vel.add(this.accel);

    this.vel = this.vel.multiply(this.friction);
    this.accel = this.accel.multiply(this.accelFriction);
  }

  move() {
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

const player = new Player();
player.width = 32;
player.height = 32;
game.addObject(player);
