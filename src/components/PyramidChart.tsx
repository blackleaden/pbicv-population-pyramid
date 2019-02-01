import * as React from "react";
import { BasicBarChart } from "./BasicBarChart";
import  powerbi from "powerbi-visuals-api"

export interface PyramidChartProps{
  width?: number;
  height?: number;
  dataView?: powerbi.DataView;
}

export type PyramidChartState = Readonly<{

}>


export class PyramidChart extends React.PureComponent<PyramidChartProps, PyramidChartState> {
  public static defaultProps: Partial<PyramidChartProps>;

  public constructor(props: PyramidChartProps){
    super(props);
  }

  public render () {
    const { width, height, dataView } = this.props;
    
    return (
      <div 
        className="column-chart-frame"
      >
      <BasicBarChart
        layout={"vertical"} 
        width={width}
        height={height}
        entries={
          dataView && dataView.categorical 
          ? dataView.categorical.values.grouped().map((group) => ({
            name: String(group.name),
            value: Number(group.values[0].values[0] )
          }))
          : []
        }
        barProps={{ barSize: 30 }}
        xAxis={{}}
        yAxis={{}}
      />
    </div>
    );
  }
}

export default PyramidChart;