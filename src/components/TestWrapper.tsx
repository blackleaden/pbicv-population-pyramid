import * as React from "react";
import powerbi from "powerbi-visuals-api";

export const indentJSON = (object) => JSON.stringify(object)
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
  ).lines.join('\n');

export const TestWrapper = (Component) => (props: { 
  width?: number, 
  height?: number, 
  dataView?: powerbi.DataView,
  children?: React.ReactNode 
}) => (
  <div
    style={{ 
      width: props.width - 16 || 200, 
      height: props.height || 200,
      outline: "black solid 1px", 
      padding: "5px", 
      margin: "2px",
      overflow: "scroll"
    }}
  >
    <Component
      dataView={props.dataView}
      width={props.width}
      height={props.height}
    />
    <hr/>
    <pre style={{ fontSize: 12 }}>{
      props.dataView && indentJSON(props.dataView)
      }</pre>
  </div>
);

export default TestWrapper;