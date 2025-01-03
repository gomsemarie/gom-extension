import { useCanvas } from "@hooks";
import "./root.scss";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function Root() {
  const canvasRef = useCanvas((canvas) => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  });

  return (
    <main data-page="root">
      <canvas ref={canvasRef} />
    </main>
  );
}
