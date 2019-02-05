import * as React from "react";
import { BasicBarChart } from "./BasicBarChart";
import  powerbi from "powerbi-visuals-api"

interface Dataset {
  title?: string,
  entries: Array<{
    name: string;
    value: number;
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
      <BasicBarChart
        layout={"vertical"} 
        width={width}
        height={height}
        entries={datasets[0].entries}
        
        barProps={{ barSize: 30 }}
        xAxis={{}}
        yAxis={{}}
      />
    </div>
    );
  }
}

export default PyramidChart;