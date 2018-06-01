module Style = {
  open Css;
  let container =
    style([
      color(white),
      fontWeight(400),
      fontSize(CommonStyles.fontSizeLarge),
      flexGrow(0),
      padding(px(10)),
      backgroundColor(hex("50dffb")),
      /* boxShadow(~blur=px(6), ~spread=px(3), hex("00000017")), */
      /* marginBottom(px(4)), */
      borderBottom(px(1), solid, hex("1bdbff")),
      backgroundColor(white),
      padding(px(10)),
    ]);
};

let component = ReasonReact.statelessComponent("Header");

let make = (~title, _children) => {
  ...component,
  render: _self =>
    <div className=Style.container> (ReasonReact.string({j|$title|j})) </div>,
};