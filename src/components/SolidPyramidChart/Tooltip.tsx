import * as React from "react";

export const Tooltip = (titles: { leftSetTitle?: string, rightSetTitle?: string, categoryTitle?: string } ) => (props) => {
  const { active } = props;
  const { leftSetTitle, rightSetTitle, categoryTitle } = titles;
  if (active) {
    const { payload, label } = props;
    console.log("tooltip payload", payload);
    const leftValue = payload.find(entry => entry.dataKey === "leftSetValue").value;
    const leftSurplus = payload.find(entry => entry.dataKey === "leftSetSurplus").value;
    const rightValue = payload.find(entry => entry.dataKey === "rightSetValue").value;
    const rightSurplus = payload.find(entry => entry.dataKey === "rightSetSurplus").value;
    const total = leftValue + leftSurplus + rightValue + rightSurplus;

    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{categoryTitle}: {label}</p>
        <p className="tooltip-description">
          {leftSetTitle}: {leftValue + leftSurplus}
          <br/>
          {rightSetTitle}: {rightValue + rightSurplus}
          <br/>
          Total: {total}
        </p>
      </div>
    );
  }

  return null;
};

export default Tooltip;