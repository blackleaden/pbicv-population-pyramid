import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactContainer } from "./components/ReactContainer";

export const renderReactVisual = (
  component: React.ComponentType,
  element: HTMLElement,
) => {
  ReactDOM.render(
    React.createElement(ReactContainer, { component }),
    element
  );
  
  return ReactContainer.update;
}
