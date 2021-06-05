import { Vector } from './Vector';

export interface Gamepad {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  mouse: {
    m1: boolean;
    m2: boolean;
    pos: Vector;
  };
}
