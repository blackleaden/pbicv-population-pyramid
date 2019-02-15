import * as React from "react";
import SolidPyramidChart, { PyramidChartProps } from "./SolidPyramidChart";
import { mapStubData, stubData } from "./DataStubAdapter";


export const ErrorMessage: React.StatelessComponent<{ title: string, description?: string }> = (props) =>
(
  <footer className="error-layer">
    <div className="error-message">
      <span className="error-title">{props.title}</span>
      {props.description && <p className="error-description">{props.description}</p>}
    </div>
  </footer>
);

export const ChartLegend: React.StatelessComponent<PyramidChartProps> = (props) => (
  <div className="chart-legend">
    <span className="chart-y-axis-title left">{props.categoryTitle}</span>
    <span className="chart-y-axis-title right">Total</span>    
    <div className="chart-dataset-titles-group">
      <span className="chart-dataset-title">{props.leftSetTitle}</span>
      <span className="chart-dataset-title">{props.rightSetTitle}</span>
    </div>
  </div>
)
export type ErrorBlurState = Readonly<{
  lastCorrectProps?: PyramidChartProps
}>

const SELF_WIDTH = 0;
const SELF_HEIGHT = 20;

export class ErrorBlurChart extends React.PureComponent<PyramidChartProps, ErrorBlurState> {
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
    const { error,  width, height, description } = this.props;
    const title = this.props.title ? this.props.title.trim() : "";

    return (
      <article className={`pyramid-chart ${error ? "with-error" : ""}`}>
        <header >
          {!error && <ChartLegend {...this.props} /> }
        </header>
        <main 
          style={error ? { filter: "blur(10px)" } : {}} 
          className="chart-main"
        >
          { !error 
            ? <SolidPyramidChart 
              {...this.props} 
              width={Math.max(0, width - SELF_WIDTH)}
              height={Math.max(0, height - SELF_HEIGHT)}
            />
            : <SolidPyramidChart 
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
            title={title}
            description={description}
          />
        }
      </article>
    );
  }
}

export default ErrorBlurChart;

