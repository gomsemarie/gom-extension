export class Grid {
  #row: number = 1;
  #col: number = 1;

  constructor(row?: number, col?: number);
  constructor(obj: { row?: number; col?: number });
  constructor(xOrObj?: number | { row?: number; col?: number }, col?: number) {
    this._set(xOrObj, col);
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  set row(value: number) {
    this.#row = value;
  }

  set col(value: number) {
    this.#col = value;
  }

  set(row: number, col: number): Grid;
  set(obj: { row?: number; col?: number }): Grid;
  set(xOrObj: number | { row?: number; col?: number }, col?: number) {
    return this._set(xOrObj, col);
  }

  _set(xOrObj?: number | { row?: number; col?: number }, col?: number) {
    if (typeof xOrObj === "number" && typeof col === "number") {
      this.#row = xOrObj;
      this.#col = col;
    } else if (typeof xOrObj === "object") {
      const { row: _row = this.#row, col: _col = this.#col } = xOrObj;
      this.#row = _row;
      this.#col = _col;
    }
    return this;
  }

  copyWith(obj: { row?: number; col?: number } = {}): Grid {
    const { row = this.#row, col = this.#col } = obj;
    return new Grid(row, col);
  }
}
