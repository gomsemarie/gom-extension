import { GomObject } from "./gom-object";

export class Gomponent {
  #gomObject?: GomObject;
  #type: GomponentType;
  #name?: string;

  constructor(type: GomponentType, options: GomponentOptions = {}) {
    const { name } = options;
    this.#type = type;
    this.#name = name;
  }

  get type() {
    return this.#type;
  }
  get name() {
    return this.#name;
  }

  getGomObject() {
    return this.#gomObject;
  }
  setGomObject(gomObject: GomObject) {
    this.#gomObject = gomObject;
  }

  async update(): Promise<void> {}
  async render?(): Promise<void> {}
}

export enum GomponentType {
  Transform,
  Renderer,
  Collider,
}

export type GomponentOptions = {
  name?: string;
};
