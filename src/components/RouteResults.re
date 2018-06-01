module Style = {
  open Css;
  let borderStyles = borderBottom(px(1), solid, lightgray);
  let resultsContainer =
    style([flexGrow(1), background(white), margin(px(0)), borderStyles]);
  let results =
    style([
      overflowY(scroll),
      /* maxHeight(px(100)),
         minHeight(px(50)), */
      overflowX(hidden),
    ]);
  let result =
    style([
      backgroundColor(white),
      fontSize(CommonStyles.fontSizeSmall),
      /* paddingBottom(px(12)), */
      padding(px(14)),
      display(flexBox),
      flexDirection(row),
      alignItems(center),
    ]);
  let actionButton = disabled =>
    style([
      background(disabled ? darkgray : white),
      border(px(1), solid, black),
      borderRadius(px(3)),
    ]);
  let headerItems =
    style([
      padding(px(10)),
      fontSize(CommonStyles.fontSizeLarge),
      display(flexBox),
      alignItems(center),
      flexDirection(column),
    ]);
  let resultsHeader =
    style([
      fontSize(CommonStyles.fontSizeSmall),
      backgroundColor(hex("f9f9f9")),
      color(CommonStyles.textBlackLight),
      paddingBottom(px(2)),
      /* padding(px(10)), */
    ]);
  let headerText = style([fontSize(CommonStyles.fontSizeSmall)]);
  let headerTime =
    style([
      color(hex("007880")),
      fontWeight(900),
      fontSize(CommonStyles.fontSizeLarge),
    ]);
  let times =
    style([
      display(flexBox),
      flexDirection(column),
      alignItems(center),
      paddingRight(px(20)),
    ]);
  let arrivalTime = style([color(hex("007880"))]);
  let arrivalText =
    style([
      paddingRight(px(20)),
      overflow(hidden),
      textOverflow(ellipsis),
      whiteSpace(nowrap),
    ]);
  let headerGroup =
    style([
      display(flexBox),
      flexDirection(row),
      justifyContent(center),
      alignItems(center),
    ]);
};

type action =
  | Load(string, string)
  | Loaded(Routes.routes);

type state = {results: Routes.routes};

let component = ReasonReact.reducerComponentWithRetainedProps("RouteResults");

let resultSorter = results => {
  Array.sort(
    (routeA: Routes.route, routeB: Routes.route) => {
      let arrivalTimeA = routeA.stationDetail.callingAt[0].aimedArrivalTime;
      let arrivalTimeB = routeB.stationDetail.callingAt[0].aimedArrivalTime;
      arrivalTimeA == arrivalTimeB ?
        0 : arrivalTimeA > arrivalTimeB ? 1 : (-1);
    },
    results,
  );
  results;
};

let initialState = () => {results: [||]};

let fetchRouteResults = (toStation, fromStation, send) => {
  let callback = payload =>
    switch (payload) {
    | None => ()
    | Some(payload) => send(Loaded(payload))
    };
  RoutesList.fetchRouteDetails(toStation, fromStation, callback) |> ignore;
};

let reducer = (action, state) =>
  switch (action) {
  | Load(toStation, fromStation) =>
    ReasonReact.UpdateWithSideEffects(
      {results: [||]},
      (self => fetchRouteResults(toStation, fromStation, self.send)),
    )
  | Loaded(payload) => ReasonReact.Update({results: resultSorter(payload)})
  };

let getRouteResult = (index, route: Routes.route) => {
  let startTime = route.startTime;
  let finalStation = route.finalStation;
  let platform = route.platform;
  let arrivalTime = route.stationDetail.callingAt[0].aimedArrivalTime;
  <div className=Style.result key={j|index_$index|j}>
    <div className=Style.times>
      <div> (ReasonReact.string({j|$startTime|j})) </div>
      <div> <DownArrow /> </div>
      <div className=Style.arrivalTime>
        (ReasonReact.string({j|$arrivalTime|j}))
      </div>
    </div>
    <div className=Style.arrivalText>
      (ReasonReact.string({j|$finalStation - platform $platform|j}))
    </div>
  </div>;
};

let onStationRefresh = (toStation, fromStation, send, ()) =>
  send(Load(toStation, fromStation));

let getResultsHeader = (state, onSwapHandler, onRefresh) => {
  let arrivalTime =
    if (Array.length(state.results) > 0) {
      let fastestRoute = state.results[0];
      let arrivalTime =
        fastestRoute.stationDetail.callingAt[0].aimedArrivalTime;
      ReasonReact.string({j|$arrivalTime|j});
    } else {
      ReasonReact.string({j|00:00|j});
    };
  <div className=Style.headerGroup>
    <div onClick=(_event => onSwapHandler())> <Swap /> </div>
    <div className=Style.headerItems>
      <div className=Style.headerText>
        (ReasonReact.string({j|arrives|j}))
      </div>
      <div className=Style.headerTime> arrivalTime </div>
    </div>
    <div onClick=(_event => onRefresh())> <Refresh /> </div>
  </div>;
};

let make = (~toStation, ~fromStation, ~onSwapHandler, _children) => {
  ...component,
  initialState,
  retainedProps: (toStation, fromStation),
  didMount: self => self.send(Load(toStation, fromStation)),
  willReceiveProps: self => {
    let (retainedTo, retainedFrom) = self.retainedProps;
    Js.log({j|retainedTo thing - $retainedTo|j});
    Js.log({j|newTo thing - $toStation|j});
    if (toStation != retainedTo || toStation != retainedFrom) {
      fetchRouteResults(toStation, fromStation, self.send);
      {results: [||]};
    } else {
      self.state;
    };
  },
  reducer,
  render: self =>
    <div className=Style.resultsContainer>
      <div className=Style.resultsHeader>
        (
          getResultsHeader(
            self.state,
            onSwapHandler,
            onStationRefresh(toStation, fromStation, self.send),
          )
        )
      </div>
      <div className=Style.results>
        (
          if (Array.length(self.state.results) > 0) {
            self.state.results
            |> Array.mapi((index, route: Routes.route) =>
                 getRouteResult(index, route)
               )
            |> ReasonReact.array;
          } else {
            <div className=Style.result>
              (ReasonReact.string({j|Checking route...|j}))
            </div>;
          }
        )
      </div>
    </div>,
};