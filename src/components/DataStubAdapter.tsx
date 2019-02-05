import * as React from "react";

interface Dataset {
  title: string,
  entries: Array<{
    age: string;
    value: number;
  }>
};

const StubData = {
  "title": "Возрастное распределение городского и сельского населения РФ",
  "columnTitles": [
    "Городское",
    "Сельское"
  ],
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
    "70 и более"
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


const mapStubData = (data) => ({
  title: data.title,
  datasets: [
    { 
      title: data.columnTitles[0], 
      entries: data.columns[0].map((value, index) => ({ label: data.rowTitles[index],  value }))
    },
    { 
      title:  data.columnTitles[1], 
      entries: data.columns[1].map((value, index) => ({ label: data.rowTitles[index],  value }))
    },
  ]
});

export const DataStubAdapter = (ChartComponent) => 
(props: { width?: number, height?: number; dataView?: DataView }) => {

  return (
    <ChartComponent 
      {...mapStubData(StubData)} 
      width={props.width}
      height={props.height}
    />
  )
}

export default DataStubAdapter;