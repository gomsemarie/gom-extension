export class Size {
  #width: number = 0;
  #height: number = 0;

  constructor(width?: number, height?: number);
  constructor(obj: { width?: number; height?: number });
  constructor(
    widthOrObj?: number | { width?: number; height?: number },
    height?: number
  ) {
    this._set(widthOrObj, height);
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(value: number) {
    this.#width = value;
  }

  set height(value: number) {
    this.#height = value;
  }

  set(width: number, height: number): Size;
  set(obj: { width?: number; height?: number }): Size;
  set(
    widthOrObj: number | { width?: number; height?: number },
    height?: number
  ) {
    return this._set(widthOrObj, height);
  }

  _set(
    widthOrObj?: number | { width?: number; height?: number },
    height?: number
  ) {
    if (typeof widthOrObj === "number" && typeof height === "number") {
      this.#width = widthOrObj;
      this.#height = height;
    } else if (typeof widthOrObj === "object") {
      const { width: _width = this.#width, height: _height = this.#height } =
        widthOrObj;
      this.#width = _width;
      this.#height = _height;
    }
    return this;
  }

  copyWith(obj: { width?: number; height?: number } = {}): Size {
    const { width = this.#width, height = this.#height } = obj;
    return new Size(width, height);
  }
}
