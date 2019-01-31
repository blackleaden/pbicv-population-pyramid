/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";
import "@babel/polyfill";
import "./../style/visual.less";

import d3 from "../node_modules/d3";
import powerbi from "powerbi-visuals-api";


import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
export class Visual implements IVisual {
    // private target: HTMLElement;
    // private updateCount: number;
    // private textNode: Text;
    // private host: IVisualHost;
    private settings: VisualSettings;
    private svg: d3.Selection<SVGElement>;
    private container: d3.Selection<SVGElement>;
    private circle: d3.Selection<SVGElement>;
    private textValue: d3.Selection<SVGElement>;
    private textLabel: d3.Selection<SVGElement>;

    constructor(options: VisualConstructorOptions) {
      console.log('Visual constructor of', options);

      this.svg = d3.select(options.element)
        .append('svg')
        .classed('circleCard', true);
      this.container = this.svg
        .append("g")
        .classed('container', true);
      this.circle = this.container
        .append("circle")
        .classed('circle', true);
      this.textValue = this.container
        .append("text")
        .classed("textValue", true);
      this.textLabel = this.container
        .append("text")
        .classed("textLabel", true);
    
        let width: number = 200; //options.viewport.width;
        let height: number = 250; //options.viewport.height;
        this.svg.attr({
          width: width,
          height: height
        });
        let radius: number = Math.min(width, height) / 2.2;
        this.circle
          .style("fill", "white")
          .style("fill-opacity", 0.5)
          .style("stroke", "black")
          .style("stroke-width", 2)
          .attr({
            r: radius,
            cx: width / 2,
            cy: height / 2
          });
        let fontSizeValue: number = Math.min(width, height) / 5;
        this.textValue
          .text("Value")
          .attr({
            x: "50%",
            y: "50%",
            dy: "0.35em",
            "text-anchor": "middle"
          }).style("font-size", fontSizeValue + "px");
  
        let fontSizeLabel: number = fontSizeValue / 4;
        this.textLabel
        .text("Label")
        .attr({
            x: "50%",
            y: height / 2,
            dy: fontSizeValue / 1.2,
            "text-anchor": "middle"
        })
        .style("font-size", fontSizeLabel + "px");
      }

    public update(options: VisualUpdateOptions) {
      let width: number = options.viewport.width;
      let height: number = options.viewport.height;
      console.log("Update", width, height);
      let dataView: DataView = options.dataViews[0];
      this.svg.attr({
        width: width,
        height: height
      });
      let radius: number = Math.min(width, height) / 2.2;
      this.circle
        .style("fill", "white")
        .style("fill-opacity", 0.5)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr({
          r: radius,
          cx: width / 2,
          cy: height / 2
        });
      let fontSizeValue: number = Math.min(width, height) / 5;
      this.textValue
        // .text("Value")
        .text(dataView.single.value as string)
        .attr({
          x: "50%",
          y: "50%",
          dy: "0.35em",
          "text-anchor": "middle"
        }).style("font-size", fontSizeValue + "px");
  
      let fontSizeLabel: number = fontSizeValue / 4;
      this.textLabel
        // .text("Label")
        .text(dataView.metadata.columns[0].displayName)
        .attr({
          x: "50%",
          y: height / 2,
          dy: fontSizeValue / 1.2,
          "text-anchor": "middle"
        })
        .style("font-size", fontSizeLabel + "px");
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return VisualSettings.parse(dataView) as VisualSettings;
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(
      options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}