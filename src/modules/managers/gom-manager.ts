import { GomObject, PreloadManager } from "@modules";

export class GomManager {
  static #fps: number = 60;
  static #delay: number = 1000 / this.#fps;
  static #canvas: HTMLCanvasElement;
  static #ctx: CanvasRenderingContext2D | null;
  static #deltaTime: number;

  static async init(
    canvas: HTMLCanvasElement,
    options: { fps?: number } = {}
  ): Promise<void> {
    const { fps = 60 } = options;
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#deltaTime = 0;
    this.#fps = fps;
    this.#delay = 1000 / this.#fps;

    this.#ctx?.translate(0, this.#canvas.height);

    await PreloadManager.init();
  }

  static get fps() {
    return this.#fps;
  }

  static get delay() {
    return this.#delay;
  }

  static get canvas() {
    return this.#canvas;
  }

  static get ctx() {
    return this.#ctx;
  }

  static get deltaTime() {
    return this.#deltaTime;
  }

  static async loop(keyList: string[]): Promise<void> {
    if (!this.#ctx) return;

    const start = window.performance.now();
    await this._update(keyList);
    await this._render();
    this.#deltaTime = window.performance.now() - start;

    if (this.#deltaTime < this.#delay) {
      await this._sleep(this.#delay - this.#deltaTime);
      this.#deltaTime = this.#delay;
    }
  }
  static async _update(keyList: string[]): Promise<void> {
    await GomObject.update(keyList);
  }
  static async _render(): Promise<void> {
    this.#ctx?.clearRect(0, 0, this.#canvas.width, -this.#canvas.height);
    await GomObject.render();
  }

  static _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
