import * as React from "react";
import { PyramidChartProps } from "./SolidPyramidChart";
import { prepareEntriesFromDataSets } from "./DataViewAdapter";

export const stubData = {
  "columnTitles": [
    "Female",
    "Male"
  ],
  "categoryTitle": "age",
  "rowsTitles": [
    "0-4",
    "5-9",
    "10-14",
    "15-19",
    "20-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-59",
    "60-64",
    "65-69",
    "70 and more"
  ],
"columns": [
  [
    6919,
    6350,
    5392,
    4938,
    5363,
    8739,
    9943,
    8872,
    7980,
    7096,
    6770,
    7954,
    7130,
    5931,
    9950,
  ],
  [
    2428,
    2523,
    2206,
    1878,
    1973,
    2381,
    2823,
    2553,
    2473,
    2403,
    2602,
    3095,
    2653,
    2006,
    3556,
  ]
]
}

export const mapStubData = (data) => ({
  title: data.title,
  settings: {},
  max: Math.max( 
    data.columns[0].reduce((a, v) => (a < v) ? v : a, 0),
    data.columns[1].reduce((a, v) => (a < v) ? v : a, 0)
  ),
  leftSetTitle: data.columnTitles[0],
  rightSetTitle: data.columnTitles[1],
  dataSets: [
    { 
      title: data.columnTitles[0], 
      max:    data.columns[0].reduce((a, v) => (a < v) ? v : a, 0),
      entries: data.columns[0].map((value, index) => ({ 
        name: data.rowsTitles[index],  
        value,
        displayValue: Math.min(value , data.columns[1][index]),
        surplus: Math.max(0, value - data.columns[1][index])
      }))
    },
    { 
      title:  data.columnTitles[1], 
      max:    data.columns[1].reduce((a, v) => (a < v) ? v : a, 0),
      entries: data.columns[1].map((value, index) => ({ 
        name: data.rowsTitles[index],  
        value,
        displayValue: Math.min(value, data.columns[0][index]),
        surplus: Math.max(0, value - data.columns[0][index])
      }))
    },
  ]
});

export const DataStubAdapter = (ChartComponent: React.ComponentType<PyramidChartProps>) => 
(props: { width?: number, height?: number; dataView?: DataView }) => {
  const data = mapStubData(stubData);
  
  return (
    <ChartComponent
      settings={data.settings}
      max={data.max}
      categoryTitle={stubData.categoryTitle}
      leftSetTitle={data.leftSetTitle}
      rightSetTitle={data.rightSetTitle}
      entries={prepareEntriesFromDataSets(data.dataSets, data.max)}
      width={props.width}
      height={props.height}
    />
  )
}

export default DataStubAdapter;