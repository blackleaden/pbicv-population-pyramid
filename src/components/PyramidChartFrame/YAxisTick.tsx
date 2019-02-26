
import { FONT_SIZE, TICK_FONTCOLOR } from "../../constants";
import * as React from "react";

export const YAxisTick = (yTickWidth, fontSize = FONT_SIZE) => (
  i: { width: number, height: number, y: number, x: number, payload: { value: string } },
) => {
  const estimatedCaptionWidth: number = (i.payload.value.length * FONT_SIZE * 0.5) ;

  const cutValue: string = estimatedCaptionWidth > yTickWidth
  ? `${i.payload.value.slice(
      0,
      Math.floor(i.payload.value.length * (yTickWidth - 20) / estimatedCaptionWidth),
    )}...`
  : i.payload.value;

  return (
    <text
      width={i.width}
      height={i.height}
      x={i.y}
      y={i.y}
      stroke="none"
      fill={TICK_FONTCOLOR}
      fontSize={fontSize}
      className="recharts-text recharts-cartesian-axis-tick-value"
      textAnchor="start"
    >
      <tspan x={0} dy="0.355em">{cutValue}</tspan>
    </text>
  );
}
