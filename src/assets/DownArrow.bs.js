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
          Css.margin(Css.px(4)),
          /* :: */[
            Css.SVG[/* fill */0](CommonStyles$ReactTemplate.textBlack),
            /* [] */0
          ]
        ]
      ]
    ]);

var Style = /* module */[/* container */container];

var component = ReasonReact.statelessComponent("Magnifier");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: container
                }, React.createElement("svg", {
                      id: "Capa_1",
                      version: "1.1",
                      viewBox: "0 0 21.825 21.825",
                      x: "0px",
                      xmlns: "http://www.w3.org/2000/svg",
                      y: "0px"
                    }, React.createElement("path", {
                          d: "M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651\n   c-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587\n   s1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z"
                        }), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined), React.createElement("g", undefined)));
    });
  return newrecord;
}

exports.Style = Style;
exports.component = component;
exports.make = make;
/* container Not a pure module */
