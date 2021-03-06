import { Gamepad } from './types';
import { Vector } from './Vector';

export class KeyHandler {
  keys: { [key: string]: boolean };
  mouse: {
    m1: boolean;
    m2: boolean;
    pos: Vector;
  };

  constructor(canvas: Element) {
    this.keys = {};
    this.mouse = {
      m1: false,
      m2: false,
      pos: new Vector(0, 0),
    };

    document.addEventListener('keydown', event => {
      this.keys[event.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', event => {
      this.keys[event.key.toLowerCase()] = false;
    });

    document.addEventListener('mousedown', () => {
      this.mouse.m1 = true;
    });

    document.addEventListener('mouseup', () => {
      this.mouse.m1 = false;
    });

    canvas.addEventListener('mousemove', event => {
      // we need to convert their on screen pixels into the in game pixels
      // divide their x by width of canvas and multiply by width of game
      this.mouse.pos.x = ((event as MouseEvent).offsetX / canvas.clientWidth) * 16 * 32;
      this.mouse.pos.y = ((event as MouseEvent).offsetY / canvas.clientHeight) * 9 * 32;
      // console.log(`canvas width: ${canvas.clientWidth}, offsetx: ${(e as MouseEvent).offsetX}, mousex: ${this.mouse.pos.x}`)
    });
  }

  get gamepad(): Gamepad {
    return {
      up: this.keys.w,
      down: this.keys.s,
      left: this.keys.a,
      right: this.keys.d,
      mouse: this.mouse,
    };
  }
}
