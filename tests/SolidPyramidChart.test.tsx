import {
  mount,
} from "enzyme";
import * as React from "react";

import { BarChart } from "recharts";

import { SolidPyramidChart } from "../src/components/SolidPyramidChart";

describe("SolidPyramidChart Component", () => {
  const component = mount(
    <SolidPyramidChart 
      max={0}
      settings={{}}
      entries={[]}
    />,
  );

  test("Renders React chart frame", () => {
    expect(component.exists()).toBe(true);
    expect(component.find(".chart-frame").length).toBe(1);
  });

  test("Renders chart component", () => {
    expect(component.exists()).toBe(true);
    expect(component.find(".chart-frame .column-chart-recharts").length).toBe(1);
    expect(component.find(BarChart).length).toBeGreaterThan(0); 
  });
});
