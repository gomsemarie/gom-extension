import { Vector, GomObject, Gomponent, GomponentType } from "@modules";

export class Transform extends Gomponent {
  #position: Vector;
  #rotation: Vector;
  #scale: Vector;

  constructor(options: TransformOptions = {}) {
    const {
      position = new Vector(),
      rotation = new Vector(),
      scale = new Vector(1, 1),
    } = options;
    super(GomponentType.Transform);
    this.#position = position;
    this.#rotation = rotation;
    this.#scale = scale;
  }

  get position() {
    return this.#position;
  }
  get rotation() {
    return this.#rotation;
  }
  get scale() {
    return this.#scale;
  }

  set position(position: Vector) {
    this.#position = position;
  }
  set rotation(rotation: Vector) {
    this.#rotation = rotation;
  }
  set scale(scale: Vector) {
    this.#scale = scale;
  }

  getWorldPosition(offset: Vector) {
    return this.#position.copyWith().add(offset);
  }
  getRenderPosition() {
    return this.#position.copyWith({
      y: -this.#position.y,
    });
  }
  getRenderWorldPosition(offset: Vector) {
    return this.getWorldPosition(offset).copyWith({
      y: -this.getWorldPosition(offset).y,
    });
  }
}

export type TransformOptions = {
  position?: Vector;
  rotation?: Vector;
  scale?: Vector;
};
