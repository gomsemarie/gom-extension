import { Gomponent, GomponentType } from "@modules";

export class Collider extends Gomponent {
  constructor(options: ColliderOptions = {}) {
    super(GomponentType.Collider);
  }
}

export type ColliderOptions = {};
