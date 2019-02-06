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

export const BLUE = "#00b0f0";
export const RED = "#ff0000";
export const DARK_BLUE = "#002060";
export const DARK_RED = "#632523";
export const TRANSPARENT = "rgba(0,0,0,0)";

export const BAR_SIZE = 20;
export const X_AXIS_SIZE = 20;

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
  datasets: Dataset[];
}

export type PyramidChartState = Readonly<{

}>


export class SolidPyramidChart extends React.PureComponent<PyramidChartProps, PyramidChartState> {
  public static defaultProps: Partial<PyramidChartProps>;

  public constructor(props: PyramidChartProps){
    super(props);
  }

  public render () {
    const { width, height, datasets, title } = this.props;
    const barSize = BAR_SIZE;
    const xAxisSize = X_AXIS_SIZE;
    const max = Math.max(datasets[0].max, datasets[1].max);
    const entries = datasets[0].entries.map( //REVIEW
      (entry, index) => ({
        name: entry.name,
        indent: Math.max(max - entry.value, 0) + max*.1,
        firstValue: entry.displayValue,
        secondValue: datasets[1].entries[index].displayValue,
        firstSurplus: entry.surplus,
        secondSurplus: datasets[1].entries[index].surplus,
        total: entry.value + datasets[1].entries[index].value,
      })
    );
    
    return (
      <article>
        <header>
          <span className="title">{ title }</span>
        </header>
        <main  
          className="column-chart-frame"
        >
          <BarChart
            className="column-chart-recharts"
            layout={"vertical"} 
            width={width}
            height={entries.length*barSize + xAxisSize}
            data={entries}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barSize={barSize}
          >
            <XAxis 
              type="number" 
              domain={[0, max*2.2]}
            />
            <YAxis 
              type="category" 
              interval={0} 
              mirror={true}
              dataKey={ENTRY_CAPTION_FIELD}
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
        </main>
        <footer>
        </footer>
      </article>
    );
  }
}

export default SolidPyramidChart;

 {/* 
  <BasicBarChart
    style={{ display: "inline-block",  outline: "goldenrod 1px solid" }}
    layout={"vertical"} 
    width={width / 2 - 35}
    height={datasets[0].entries.length * 22 + 20}
    entries={datasets[0].entries}
    reversed={true}
    barProps={{ barSize: 20, fill: "#F11" }}
    xAxis={{ domain: [0, Math.max(datasets[0].max, datasets[1].max)*1.1 ]}}
    yAxis={{}}
    tooltip={true}
  />
  <BasicBarChart
    layout={"vertical"} 
    style={{ display: "inline-block", outline: "goldenrod 1px solid" }}
    width={width / 2 - 35}
    height={datasets[0].entries.length * 22 + 20}
    entries={datasets[1].entries}
    barProps={{ barSize: 20, fill: "#11F"  }}
    xAxis={{ domain: [0, Math.max(datasets[0].max, datasets[1].max)*1.1] }}
    yAxis={{ width: 0 }}
    tooltip={true}
  /> 
*/}