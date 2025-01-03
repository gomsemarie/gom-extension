export class Vector {
  #x: number = 0;
  #y: number = 0;

  constructor(x?: number, y?: number);
  constructor(obj: { x?: number; y?: number });
  constructor(xOrObj?: number | { x?: number; y?: number }, y?: number) {
    this._set(xOrObj, y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  set x(value: number) {
    this.#x = value;
  }

  set y(value: number) {
    this.#y = value;
  }

  add(vector: Vector): Vector {
    this.#x += vector.x;
    this.#y += vector.y;
    return this;
  }

  set(x: number, y: number): Vector;
  set(obj: { x?: number; y?: number }): Vector;
  set(xOrObj: number | { x?: number; y?: number }, y?: number) {
    return this._set(xOrObj, y);
  }

  _set(xOrObj?: number | { x?: number; y?: number }, y?: number) {
    if (typeof xOrObj === "number" && typeof y === "number") {
      this.#x = xOrObj;
      this.#y = y;
    } else if (typeof xOrObj === "object") {
      const { x: _x = this.#x, y: _y = this.#y } = xOrObj;
      this.#x = _x;
      this.#y = _y;
    }
    return this;
  }

  copyWith(obj: { x?: number; y?: number } = {}): Vector {
    const { x = this.#x, y = this.#y } = obj;
    return new Vector(x, y);
  }
}
