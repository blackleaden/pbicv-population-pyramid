import * as React from "react";
import { BasicBarChart } from "./BasicBarChart";

export interface PyramidChartProps{
  width?: number;
  height?: number;
  dataView?: { single?: { value?: any } };
}

export type PyramidChartState = Readonly<{

}>


export class PyramidChart extends React.PureComponent<PyramidChartProps, PyramidChartState> {
  public static defaultProps: Partial<PyramidChartProps>;

  public constructor(props: PyramidChartProps){
    super(props);
  }

  public render () {
    const { width, height, dataView = {} } = this.props;
    return (
      <div 
        className="column-chart-frame"
      >
      <BasicBarChart
        layout={"vertical"} 
        width={width}
        height={height}
        entries={[{ 
          name: "value", 
          value: dataView.single && dataView.single.value ? dataView.single.value : 0
        }]}
        barProps={{ barSize: 30 }}
        xAxis={{}}
        yAxis={{}}
      />
    </div>
    );
  }
}

export default PyramidChart;