module Style = {
  open Css;
  let actionButton = disabled =>
    style([
      background(disabled ? darkgray : white),
      border(px(1), solid, black),
      borderRadius(px(3)),
    ]);
  let container =
    style([
      width(px(40)),
      height(px(40)),
      position(relative),
      margin(auto),
    ]);
  let bounceKeyframe =
    keyframes([
      (0, [transform(scale(0.0, 0.0))]),
      (50, [transform(scale(1.0, 1.0))]),
      (100, [transform(scale(0.0, 0.0))]),
    ]);
  let commonList = [
    width(pct(100.0)),
    height(pct(100.0)),
    borderRadius(pct(50.0)),
    backgroundColor(white),
    opacity(0.6),
    position(absolute),
    top(px(0)),
    left(px(0)),
    animation(
      ~duration=1600,
      ~timingFunction=easeInOut,
      ~iterationCount=infinite,
      bounceKeyframe,
    ),
  ];
  let commonBound = style(commonList);
  let innerBounce = style([animationDelay(-800), ...commonList]);
};

let component = ReasonReact.statelessComponent("Spinner");

let make = _children => {
  ...component,
  render: _self =>
    <div className=Style.container>
      <div className=Style.innerBounce />
      <div className=Style.commonBound />
    </div>,
};