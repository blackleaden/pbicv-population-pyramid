import * as React from "react";

import { PyramidChart } from "./PyramidChart";

export const TestComponent = (props: { 
  width?: number, 
  height?: number, 
  dataView?: any,
  children?: React.ReactNode 
}) => (
  <div     
    style={{ 
      width: props.width || 200, 
      height: props.height || 200,
      outline: "black solid 1px", 
      padding: "20px", 
      margin: "4px",
      overflow: "scroll"
    }}
  >
    <PyramidChart {...props}/>
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
  </div>
);

export default TestComponent;