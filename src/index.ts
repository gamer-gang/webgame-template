import { Application } from 'pixi.js';
import { Game } from './Game';
import { GameObject } from './GameObject';
import './index.css';
import { Player } from './Player';

const scale = 32;
export const app = new Application({
  width: 16 * scale,
  height: 9 * scale,
  autoDensity: true,
  antialias: false,
  resolution: 4,
  backgroundColor: 0x111111,
});

// app.view.style.removeProperty('height');
// app.view.style.removeProperty('width');
document.querySelector('#game')?.appendChild(app.view);

export const game = new Game(app);

class Box extends GameObject {}

const player = new Player();
const box = new Box();
const box2 = new Box();

player.setPosition(32, 32).setSize(32, 32);
box.setPosition(0, 8 * 32).setSize(16 * 32, 32);
box2.setPosition(8 * 32, 4 * 32).setSize(32, 128);
game.addObject(player, box, box2);
