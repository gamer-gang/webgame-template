import { Application } from 'pixi.js';
import { GameObject } from './GameObject';
import { KeyHandler } from './KeyHandler';

export class Game {
  keyhandler: KeyHandler;

  constructor(public app: Application) {
    app.ticker.add(delta => this.update(delta));

    this.keyhandler = new KeyHandler(this.app.view);
    this.#initRenderer();
  }

  #initRenderer(): void {
    const ratio = this.app.renderer.width / this.app.renderer.height;

    window.addEventListener('resize', () => {
      const { innerWidth: w, innerHeight: h } = window;
      const dimensions: [w: number, h: number] = w / h >= ratio ? [h * ratio, h] : [w, w / ratio];

      this.app.view.style.width = `${dimensions[0]}px`;
      this.app.view.style.height = `${dimensions[1]}px`;
    });

    window.dispatchEvent(new Event('resize'));
  }

  update(delta: number): void {
    this.app.stage.children.forEach(child => {
      if (GameObject.isGameObject(child)) {
        child.update(delta);
      }
    });
  }

  addObject(object: GameObject): void {
    this.app.stage.addChild(object);
  }
}
