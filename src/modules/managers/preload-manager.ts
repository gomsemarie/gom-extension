import { Sprite } from "@modules";

export class PreloadManager {
  static #sprites: Sprite[] = [];
  static #configJson: {
    preloadImages: {
      name: string;
      src: string;
    }[];
  } = {
    preloadImages: [],
  };

  static async init(): Promise<void> {
    await this.loadConfigJson();
    await this.loadImages();
  }

  static get sprites() {
    return this.#sprites;
  }

  static get configJson() {
    return this.#configJson;
  }

  static async loadConfigJson(): Promise<void> {
    const response = await fetch("data/config.json");
    this.#configJson = await response.json();
  }

  static async loadImages(): Promise<void> {
    await Promise.all(
      this.#configJson.preloadImages.map(async (info) => {
        const img = new Image();
        img.src = info.src;
        await new Promise((resolve) => {
          img.onload = () => {
            resolve(null);
          };
          img.onerror = () => {
            throw new Error(`Image load error: ${info.src}`);
          };
        });
        this.#sprites.push(new Sprite(info.name, img));
      })
    );
  }

  static findSprite(name: string) {
    return this.#sprites.find((sprite) => sprite.name === name);
  }
}
