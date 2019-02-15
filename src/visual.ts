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
import powerbi from "powerbi-visuals-api";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;

import { VisualSettings } from "./settings";
import { renderReactVisual } from "./react";

import DataViewAdapter from "./components/DataViewAdapter";
import ErrorBlurWrapper from "./components/ErrorBlurWrapper";

import "./../style/visual.less";

export class Visual implements IVisual {
  private settings: VisualSettings;

  public constructor(options: VisualConstructorOptions) {
    this.render(options.element);
  }

  public update(options: VisualUpdateOptions) {
    let width: number = options.viewport.width;
    let height: number = options.viewport.height;
    
    let dataView: DataView = options.dataViews[0];
    this.settings = VisualSettings.parse(dataView);
  
    this.updateCallback({ width, height, dataView });
  }

  public enumerateObjectInstances(
    options: powerbi.EnumerateVisualObjectInstancesOptions
  ): powerbi.VisualObjectInstanceEnumeration {
    
    return VisualSettings.enumerateObjectInstances(this.settings, options);
  }

  private updateCallback: (data: object) => void;

  private render(element: HTMLElement){
    this.updateCallback = renderReactVisual(
      DataViewAdapter(ErrorBlurWrapper), 
      element,
    );
  }
}