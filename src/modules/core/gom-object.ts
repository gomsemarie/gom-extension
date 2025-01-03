import {
  Transform,
  TransformOptions,
  Gomponent,
  GomponentType,
} from "@modules";

export class GomObject {
  static #objects: GomObject[] = [];
  static #toBeDestroy: GomObject[] = [];

  static instantiate(gomObject: GomObject) {
    this.#objects.push(gomObject);
  }
  static destroy(gomObject: GomObject) {
    this.#toBeDestroy.push(gomObject);
  }
  static async update(keyList: string[]): Promise<void> {
    await Promise.all(
      this.#objects.map(async (object) => {
        await object.update(keyList);
        await Promise.all(
          object.gomponents.map(async (gomponent) => await gomponent.update())
        );
      })
    );
    this.#toBeDestroy.map((object) => {
      const index = this.#objects.indexOf(object);
      if (index > -1) {
        object.onDestroy();
        this.#objects.splice(index, 1);
      }
    });
  }
  static async render(): Promise<void> {
    await Promise.all(
      this.#objects.map(async (object) => {
        await Promise.all(
          object.gomponents.map(async (gomponent) => {
            await gomponent.render?.();
          })
        );
      })
    );
  }

  static find(name: string) {
    return this.#objects.find((object) => object.name === name);
  }
  static findWithTag(tag: string) {
    return this.#objects.find((object) => object.tag === tag);
  }
  static findObjectsWithTag(tag: string) {
    return this.#objects.filter((object) => object.tag === tag);
  }

  static get objects() {
    return this.#objects;
  }

  #name: string;
  #tag?: string;
  #gomponents: Gomponent[];

  constructor(name: string, options: GomObjectOptions = {}) {
    const { tag, ...transformOptions } = options;
    this.#name = name;
    this.#tag = tag;
    this.#gomponents = [];
    this.addGomponent(new Transform(transformOptions));
  }

  get name() {
    return this.#name;
  }
  get tag() {
    return this.#tag;
  }
  get gomponents() {
    return this.#gomponents;
  }

  addGomponent(gomponent: Gomponent) {
    if (this.#gomponents.find((g) => g.type === gomponent.type)) return;
    gomponent.setGomObject(this);
    this.#gomponents.push(gomponent);
  }

  getGomponent<T extends Gomponent>(type: GomponentType, name?: string) {
    return this.#gomponents.find(
      (gomponent) => gomponent.type === type && gomponent.name === name
    ) as T;
  }
  async update(keyList: string[]): Promise<void> {}
  onDestroy(): void {}
}

export type GomObjectOptions = {
  tag?: string;
} & TransformOptions;
