import { useCanvas, useKeyEvent } from "@hooks";
import "./root.scss";
import { useEffect } from "react";
import {
  Cat,
  GomManager,
  GomObject,
  Grid,
  PreloadManager,
  SpriteRenderer,
  SpriteType,
  Vector,
} from "@modules";
import { isNil } from "lodash";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FPS = 10;

export function Root() {
  const { keyListRef, props } = useKeyEvent<HTMLCanvasElement>();

  const canvasRef = useCanvas((canvas) => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  });

  useEffect(() => {
    let isRunning = true;
    const startGame = async () => {
      await GomManager.init(canvasRef.current!, {
        fps: FPS,
      });

      const catA = new Cat("catA", {
        speed: 5,
      });
      const catASprite = PreloadManager.findSprite("cat")?.copyWith(
        "catASprite",
        {
          type: SpriteType.MULTIPLE,
          grid: new Grid(6, 1),
          scale: new Vector(5, 5),
          selIdx: 1,
        }
      );
      if (isNil(catASprite)) return;
      const catARenderer = new SpriteRenderer({
        sprites: [catASprite],
      });

      catA.addGomponent(catARenderer);
      GomObject.instantiate(catA);

      while (isRunning) {
        await GomManager.loop(keyListRef.current);
        console.log("loop");
      }
    };
    startGame();

    return () => {
      isRunning = false;
    };
  }, []);

  return (
    <main data-page="root">
      <canvas ref={canvasRef} tabIndex={0} {...props} />
    </main>
  );
}
