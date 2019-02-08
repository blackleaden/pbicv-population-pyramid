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

export const NBSP = " ";
export const BLUE = "#00b0f0";
export const RED = "#ff0000";
export const DARK_BLUE = "#002060";
export const DARK_RED = "#632523";
export const TRANSPARENT = "rgba(0,0,0,0)";

export const FONT_SIZE = 10;
export const BAR_SIZE = 20;
export const BAR_MAX_SIZE = 30;
export const X_AXIS_SIZE = 20;

/*
  Helpers
 */
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

export const prepareEntriesFromDatasets = (datasets: Dataset[], max) => {
  return datasets[0].entries.map(
    (entry, index) => ({
      name: entry.name.trim().replace(/\s/g, NBSP),
      indent: Math.max(max - entry.value, 0),
      firstValue: entry.displayValue,
      secondValue: datasets[1].entries[index].displayValue,
      firstSurplus: entry.surplus,
      secondSurplus: datasets[1].entries[index].surplus,
      total: entry.value + datasets[1].entries[index].value,
    })
  );
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

export const DetachedXAxis: React.StatelessComponent<IAxisProps> = (props) => {
  const { width, height, domain } = props;
  console.log('DetachedXAxis', domain, props.reversed);
  return (
    <div className="detached-x-axis">
      <BarChart
        width={width}
        height={height} 
        data={[{ name: "", value: domain[1] }]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      > 
        <XAxis 
          { ...props} 
          type="number"
          ticks={getDecimalTicks(0, domain[1])} 
          allowDataOverflow={true}
          interval={0}
        />
      </BarChart>
    </div>
  );
};


interface Dataset {
  title?: string,
  max?: number;
  entries: Array<{
    name: string;
    value: number;
    displayValue?: number;
    surplus?: number;
  }>
};

export interface PyramidChartProps{
  width?: number;
  height?: number;
  title?: string;
  scroll?: boolean;
  datasets: Dataset[];
  description?: string;
  categoryTitle?: string;
  error?: boolean;
}

export type PyramidChartState = Readonly<{

}>

const countBarSize = (height, length) => Math.min((height - X_AXIS_SIZE) / (length || 1), BAR_MAX_SIZE);

export const SolidPyramidChart: React.StatelessComponent<PyramidChartProps> = (props) => {
  const { width,  datasets, height, scroll } = props;
  const xAxisSize = X_AXIS_SIZE;
  const yTickSize = 20;

  const max =  Math.max(datasets[0].max, datasets[1].max);
  const entries = prepareEntriesFromDatasets(datasets, max);

  const barSize = scroll ? BAR_SIZE : countBarSize((height - xAxisSize), entries.length);
  const chartHeight = scroll ? (entries.length*BAR_SIZE) : (height - xAxisSize);
 
  console.log('total entries', entries.map(entry => entry.total));
 
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
          // mirror={true}

          type="category" 
          interval={0} 
          tick={{ fontSize: FONT_SIZE }}
          allowDataOverflow={true}
          dataKey={ENTRY_CAPTION_FIELD}
          ticks={entries.map((entry, i) => { 
            // console.log(i, entry.name, entry.name.substr(0, 5)); 
            return entry.name;
          })}
        />
        <YAxis 
          width={width*.05}
          // mirror={true}
          type="category"
          dataKey={"total"}
          orientation="right"
          allowDataOverflow={true}
          interval={0}
          tick={{ fontSize: FONT_SIZE }}
          ticks={entries.map(entry => entry.total)}
          yAxisId="2"
        /> 
        <CartesianGrid 
          stroke={GRID_COLOR} 
        />
        <Tooltip />
        <Bar
          dataKey={"indent"}
          stackId="a"
          barSize={barSize}
          fill={TRANSPARENT}
        />
        <Bar
          dataKey={"firstSurplus"}
          stackId="a"
          barSize={barSize}
          fill={DARK_BLUE}
        />
        <Bar
          dataKey={"firstValue"}
          stackId="a"
          barSize={barSize}
          fill={BLUE}
        />
        <Bar
          dataKey={"secondValue"}
          stackId="a"
          barSize={barSize}
          fill={RED}
        />
        <Bar
          dataKey={"secondSurplus"}
          stackId="a"
          barSize={barSize}
          fill={DARK_RED}
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
