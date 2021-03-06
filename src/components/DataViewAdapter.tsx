import * as React from "react";
import powerbi from "powerbi-visuals-api";

import { chartSettings, VisualSettings } from "../settings";
import { GRID_COLOR, BLUE, DARK_BLUE, RED, DARK_RED } from "../constants";

import { PyramidChartProps, IntermediateData, Dataset, PyramidChartEntry } from "./types";

export const NBSP: string = " ";

export const prepareEntriesFromDataSets = (dataSets: Dataset[], max): PyramidChartEntry[] => 
  (!dataSets[0] || !Array.isArray(dataSets[0].entries))
  ? [] 
  : dataSets[0].entries.map(
    (entry, index) => ({
      name: entry.name.trim().replace(/\s/g, NBSP),
      indent: Math.max(max - entry.value, 0),
      leftSetValue: entry.displayValue,
      rightSetValue: dataSets[1].entries[index].displayValue,
      leftSetSurplus: entry.surplus,
      rightSetSurplus: dataSets[1].entries[index].surplus,
      total: entry.value + dataSets[1].entries[index].value,
    })
  );

export const mapDataView = (dataView: powerbi.DataView): Partial<PyramidChartProps> => {

  if (!isValidDataView(dataView)){
    throw { 
      title: "Please add category first",
      description: "e.g. age or year"
    };
  }
  
  const series = dataView.categorical.values.grouped();
  
  if (!series || series.length < 2) {
    throw { 
      title: "Please add series",
      description: "e.g. gender attribute"
    }
  }
  
  const names = dataView.categorical.categories[0].values as string[];
  const firstValues = series[0].values[0].values as number[];
  const secondValues = series[1].values[0].values as number[];

  const result: Partial<IntermediateData> = {
    categoryTitle: String(dataView.categorical.categories[0].source.displayName),
    entries: [] as PyramidChartEntry[],
    max: Math.max(
      firstValues.reduce((a, v) => (a < v) ? v : a, 0),
      secondValues.reduce((a, v) => (a < v) ? v : a, 0),
    ),
    leftSetTitle: String(series[0].name),
    rightSetTitle: String(series[1].name),
    dataSets: [
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
    ] as Dataset[]
  };
  
  return result;
}

export const isValidDataView = (dataView: powerbi.DataView): boolean => !!(
  dataView 
    && dataView.categorical 
    && dataView.categorical.values
    && dataView.categorical.categories
    && dataView.categorical.categories[0]
  );

export const DataViewAdapter = (ChartComponent: React.ComponentType<PyramidChartProps>) => 
(props: { width?: number, height?: number; dataView: powerbi.DataView, settings: VisualSettings }) => {
 
  let data: IntermediateData = { 
    dataSets: [], 
    settings: props.settings ? props.settings.chartSettings : {}, 
    entries: [], 
    max: 0 
  };
 
  try{
    data = { 
      ...data, 
      ...mapDataView(props.dataView) 
    };
    
    if (!(data.dataSets[0] 
      && data.dataSets[0].max 
      && Array.isArray(data.dataSets[0].entries)
      && data.dataSets[1] 
      && data.dataSets[1].max
      && Array.isArray(data.dataSets[1].entries)
    )) {
      throw {
        title: "Invalid data",
        description: "Series are not given"
      }
    }

  } catch (error) {
    data.error = (typeof error === "object" 
      ? error 
      : { title: String(error) ? String(error) : "Invalid data" }
    )
  }
  
  return (
    <ChartComponent 
      error={data.error}
      settings={data.settings}
      max={data.max}
      categoryTitle={data.categoryTitle}
      leftSetTitle={data.leftSetTitle}
      rightSetTitle={data.rightSetTitle}
      entries={ prepareEntriesFromDataSets(data.dataSets, data.max) }
      width={props.width}
      height={props.height}
    />
  )
}

export default DataViewAdapter;