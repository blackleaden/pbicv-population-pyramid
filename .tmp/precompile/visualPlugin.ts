import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];
if (typeof window[powerbiKey] === "undefined") {
    powerbi = window[powerbiKey] = {};
}
powerbi.visuals = powerbi.visuals || {};
powerbi.visuals.plugins = powerbi.visuals.plugins || {};
powerbi.visuals.plugins["circleCard9A06B62FC3194D24A0D167A92B7A6E96_DEBUG"] = {
    name: 'circleCard9A06B62FC3194D24A0D167A92B7A6E96_DEBUG',
    displayName: 'PopulationPyramid',
    class: 'Visual',
    version: '1.0.0',
    apiVersion: '2.2.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};