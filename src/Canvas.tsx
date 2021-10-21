import { forwardRef } from "react";

export const Canvas = forwardRef<
    HTMLCanvasElement,
    { [propName: string]: any }
>((props, ref) => {
    return <canvas ref={ref} {...props} />;
});
