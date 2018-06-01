// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Swap$ReactTemplate = require("../assets/Swap.bs.js");
var Refresh$ReactTemplate = require("../assets/Refresh.bs.js");
var DownArrow$ReactTemplate = require("../assets/DownArrow.bs.js");
var RoutesList$ReactTemplate = require("../requests/RoutesList.bs.js");
var CommonStyles$ReactTemplate = require("../constants/CommonStyles.bs.js");

var borderStyles = Css.borderBottom(Css.px(1), Css.solid, Css.lightgray);

var resultsContainer = Css.style(/* :: */[
      Css.flexGrow(1),
      /* :: */[
        Css.background(Css.white),
        /* :: */[
          Css.margin(Css.px(0)),
          /* :: */[
            borderStyles,
            /* [] */0
          ]
        ]
      ]
    ]);

var results = Css.style(/* :: */[
      Css.overflowY(Css.scroll),
      /* :: */[
        Css.overflowX(Css.hidden),
        /* [] */0
      ]
    ]);

var result = Css.style(/* :: */[
      Css.backgroundColor(Css.white),
      /* :: */[
        Css.fontSize(CommonStyles$ReactTemplate.fontSizeSmall),
        /* :: */[
          Css.padding(Css.px(14)),
          /* :: */[
            Css.display(Css.flexBox),
            /* :: */[
              Css.flexDirection(Css.row),
              /* :: */[
                Css.alignItems(Css.center),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

function actionButton(disabled) {
  return Css.style(/* :: */[
              Css.background(disabled !== 0 ? Css.darkgray : Css.white),
              /* :: */[
                Css.border(Css.px(1), Css.solid, Css.black),
                /* :: */[
                  Css.borderRadius(Css.px(3)),
                  /* [] */0
                ]
              ]
            ]);
}

var headerItems = Css.style(/* :: */[
      Css.padding(Css.px(10)),
      /* :: */[
        Css.fontSize(CommonStyles$ReactTemplate.fontSizeLarge),
        /* :: */[
          Css.display(Css.flexBox),
          /* :: */[
            Css.alignItems(Css.center),
            /* :: */[
              Css.flexDirection(Css.column),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var resultsHeader = Css.style(/* :: */[
      Css.fontSize(CommonStyles$ReactTemplate.fontSizeSmall),
      /* :: */[
        Css.backgroundColor(Css.hex("f9f9f9")),
        /* :: */[
          Css.color(CommonStyles$ReactTemplate.textBlackLight),
          /* :: */[
            Css.paddingBottom(Css.px(2)),
            /* [] */0
          ]
        ]
      ]
    ]);

var headerText = Css.style(/* :: */[
      Css.fontSize(CommonStyles$ReactTemplate.fontSizeSmall),
      /* [] */0
    ]);

var headerTime = Css.style(/* :: */[
      Css.color(Css.hex("007880")),
      /* :: */[
        Css.fontWeight(900),
        /* :: */[
          Css.fontSize(CommonStyles$ReactTemplate.fontSizeLarge),
          /* [] */0
        ]
      ]
    ]);

var times = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.column),
        /* :: */[
          Css.alignItems(Css.center),
          /* :: */[
            Css.paddingRight(Css.px(20)),
            /* [] */0
          ]
        ]
      ]
    ]);

var arrivalTime = Css.style(/* :: */[
      Css.color(Css.hex("007880")),
      /* [] */0
    ]);

var arrivalText = Css.style(/* :: */[
      Css.paddingRight(Css.px(20)),
      /* :: */[
        Css.overflow(Css.hidden),
        /* :: */[
          Css.textOverflow(Css.ellipsis),
          /* :: */[
            Css.whiteSpace(Css.nowrap),
            /* [] */0
          ]
        ]
      ]
    ]);

var headerGroup = Css.style(/* :: */[
      Css.display(Css.flexBox),
      /* :: */[
        Css.flexDirection(Css.row),
        /* :: */[
          Css.justifyContent(Css.center),
          /* :: */[
            Css.alignItems(Css.center),
            /* [] */0
          ]
        ]
      ]
    ]);

var Style = /* module */[
  /* borderStyles */borderStyles,
  /* resultsContainer */resultsContainer,
  /* results */results,
  /* result */result,
  /* actionButton */actionButton,
  /* headerItems */headerItems,
  /* resultsHeader */resultsHeader,
  /* headerText */headerText,
  /* headerTime */headerTime,
  /* times */times,
  /* arrivalTime */arrivalTime,
  /* arrivalText */arrivalText,
  /* headerGroup */headerGroup
];

var component = ReasonReact.reducerComponentWithRetainedProps("RouteResults");

function resultSorter(results) {
  $$Array.sort((function (routeA, routeB) {
          var arrivalTimeA = Caml_array.caml_array_get(routeA[/* stationDetail */4][/* callingAt */0], 0)[/* aimedArrivalTime */1];
          var arrivalTimeB = Caml_array.caml_array_get(routeB[/* stationDetail */4][/* callingAt */0], 0)[/* aimedArrivalTime */1];
          var match = +(arrivalTimeA === arrivalTimeB);
          if (match !== 0) {
            return 0;
          } else {
            var match$1 = +(arrivalTimeA > arrivalTimeB);
            if (match$1 !== 0) {
              return 1;
            } else {
              return -1;
            }
          }
        }), results);
  return results;
}

function initialState() {
  return /* record */[/* results : array */[]];
}

function fetchRouteResults(toStation, fromStation, send) {
  var callback = function (payload) {
    if (payload) {
      return Curry._1(send, /* Loaded */Block.__(1, [payload[0]]));
    } else {
      return /* () */0;
    }
  };
  RoutesList$ReactTemplate.fetchRouteDetails(toStation, fromStation, callback);
  return /* () */0;
}

function reducer(action, _) {
  if (action.tag) {
    return /* Update */Block.__(0, [/* record */[/* results */resultSorter(action[0])]]);
  } else {
    var fromStation = action[1];
    var toStation = action[0];
    return /* UpdateWithSideEffects */Block.__(2, [
              /* record */[/* results : array */[]],
              (function (self) {
                  return fetchRouteResults(toStation, fromStation, self[/* send */3]);
                })
            ]);
  }
}

function getRouteResult(index, route) {
  var startTime = route[/* startTime */1];
  var finalStation = route[/* finalStation */0];
  var platform = route[/* platform */3];
  var arrivalTime$1 = Caml_array.caml_array_get(route[/* stationDetail */4][/* callingAt */0], 0)[/* aimedArrivalTime */1];
  return React.createElement("div", {
              key: "index_" + (String(index) + ""),
              className: result
            }, React.createElement("div", {
                  className: times
                }, React.createElement("div", undefined, "" + (String(startTime) + "")), React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, DownArrow$ReactTemplate.make(/* array */[]))), React.createElement("div", {
                      className: arrivalTime
                    }, "" + (String(arrivalTime$1) + ""))), React.createElement("div", {
                  className: arrivalText
                }, "" + (String(finalStation) + (" - platform " + (String(platform) + "")))));
}

function onStationRefresh(toStation, fromStation, send, _) {
  return Curry._1(send, /* Load */Block.__(0, [
                toStation,
                fromStation
              ]));
}

function getResultsHeader(state, onSwapHandler, onRefresh) {
  var arrivalTime;
  if (state[/* results */0].length) {
    var fastestRoute = Caml_array.caml_array_get(state[/* results */0], 0);
    var arrivalTime$1 = Caml_array.caml_array_get(fastestRoute[/* stationDetail */4][/* callingAt */0], 0)[/* aimedArrivalTime */1];
    arrivalTime = "" + (String(arrivalTime$1) + "");
  } else {
    arrivalTime = "00:00";
  }
  return React.createElement("div", {
              className: headerGroup
            }, React.createElement("div", {
                  onClick: (function () {
                      return Curry._1(onSwapHandler, /* () */0);
                    })
                }, ReasonReact.element(/* None */0, /* None */0, Swap$ReactTemplate.make(/* array */[]))), React.createElement("div", {
                  className: headerItems
                }, React.createElement("div", {
                      className: headerText
                    }, "arrives"), React.createElement("div", {
                      className: headerTime
                    }, arrivalTime)), React.createElement("div", {
                  onClick: (function () {
                      return Curry._1(onRefresh, /* () */0);
                    })
                }, ReasonReact.element(/* None */0, /* None */0, Refresh$ReactTemplate.make(/* array */[]))));
}

function make(toStation, fromStation, onSwapHandler, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function (self) {
              var match = self[/* retainedProps */2];
              var retainedTo = match[0];
              console.log("retainedTo thing - " + (String(retainedTo) + ""));
              console.log("newTo thing - " + (String(toStation) + ""));
              if (toStation !== retainedTo || toStation !== match[1]) {
                fetchRouteResults(toStation, fromStation, self[/* send */3]);
                return /* record */[/* results : array */[]];
              } else {
                return self[/* state */1];
              }
            }),
          /* didMount */(function (self) {
              return Curry._1(self[/* send */3], /* Load */Block.__(0, [
                            toStation,
                            fromStation
                          ]));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var partial_arg = self[/* send */3];
              return React.createElement("div", {
                          className: resultsContainer
                        }, React.createElement("div", {
                              className: resultsHeader
                            }, getResultsHeader(self[/* state */1], onSwapHandler, (function () {
                                    return Curry._1(partial_arg, /* Load */Block.__(0, [
                                                  toStation,
                                                  fromStation
                                                ]));
                                  }))), React.createElement("div", {
                              className: results
                            }, self[/* state */1][/* results */0].length ? $$Array.mapi(getRouteResult, self[/* state */1][/* results */0]) : React.createElement("div", {
                                    className: result
                                  }, "Checking route...")));
            }),
          /* initialState */initialState,
          /* retainedProps : tuple */[
            toStation,
            fromStation
          ],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.Style = Style;
exports.component = component;
exports.resultSorter = resultSorter;
exports.initialState = initialState;
exports.fetchRouteResults = fetchRouteResults;
exports.reducer = reducer;
exports.getRouteResult = getRouteResult;
exports.onStationRefresh = onStationRefresh;
exports.getResultsHeader = getResultsHeader;
exports.make = make;
/* borderStyles Not a pure module */