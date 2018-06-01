// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var CommonStyles$ReactTemplate = require("../constants/CommonStyles.bs.js");

var container = Css.style(/* :: */[
      Css.width(Css.px(20)),
      /* :: */[
        Css.height(Css.px(20)),
        /* :: */[
          Css.margin(Css.px(10)),
          /* :: */[
            Css.SVG[/* fill */0](CommonStyles$ReactTemplate.textBlack),
            /* [] */0
          ]
        ]
      ]
    ]);

var Style = /* module */[/* container */container];

var component = ReasonReact.statelessComponent("Swap");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: container
                }, React.createElement("svg", {
                      id: "Capa_1",
                      version: "1.1",
                      viewBox: "0 0 384 384",
                      x: "0px",
                      xmlns: "http://www.w3.org/2000/svg",
                      y: "0px"
                    }, React.createElement("g", undefined, React.createElement("g", undefined, React.createElement("g", undefined, React.createElement("polygon", {
                                      points: "128,0 42.667,85.12 106.667,85.12 106.667,234.667 149.333,234.667 149.333,85.12 213.333,85.12 \t\t\t"
                                    }), React.createElement("polygon", {
                                      points: "277.333,298.88 277.333,149.333 234.667,149.333 234.667,298.88 170.667,298.88 256,384 341.333,298.88 \t\t\t"
                                    })))), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined)));
    });
  return newrecord;
}

exports.Style = Style;
exports.component = component;
exports.make = make;
/* container Not a pure module */