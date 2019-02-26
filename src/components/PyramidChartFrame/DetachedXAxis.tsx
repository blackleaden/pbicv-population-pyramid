import * as React from "react";
import { BarChart, XAxis, AxisDomain } from "recharts";
 
export const getDecimalTicks = (start: number, max: number): number[] => {
  const length = Math.floor(Math.max(0, max - start));
  if (!length) { return [max]; }

  const power = Math.max(2, String(length).length);
  const multiplier = Number(String(length)[0]) || 1;
  const base = Math.floor(start);
  const ticks = [base];
  const count = 10 + Math.floor(
    (max - multiplier * Math.pow(10, power - 1)) 
    / (multiplier * Math.pow(10, power - 2)) 
  );
  for (let i = 1; i <= count; i++) {
    ticks.push(base + i * multiplier * Math.pow(10, power - 2));
  }
  return ticks;
}

export interface IAxisProps{
  domain?: number[];
  tick?: object | React.ComponentType;
  width?: number;
  height?: number;
  minTickGap?: number;
  tickSize?: number;
  type?: string;
  hide?: boolean;
  reversed?: boolean;
};

export const DetachedXAxis: React.StatelessComponent<IAxisProps> = (props: { 
  width?: number, height?: number, domain: [number, number], reversed
}) => {
  const { width, height, domain } = props;
  
  return (
    <div className="detached-x-axis">
      <BarChart
        width={width}
        height={height} 
        data={[{ name: "", value: domain[1] }]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      > 
        <XAxis 
          width={width}
          height={height}
          domain={domain as [AxisDomain, AxisDomain]}
          type="number"
          ticks={getDecimalTicks(0, domain[1] as number)} 
          allowDataOverflow={true}
          interval={0}
          reversed={props.reversed}
        />
      </BarChart>
    </div>
  );
};