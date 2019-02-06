import * as React from "react";
import { BasicBarChart } from "./BasicBarChart";

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


export class PyramidChart extends React.PureComponent<PyramidChartProps, PyramidChartState> {
  public static defaultProps: Partial<PyramidChartProps>;

  public constructor(props: PyramidChartProps){
    super(props);
  }

  public render () {
    const { width, height, datasets, title } = this.props;
    
    return (
      <div 
        className="column-chart-frame"
      >
      <span className="title">{ title }</span>
      <hr/>
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
    </div>
    );
  }
}

export default PyramidChart;