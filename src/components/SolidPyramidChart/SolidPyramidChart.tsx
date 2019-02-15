import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { YAxisTick } from './YAxisTick';
import { DetachedXAxis } from './DetachedXAxis';
import { Tooltip as PyramidChartTooltip } from "./Tooltip";
/*
  Constants
*/

import {
  BLUE,
  RED,
  DARK_BLUE,
  DARK_RED,
  GRID_COLOR,
  FONT_SIZE
} from "../../constants"

import {
  PyramidChartProps,
} from './types';

export const ENTRY_CAPTION_FIELD: string = "name";
export const ENTRY_VALUE_FIELD: string = "value";

export const TRANSPARENT: string = "rgba(0,0,0,0)";

export const BAR_SIZE: number = 20;
export const BAR_MAX_SIZE: number = 30;
export const X_AXIS_SIZE: number = 20;

/*
  Helpers
 */

const countBarSize = (height, length) => 
  Math.min((height - X_AXIS_SIZE) / (length || 1), BAR_MAX_SIZE);

export const SolidPyramidChart: React.StatelessComponent<PyramidChartProps> = (props) => {
  const { width, max, entries = [], height, settings } = props;
  
  const { 
    scroll, 
    gridColor = GRID_COLOR, 
    fontSize = FONT_SIZE,
    leftSetColor = BLUE,  
    leftSetSurplusColor = DARK_BLUE,  
    rightSetColor = RED, 
    rightSetSurplusColor = DARK_RED, 
  } = settings;

  const xAxisSize = X_AXIS_SIZE;
  // const yTickSize = 20;

  const barSize = scroll ? BAR_SIZE : countBarSize((height - xAxisSize), entries.length);
  const chartHeight = scroll ? (entries.length*BAR_SIZE) : (height - xAxisSize);
 
  return (
    <div 
      className={`chart-frame ${scroll ? "scroll" : "fixed-size"}`}
      style={{ height, width }}  
    >
      <BarChart
        className="column-chart-recharts"
        layout={"vertical"} 
        width={width}
        height={chartHeight}
        data={entries}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        barSize={barSize}
      >
        <XAxis 
          type="number" 
          domain={[0, max*2]}
          interval={0}
          height={0}
          ticks={[]}
        />
        <YAxis 
          width={width*.05}
          type="category" 
          interval={0} 
          tick={YAxisTick(width*.05, fontSize)}
          allowDataOverflow={true}
          dataKey={ENTRY_CAPTION_FIELD}
        />
        <YAxis 
          width={width*.05}
          type="category"
          dataKey={"total"}
          orientation="right"
          allowDataOverflow={true}
          interval={0}
          tick={{ fontSize }}
          ticks={entries.map(entry => entry.total)}
          yAxisId="2"
        /> 
        <CartesianGrid 
          stroke={gridColor} 
        />
        <Tooltip 
          content={PyramidChartTooltip(props)}
        />
        <Bar
          dataKey={"indent"}
          stackId="a"
          barSize={barSize}
          fill={TRANSPARENT}
        />
        <Bar
          dataKey={"leftSetSurplus"}
          stackId="a"
          barSize={barSize}
          fill={leftSetSurplusColor}
        />
        <Bar
          dataKey={"leftSetValue"}
          stackId="a"
          barSize={barSize}
          fill={leftSetColor}
        />
        <Bar
          dataKey={"rightSetValue"}
          stackId="a"
          barSize={barSize}
          fill={rightSetColor}
        />
        <Bar
          dataKey={"rightSetSurplus"}
          stackId="a"
          barSize={barSize}
          fill={rightSetSurplusColor}
        />
      </BarChart>
      <div 
        style={{ left: "5%", width: "90%" }}
        className="chart-x-axis"
      >
        <DetachedXAxis 
          width={width*.45}
          height={X_AXIS_SIZE}
          domain={[0, max]}
          reversed={true}
          tick={{ fontSize: FONT_SIZE }}
        />
        <DetachedXAxis 
          width={width*.45}
          height={X_AXIS_SIZE}
          domain={[0, max]}
          tick={{ fontSize: FONT_SIZE }}
        />
      </div>
    </div>
  );
}

export default SolidPyramidChart;
