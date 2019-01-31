import * as React from "react";
import * as ReactDOM from "react-dom";

export const TestComponent = (props: object) => (
  <div 
    style={{ 
      outline: "black solid 1px", 
      padding: "20px", 
      margin: "4px" 
    }}
  >
    hello react {JSON.stringify(props)} 
  </div>
);

interface ContainerProps {
  component: React.ComponentType
}

type ContainerState = Readonly<{
  data: object
}>;

const initialState: ContainerState = {
  data: {}
};

class Container extends React.Component<ContainerProps, ContainerState>{
  private static subscriptions: Array<(data: object) => void> = [];
  
  private static subscribe(callback: (data: object) => void) {
    Container.subscriptions.push(callback);
    return Container.createUnsubscribeCallback(Container.subscriptions.length - 1);
  }
  
  private static createUnsubscribeCallback = (i: number) => {
    return () => {
      delete Container.subscriptions[i];
    }
  }

  public static update(newData: object) {
    Container.subscriptions.forEach(updateCallback => {
      updateCallback(newData);
    });
  }

  public unsubscribe: () => void;
  
  public state: ContainerState = initialState;

  public constructor(props: ContainerProps){
    super(props);
    this.state = initialState;
    this.update = this.update.bind(this);
  }
  
  public update (newData: object) {
    this.setState({ data: { ...this.state.data, ...newData }})
  }
  
  public componentWillMount() {
    this.unsubscribe = Container.subscribe(this.update);
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  render(){
    const props = this.state.data;
    const Component = this.props.component;
    return (
      <Component {...props} />
    )
  }
}

export const renderApp = (element: HTMLElement, component: React.ComponentType ) => {
  ReactDOM.render(
    React.createElement(Container, { component }),
    element
  );
  
  return Container.update;
}
