import {
  GomObject,
  GomObjectOptions,
  GomponentType,
  Transform,
} from "@modules";

export class Cat extends GomObject {
  #speed: number;

  constructor(name: string, options: CatOptions = {}) {
    const { speed = 1, ...gomObjectOoptions } = options;
    super(name, gomObjectOoptions);
    this.#speed = speed;
  }

  get speed() {
    return this.#speed;
  }
  set speed(value: number) {
    this.#speed = value;
  }

  async update(keyList: string[]) {
    const transform = this.getGomponent<Transform>(GomponentType.Transform);
    const position = transform.position;
    // console.log(keyList);
    if (keyList.includes("w")) {
      position.y += this.#speed;
    }
    if (keyList.includes("s")) {
      position.y -= this.#speed;
    }
    if (keyList.includes("a")) {
      position.x -= this.#speed;
    }
    if (keyList.includes("d")) {
      position.x += this.#speed;
    }
  }
}

export type CatOptions = {
  speed?: number;
} & GomObjectOptions;
