import { Canvas } from "./Canvas";
import { useState, useEffect, useRef } from "react";
import { drawGl, initGl } from "./drawGl";

const appStyle: React.CSSProperties = Object.freeze({
  width: 1200,
  height: 600,
});

export const App = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (appRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const {
          contentRect: { width, height },
        } = entries[0];
        setDimensions([Math.floor(width), Math.floor(height)]);
      });
      resizeObserver.observe(appRef.current);
    } else {
      console.log("Header reference is not set!");
    }
  }, []);

  useEffect(() => {
    if (
      !isInitialized &&
      dimensions[0] !== null &&
      dimensions[1] !== null &&
      canvasRef.current
    ) {
      const canvas = canvasRef.current;
      const gl: WebGL2RenderingContext = canvas.getContext("webgl2");

      if (gl === null) {
        console.log("Unable to initialize webgl!");
      } else {
        initGl(gl);
        drawGl(gl);
        setIsInitialized(true);
      }
    }
  }, [dimensions, setIsInitialized]);
  return (
    <div ref={appRef} style={appStyle}>
      {dimensions[0] !== null && dimensions[1] !== null ? (
        <Canvas
          className="header__webgl-balloons"
          width={dimensions[0]}
          height={dimensions[1]}
          ref={canvasRef}
        />
      ) : null}
    </div>
  );
};
