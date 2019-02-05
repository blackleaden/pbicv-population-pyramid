import * as React from "react";

// import { DataView } from "powerbi-visuals-api";

export const mapDataView = (dataView) => {
  //   dataView && dataView.categorical 
        //   ? dataView.categorical.values.grouped().map((group) => ({
        //     name: String(group.name),
        //     value: Number(group.values[0].values[0] )
        //   }))
        //   : []
        // }
  return {
    title: "dataView title",
    datasets: [
      { title: "a column", entries: [] },
    ]
  }
}

export const DataViewAdapter = (ChartComponent) => 
(props: { width?: string, height?: number; dataView: DataView }) => {

  return (
    <ChartComponent 
      {...mapDataView(props.dataView)} 
      width={props.width}
      height={props.height}
    />
  )
}

export default DataViewAdapter;