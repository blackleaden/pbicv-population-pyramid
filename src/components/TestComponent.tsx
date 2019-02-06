import * as React from "react";
import DataStubAdapter from "./DataStubAdapter";
import { PyramidChart } from "./PyramidChart";
import { SolidPyramidChart } from "./SolidPyramidChart";

export const TestComponent = (props: { 
  width?: number, 
  height?: number, 
  dataView?: any,
  children?: React.ReactNode 
}) => {
  const Chart = DataStubAdapter(PyramidChart);
  const SecondChart = DataStubAdapter(SolidPyramidChart)
  
  return (
  <div     
    style={{ 
      width: props.width - 50 || 200, 
      height: props.height || 200,
      outline: "black solid 1px", 
      padding: "5px", 
      margin: "2px",
      overflow: "scroll"
    }}
  >
    <SecondChart
      width={props.width}
      height={props.height}
    />
    <hr/>
    <Chart
      width={props.width}
      height={props.height}
    />
    <hr/> 
    <pre style={{ fontSize: 14 }}>{
      props.dataView && JSON.stringify(props.dataView)
        .replace(/,/g, ',\n')
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}').split("\n").reduce(
          (acc: { indent: number, lines: string[] }, line ) => {
            if (line[0] === "}") {  acc.indent--; }
            acc.lines.push( new Array(Math.max(acc.indent, 0) + 1).join('  ') + line)
            if( line[line.length - 1] === "{") { acc.indent++; }
            return acc;
          },
          { indent: 0, lines: [] }
        ).lines.join('\n')
      }</pre>
  </div>)
};

export default TestComponent;