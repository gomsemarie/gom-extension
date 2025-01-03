import { Gomponent, GomponentType } from "@modules";

export class Renderer extends Gomponent {
  constructor(options: RendererOptions = {}) {
    super(GomponentType.Renderer);
  }

  async render() {
    console.log("Rendering...");
  }
}

export type RendererOptions = {};
