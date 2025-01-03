import { Grid, Vector, GomponentType, GomManager } from "@modules";
import { Renderer } from "./renderer";
import { Transform } from "./transform";
import { isNil } from "lodash";

export class SpriteRenderer extends Renderer {
  #sprites: Sprite[];

  constructor(options: SpriteRendererOptions = {}) {
    const { sprites = [] } = options;
    super();
    this.#sprites = sprites;
  }

  get sprites() {
    return this.#sprites;
  }

  set sprites(value: Sprite[]) {
    this.#sprites = value;
  }

  findSprite(name: string) {
    return this.#sprites.find((sprite) => sprite.name === name);
  }

  async render() {
    const ctx = GomManager.ctx;
    if (isNil(ctx)) return;

    await Promise.all(
      this.#sprites.map(async (sprite) => {
        const image = sprite.image;
        const scale = sprite.scale;
        ctx.save();
        const transform = this.getGomObject()!.getGomponent<Transform>(
          GomponentType.Transform
        );
        const rwp = transform.getRenderWorldPosition(sprite.offset);
        switch (sprite.type) {
          case SpriteType.SINGLE:
            ctx.drawImage(
              sprite.image,
              rwp.x,
              rwp.y,
              image.width * scale.x,
              -image.height * scale.y
            );
            break;
          case SpriteType.MULTIPLE:
            const { sx, sy, sw, sh } = sprite.getSelPosInfo();
            ctx.drawImage(
              sprite.image,
              sx,
              sy,
              sw,
              sh,
              rwp.x,
              rwp.y,
              sw * scale.x,
              -sh * scale.y
            );
            break;
        }
        ctx.restore();
      })
    );
  }
}

export type SpriteRendererOptions = {
  sprites?: Sprite[];
};

export class Sprite {
  #name: string;
  #image: HTMLImageElement;
  #type: SpriteType;
  #offset: Vector;
  #scale: Vector;
  #grid: Grid = new Grid();
  #selIdx: number = 0;

  constructor(name: string, image: HTMLImageElement);
  constructor(
    name: string,
    image: HTMLImageElement,
    type: SpriteType.SINGLE,
    options?: SpriteSingleOptions
  );
  constructor(
    name: string,
    image: HTMLImageElement,
    type: SpriteType.MULTIPLE,
    options?: SpriteMultipleOptions
  );
  constructor(
    name: string,
    image: HTMLImageElement,
    type: SpriteType = SpriteType.SINGLE,
    options: SpriteOptions = {}
  ) {
    const { offset = new Vector(), scale = new Vector(1, 1) } = options;
    this.#name = name;
    this.#image = image;
    this.#type = type;
    this.#offset = offset;
    this.#scale = scale;

    switch (type) {
      case SpriteType.MULTIPLE:
        const { grid = new Grid(), selIdx = 0 } =
          options as SpriteMultipleOptions;
        this.#grid = grid;
        this.#selIdx = selIdx;
        break;
    }
  }

  get name() {
    return this.#name;
  }

  get image() {
    return this.#image;
  }

  get type() {
    return this.#type;
  }

  get offset() {
    return this.#offset;
  }

  get scale() {
    return this.#scale;
  }

  get grid() {
    return this.#grid;
  }

  get selIdx() {
    return this.#selIdx;
  }

  set offset(value: Vector) {
    this.#offset = value;
  }

  set selIdx(value: number) {
    if (this.#grid.row * this.#grid.col <= value) return;
    this.#selIdx = value;
  }

  getSelPosInfo() {
    const { row, col } = this.#grid;
    const selRow = Math.floor(this.#selIdx / col);
    const selCol = this.#selIdx % col;
    const { width, height } = this.#image;
    const selWidth = width / col;
    const selHeight = height / row;

    return {
      sx: selCol * selWidth,
      sy: selRow * selHeight,
      sw: selWidth,
      sh: selHeight,
    };
  }

  copyWith(
    name: string,
    obj: { image?: HTMLImageElement; type?: SpriteType } & SpriteSingleOptions &
      SpriteMultipleOptions = {}
  ): Sprite {
    const {
      image = this.#image,
      type = this.#type,
      grid = this.#grid,
      offset = this.#offset,
      scale = this.#scale,
      selIdx = this.#selIdx,
    } = obj;

    if (type === SpriteType.SINGLE) {
      return new Sprite(name, image, type, {
        offset,
        scale,
      });
    }
    return new Sprite(name, image, type, {
      grid,
      offset,
      scale,
      selIdx,
    });
  }
}

export type SpriteSingleOptions = {
  offset?: Vector;
  scale?: Vector;
};
export type SpriteMultipleOptions = {
  offset?: Vector;
  scale?: Vector;
  grid?: Grid;
  selIdx?: number;
};
export type SpriteOptions = SpriteSingleOptions | SpriteMultipleOptions;

export enum SpriteType {
  SINGLE,
  MULTIPLE,
}
