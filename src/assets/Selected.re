module Style = {
  open Css;
  let radius = 6;
  let container =
    style([
      width(px(2 * radius)),
      height(px(2 * radius)),
      paddingLeft(px(4)),
      SVG.fill(CommonStyles.textBlack),
    ]);
  let svg = style([position(relative), top(px(- radius / 2))]);
};

let component = ReasonReact.statelessComponent("Selected");

let make = _children => {
  ...component,
  render: _self =>
    <div className=Style.container>
      <svg
        className=Style.svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 477.867 477.867">
        <g>
          <g>
            <path
              d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933\n       C477.726,107.033,370.834,0.141,238.933,0z M238.933,443.733c-113.108,0-204.8-91.692-204.8-204.8s91.692-204.8,204.8-204.8\n       s204.8,91.692,204.8,204.8C443.611,351.991,351.991,443.611,238.933,443.733z"
            />
          </g>
        </g>
        <g> <g> <circle cx="238.933" cy="238.933" r="136.533" /> </g> </g>
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