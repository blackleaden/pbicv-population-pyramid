import * as React from "react";
import PyramidChartFrame from "./PyramidChartFrame";
import { mapStubData, stubData } from "./DataStubAdapter";
import { PyramidChartProps } from "./types";

import PyramidChartLegend from "./PyramidChartLegend";

export const ErrorMessage: React.StatelessComponent<{ title: string, description?: string }> = (props) =>
(
  <footer className="error-layer">
    <div className="error-message">
      <span className="error-title">{props.title}</span>
      {props.description && <p className="error-description">{props.description}</p>}
    </div>
  </footer>
);


export type PyramidChartState = Readonly<{
  lastCorrectProps?: PyramidChartProps
}>

const SELF_WIDTH = 0;
const SELF_HEIGHT = 20;

export class PyramidChartVisual extends React.PureComponent<PyramidChartProps, PyramidChartState> {
  public static defaultProps: Partial<PyramidChartProps>;
  
  public constructor(props: PyramidChartProps){
    super(props);
    this.state = {};
  }
  
  public componentWillReceiveProps(nextProps){
    if(!nextProps.error) {
      this.setState({ lastCorrectProps: nextProps })
    }
  }

  public render () {
    const { error, width, height } = this.props;
    
    return (
      <article 
        className={`pyramid-chart ${error ? "with-error" : ""}`} 
      >
        <header 
          style={error ? { filter: "blur(10px)" } : {}}   
        >
          <PyramidChartLegend {...this.props} />
        </header>
        <main 
          style={error ? { filter: "blur(10px)" } : {}}   
          className="chart-main"
        >
          { !error 
            ? <PyramidChartFrame 
              {...this.props} 
              width={Math.max(0, width - SELF_WIDTH)}
              height={Math.max(0, height - SELF_HEIGHT)}
            />
            : <PyramidChartFrame 
              {...(this.state.lastCorrectProps 
                ? this.state.lastCorrectProps 
                : mapStubData(stubData))
              } 
              width={Math.max(0, width - SELF_WIDTH)}
              height={Math.max(0, height - SELF_HEIGHT)}
            />
          }
        </main>
        {error 
          && <ErrorMessage 
            title={error.title}
            description={error.description}
          />
        }
      </article>
    );
  }
}

export default PyramidChartVisual;

