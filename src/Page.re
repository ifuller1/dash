module Style = {
  open Css;
  global(
    "body",
    [
      /* opacity(0.05), */
      background(
        hex("edf9ff"),
        /* linearGradient(
             deg(0),
             [
               (0, rgba(202, 255, 238, 0.7)),
               (100, rgba(140, 232, 253, 0.7)),
             ],
           ), */
      ),
      height(vh(100.0)),
      padding(px(0)),
      margin(px(0)),
      fontFamily(CommonStyles.fontFamily),
      fontSize(CommonStyles.fontSizeNormal),
    ],
  );
  let page =
    style([
      overflow(hidden),
      display(flexBox),
      flexDirection(column),
      color(CommonStyles.textBlack),
      justifyContent(flexStart),
      boxSizing(borderBox),
      height(vh(100.0)),
    ]);
  let actionButton = disabled =>
    style([
      background(disabled ? darkgray : white),
      border(px(1), solid, black),
      borderRadius(px(3)),
    ]);
  let spinnerContainer = style([height(pct(100.0)), padding(px(10))]);
};

type state = {
  stations: Stations.stations,
  fromStation: option(Stations.station),
  toStation: option(Stations.station),
  settings: option(Settings.settings),
};

type action =
  | FromSelected(Stations.station)
  | ToSelected(Stations.station)
  | Loaded(Stations.stations)
  | Load
  | LoadSettings
  | SwapSettings
  | SettingsLoaded(option(Settings.settings));

let fetchStationList = send =>
  StationList.fetchStationList(payload => send(Loaded(payload))) |> ignore;

let fetchSettings = send =>
  SettingsList.fetchSettings(payload => send(SettingsLoaded(payload)))
  |> ignore;

let component = ReasonReact.reducerComponent("Page");

let onFromSelected = (send, station: Stations.station) =>
  send(FromSelected(station));

let onToSelected = (send, station: Stations.station) =>
  send(ToSelected(station));

let defaultFromStation: Stations.station = {crsCode: "TOM", name: "Tott"};

let defaultToStation: Stations.station = {crsCode: "BIS", name: "Stort"};

let initialState = () => {
  stations: [||],
  fromStation: None,
  toStation: None,
  settings: None,
};

let getStartStation = state =>
  switch (state.settings) {
  | Some(settings) => settings.startStationOption
  | None => None
  };

let getReturnStation = state =>
  switch (state.settings) {
  | Some(settings) => settings.endStationOption
  | None => None
  };

let getFromStation = state =>
  switch (state.fromStation) {
  | Some(_station) => state.fromStation
  | None => getStartStation(state)
  };

let getToStation = state =>
  switch (state.toStation) {
  | Some(_station) => state.toStation
  | None => getReturnStation(state)
  };

let onSwapRoutes = (send, ()) => send(SwapSettings);

let swapSettings = state => {
  let from = state.fromStation;
  let tos = state.toStation;
  Js.log({j|to - from: $tos - $from|j});
  ReasonReact.Update({
    ...state,
    toStation: getFromStation(state),
    fromStation: getToStation(state),
  });
};

let reducer = (action, state) =>
  switch (action) {
  | SwapSettings => swapSettings(state)
  | LoadSettings =>
    ReasonReact.SideEffects((self => fetchSettings(self.send)))
  | Load => ReasonReact.SideEffects((self => fetchStationList(self.send)))
  | Loaded(stations) => ReasonReact.Update({...state, stations})
  | SettingsLoaded(settingsReponse) =>
    ReasonReact.Update({...state, settings: settingsReponse})
  | FromSelected(station) =>
    ReasonReact.UpdateWithSideEffects(
      {...state, fromStation: Some(station)},
      (_self => SettingsList.saveFromStation(station)),
    )
  | ToSelected(station) =>
    ReasonReact.UpdateWithSideEffects(
      {...state, toStation: Some(station)},
      (_self => SettingsList.saveToStation(station)),
    )
  };

let make = (~message, _children) => {
  ...component,
  initialState,
  didMount: self => {
    fetchStationList(self.send);
    fetchSettings(self.send);
  },
  reducer,
  render: ({send, state}) =>
    <div className=Style.page>
      <Header title=message />
      <div>
        (
          if (Array.length(state.stations) > 0 && state.settings != None) {
            <div>
              <AutoCompleteSelector
                key="1"
                stations=state.stations
                onSelection=(onFromSelected(send))
                selectedStation=(getFromStation(state))
                header="From"
              />
              <AutoCompleteSelector
                key="2"
                stations=state.stations
                onSelection=(onToSelected(send))
                selectedStation=(getToStation(state))
                header="To"
              />
              (
                switch (getToStation(state), getFromStation(state)) {
                | (Some(toStation), Some(fromStation)) =>
                  <RouteResults
                    toStation=toStation.crsCode
                    fromStation=fromStation.crsCode
                    onSwapHandler=(onSwapRoutes(send))
                  />
                | _ => ReasonReact.null
                }
              )
            </div>;
          } else {
            <div className=Style.spinnerContainer> <Spinner /> </div>;
          }
        )
      </div>
    </div>,
};