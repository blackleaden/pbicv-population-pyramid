/*
  Dependencies
*/

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/*
  Constants
*/  

const GRID_COLOR: string = "#eee";

export const ENTRY_CAPTION_FIELD: string = "name";
export const ENTRY_VALUE_FIELD: string = "value";

/*
  Types and interfaces
*/

export interface IChartEntry{
  name: string;
  value: number;
  surplus?: number;
  total?: number;
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
};

export interface IBarProps{
  label?: object | React.ComponentType;
  fill?: string;
  barSize?: number;
};

/*
  Main Component
*/

export const BasicBarChart = (props: {
  entries: IChartEntry[], 
  layout?: "vertical" | "horizontal"
  height: number, 
  width: number, 
  style?: object, 
  barProps: IBarProps,
  yAxis: IAxisProps, 
  xAxis: IAxisProps, 
  tooltip?: boolean | React.ComponentType ,
  reversed?: boolean
}) => {
  const { yAxis, xAxis, barProps, height, width, entries, style, layout, tooltip, reversed } = props;
  console.log('entries', entries);
  return (
    <div 
      className="column-chart-frame"
      style={{ width, ...style }}
    >
      <BarChart
        className="column-chart-recharts"
        layout={layout} 
        width={width}
        height={height}
        data={entries}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barSize={barProps.barSize}
      >
        {(layout !== "vertical") 
          ? [
            <XAxis 
              type="category" 
              dataKey={ENTRY_CAPTION_FIELD} 
              { ...xAxis } 
              interval={0} 
            />,
            <YAxis 
              type="number"
              reversed={reversed}
              { ...yAxis } 
            />
          ] : [
            <XAxis 
              type="number" 
              { ...xAxis }
              reversed={reversed} 
            />,
            <YAxis 
              type="category" 
              interval={0} 
              dataKey={ENTRY_CAPTION_FIELD} 
              { ...yAxis } 
              />
          ]
        }
        <CartesianGrid stroke={GRID_COLOR} />
        {tooltip && <Tooltip  {...(typeof tooltip !== 'boolean' ? { content: tooltip } : {})}/> }
        <Bar
          dataKey={"displayValue"}
          stackId="a"
          { ...barProps }
        />
        <Bar
          dataKey={"surplus"}
          stackId="a"
          { ...barProps }
          fill="rgba(0,0,0,0.5)"
        />
      </BarChart>
    </div>
  );
}

export default BasicBarChart;

/*
  Components
*/

export const DetachedYAxis = (props: IAxisProps) => {
  const { width, height, domain } = props;
  return (
    <BarChart
      width={width}
      height={height} 
      data={[{ name: "", value: domain[1] }]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <YAxis { ...props} />
    </BarChart>
  );
};

export const DetachedXAxis = (props: IAxisProps) => {
  const { width, height, domain } = props;
  return (
    <BarChart
      width={width}
      height={height} 
      data={[{ name: "", value: domain[1] }]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >     
      <XAxis { ...props} />
    </BarChart>
  );
};