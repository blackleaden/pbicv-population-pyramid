export interface Settings {
  fontSize?: number;
  scroll?: boolean;
  gridColor?: string;
  leftSetColor?: string;
  leftSetSurplusColor?: string;
  rightSetColor?: string;
  rightSetSurplusColor?: string;
}

export interface Dataset {
  title?: string,
  max?: number;
  entries: Array<{
    name: string;
    value: number;
    displayValue?: number;
    surplus?: number;
  }>
};

export interface PyramidChartEntry{
  name: string;
  indent: number;
  leftSetValue: number;
  rightSetValue: number;
  leftSetSurplus: number;
  rightSetSurplus: number;
  total: number;
}

export interface PyramidChartProps{
  title?: string;
  width?: number;
  height?: number;
  entries?: PyramidChartEntry[];
  max: number;
  leftSetTitle?: string; 
  rightSetTitle?:  string;
  description?: string;
  settings: Settings;
  categoryTitle?: string;
  error?: boolean;
}

export type PyramidChartState = Readonly<{

}>