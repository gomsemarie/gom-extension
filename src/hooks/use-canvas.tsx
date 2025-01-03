import React, { useEffect } from "react";

export const useCanvas = (initCanvas: (canvas: HTMLCanvasElement) => void) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      initCanvas(canvas);
    }
  }, []);

  return canvasRef;
};
