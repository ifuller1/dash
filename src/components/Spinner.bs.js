// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");

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

var container = Css.style(/* :: */[
      Css.width(Css.px(40)),
      /* :: */[
        Css.height(Css.px(40)),
        /* :: */[
          Css.position(Css.relative),
          /* :: */[
            Css.margin(Css.auto),
            /* [] */0
          ]
        ]
      ]
    ]);

var bounceKeyframe = Css.keyframes(/* :: */[
      /* tuple */[
        0,
        /* :: */[
          Css.transform(Css.scale(0.0, 0.0)),
          /* [] */0
        ]
      ],
      /* :: */[
        /* tuple */[
          50,
          /* :: */[
            Css.transform(Css.scale(1.0, 1.0)),
            /* [] */0
          ]
        ],
        /* :: */[
          /* tuple */[
            100,
            /* :: */[
              Css.transform(Css.scale(0.0, 0.0)),
              /* [] */0
            ]
          ],
          /* [] */0
        ]
      ]
    ]);

var commonList_000 = Css.width(Css.pct(100.0));

var commonList_001 = /* :: */[
  Css.height(Css.pct(100.0)),
  /* :: */[
    Css.borderRadius(Css.pct(50.0)),
    /* :: */[
      Css.backgroundColor(Css.white),
      /* :: */[
        Css.opacity(0.6),
        /* :: */[
          Css.position(Css.absolute),
          /* :: */[
            Css.top(Css.px(0)),
            /* :: */[
              Css.left(Css.px(0)),
              /* :: */[
                Css.animation(/* Some */[1600], /* None */0, /* None */0, /* Some */[Css.easeInOut], /* None */0, /* None */0, /* Some */[Css.infinite], bounceKeyframe),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var commonList = /* :: */[
  commonList_000,
  commonList_001
];

var commonBound = Css.style(commonList);

var innerBounce = Css.style(/* :: */[
      Css.animationDelay(-800),
      commonList
    ]);

var Style = /* module */[
  /* actionButton */actionButton,
  /* container */container,
  /* bounceKeyframe */bounceKeyframe,
  /* commonList */commonList,
  /* commonBound */commonBound,
  /* innerBounce */innerBounce
];

var component = ReasonReact.statelessComponent("Spinner");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: container
                }, React.createElement("div", {
                      className: innerBounce
                    }), React.createElement("div", {
                      className: commonBound
                    }));
    });
  return newrecord;
}

exports.Style = Style;
exports.component = component;
exports.make = make;
/* container Not a pure module */
