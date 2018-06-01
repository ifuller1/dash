module Style = {
  open Css;
  let container =
    style([
      width(px(20)),
      height(px(20)),
      margin(px(10)),
      SVG.fill(CommonStyles.textBlack),
    ]);
};

let component = ReasonReact.statelessComponent("Swap");

let make = _children => {
  ...component,
  render: _self =>
    <div className=Style.container>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 384 384">
        <g>
          <g>
            <g>
              <polygon
                points="128,0 42.667,85.12 106.667,85.12 106.667,234.667 149.333,234.667 149.333,85.12 213.333,85.12 \t\t\t"
              />
              <polygon
                points="277.333,298.88 277.333,149.333 234.667,149.333 234.667,298.88 170.667,298.88 256,384 341.333,298.88 \t\t\t"
              />
            </g>
          </g>
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    </div>,
};