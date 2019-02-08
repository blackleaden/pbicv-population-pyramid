import * as React from "react";
import powerbi from "powerbi-visuals-api";

import { PyramidChartProps } from "./SolidPyramidChart";

export const isValidDataView = (dataView: powerbi.DataView): boolean => {
  return !!(dataView 
    && dataView.categorical 
    && dataView.categorical.values
    && dataView.categorical.categories
    && dataView.categorical.categories[0]
  );
}

export const mapDataView = (dataView: powerbi.DataView): Partial<PyramidChartProps> => {

  if (!isValidDataView(dataView)){
    throw { 
      title: "Please add category first",
      description: "e.g. age or year"
    };
  }
  
  const series = dataView.categorical.values.grouped();
  if (series.length < 2) {
    throw { 
      title: "Please add series",
      description: "e.g. gender attribute"
    }
  }
  
  const names = dataView.categorical.categories[0].values as string[];
  const firstValues = series[0].values[0].values as number[];
  const secondValues = series[1].values[0].values as number[];
  
  return {
    title: "Population pyramid chart", // REVIEW ???
    categoryTitle: dataView.categorical.categories[0].source.displayName,
    datasets: [
      { 
        title: String(series[0].name), 
        max:    firstValues.reduce((a, v) => (a < v) ? v : a, 0),
        entries: firstValues.map((value: number, index: number) => ({ 
          name: names[index],  
          value,
          displayValue: Math.min(value , secondValues[index]),
          surplus: Math.max(0, value - secondValues[index])
        }))
      },
      { 
        title:  String(series[1].name), 
        max:    secondValues.reduce((a, v) => (a < v) ? v : a, 0),
        entries: secondValues.map((value, index) => ({ 
          name: names[index],  
          value,
          displayValue: Math.min(value, firstValues[index]),
          surplus: Math.max(0, value - firstValues[index])
        }))
      },
    ]
  }
}

export const DataViewAdapter = (ChartComponent: React.ComponentType<PyramidChartProps>) => 
(props: { width?: number, height?: number; dataView: powerbi.DataView }) => {
  let error: boolean = false;
  let data: PyramidChartProps = { title: "No title", datasets: [] };
  
  try{
    data = { ...data, ...mapDataView(props.dataView) };
    if (!(data.datasets[0] 
      && data.datasets[0].max 
      && Array.isArray(data.datasets[0].entries)
      && data.datasets[1] 
      && data.datasets[1].max
      && Array.isArray(data.datasets[1].entries)
    )) {
      data.error = true;
    }
  } catch (e) {
    console.log("Data error", e);
    data = {
      ...(typeof e === "object" ? e : { title: String(e) ? String(e) : "Invalid data" }),
      datasets: [],
      error: true,
    };
  }

  return (
    <ChartComponent 
      error={!!data.error}
      {...data}
      
      width={props.width}
      height={props.height}
    />
  )
}

export default DataViewAdapter;