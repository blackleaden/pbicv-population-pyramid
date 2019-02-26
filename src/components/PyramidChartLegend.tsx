import * as React from "react";

import { PyramidChartProps } from "./types";

export const PyramidChartLegend: React.StatelessComponent<PyramidChartProps> = (props) => (
  <div className="chart-legend">
    <span className="chart-y-axis-title category-title left">{props.categoryTitle}</span>
    <span className="chart-y-axis-title right">Total</span>    
    <div className="chart-dataset-titles-group">
      <span className="chart-dataset-title left-set-title">{props.leftSetTitle}</span>
      <span className="chart-dataset-title right-set-title">{props.rightSetTitle}</span>
    </div>
  </div>
)

export default PyramidChartLegend;