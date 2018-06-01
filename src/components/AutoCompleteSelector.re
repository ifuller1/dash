module Style = {
  open Css;
  let borderStyles = borderBottom(px(1), solid, hex("e2e2e2"));
  let autoCompleteContainer =
    style([flexGrow(1), background(white), borderStyles]);
  let autoCompleteResults =
    style([
      overflowY(scroll),
      height(px(90)),
      overflowX(hidden),
      border(px(10), solid, white),
    ]);
  let title = selected =>
    style([
      /* backgroundColor(selected ? skyblue : white), */
      fontSize(CommonStyles.fontSizeSmall),
      /* firstChild(style([paddingTop(px(4))])), */
      paddingBottom(px(4)),
      paddingLeft(px(0)),
      padding(px(10)),
      display(flexBox),
      firstChild([paddingRight(px(10))]),
      alignItems(center),
      /* hover([backgroundColor(selected ? skyblue : lightgray)]), */
    ]);
  let actionButton = disabled =>
    style([
      background(disabled ? darkgray : white),
      border(px(1), solid, black),
      borderRadius(px(3)),
    ]);
  let autoCompleteInput =
    style([
      paddingTop(px(4)),
      padding(px(10)),
      boxSizing(borderBox),
      fontFamily(CommonStyles.fontFamily),
      fontSize(CommonStyles.fontSizeNormal),
      width(pct(100.0)),
      backgroundColor(hex("f9f9f9")),
      borderStyles,
      borderStyle(none),
      selector("::placeholder", [color(hex("d4d4d4"))]),
      focus([borderStyles, outlineStyle(none)]),
    ]);
  let autoCompleteHeader =
    style([
      fontSize(CommonStyles.fontSizeSmall),
      backgroundColor(hex("f9f9f9")),
      color(CommonStyles.textBlackLight),
      paddingBottom(px(2)),
      padding(px(10)),
    ]);
  let autoCompleteInputGroup =
    style([
      display(flexBox),
      flexDirection(row),
      children([flexGrow(1)]),
    ]);
  let magnifier = style([color(red), margin(px(6))]);
};

type action =
  | Update(string)
  | SelectStation(Stations.station);

type state = {
  inputText: string,
  matchedStations: Stations.stations,
  allStations: Stations.stations,
  selectedStation: option(Stations.station),
};

let filterText = text =>
  text
  |> Js.String.toLowerCase
  |> Js.String.replaceByRe([%bs.re "/\\s*/g"], "");

let getFilterStations = (stations, inputText) => {
  let filteredInputText = filterText(inputText);
  Belt.Array.keep(stations, (station: Stations.station) =>
    Js.String.indexOf(filteredInputText, filterText(station.name)) >= 0
    || Js.String.indexOf(filteredInputText, filterText(station.crsCode)) >= 0
  );
};

let filterInputDate = (state, inputText: string) => {
  let filteredInputText = filterText(inputText);
  Js.log({j|$filteredInputText|j});
  ReasonReact.Update({
    ...state,
    inputText,
    matchedStations: getFilterStations(state.allStations, inputText),
  });
};

let initialState = (stations, selectedStation: option(Stations.station), ()) => {
  let inputText =
    switch (selectedStation) {
    | Some(station) => station.name
    | None => ""
    };
  let matchedStations =
    switch (inputText) {
    | "" => stations
    | otherText => getFilterStations(stations, otherText)
    };
  {inputText, matchedStations, allStations: stations, selectedStation};
};

let onInputChange = (send, event) =>
  send(
    Update(
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
    ),
  );

let onStationClick = (send, onSelection, station, _event) => {
  onSelection(station);
  send(SelectStation(station));
};

let reducer = (action, state) =>
  switch (action) {
  | Update(inputText) => filterInputDate(state, inputText)
  | SelectStation(station) =>
    ReasonReact.Update({
      ...state,
      inputText: station.name,
      selectedStation: Some(station),
    })
  };

let component =
  ReasonReact.reducerComponentWithRetainedProps("AutoCompleteSelector");

let make =
    (
      ~stations,
      ~onSelection,
      ~selectedStation: option(Stations.station),
      ~header,
      _children,
    ) => {
  ...component,
  initialState: initialState(stations, selectedStation),
  retainedProps: selectedStation,
  willReceiveProps: self => {
    let retainedStation: option(Stations.station) = self.retainedProps;
    if (selectedStation != retainedStation) {
      switch (selectedStation) {
      | Some(station) => initialState(stations, Some(station), ())
      | None => self.state
      };
    } else {
      self.state;
    };
  },
  reducer,
  render: self =>
    <div className=Style.autoCompleteContainer>
      <div className=Style.autoCompleteHeader>
        (ReasonReact.string({j|$header|j}))
      </div>
      <div className=Style.autoCompleteInputGroup>
        <input
          className=Style.autoCompleteInput
          value=self.state.inputText
          placeholder="..."
          onChange=(onInputChange(self.send))
        />
      </div>
      <div className=Style.autoCompleteResults>
        <div>
          (
            if (Array.length(self.state.matchedStations) > 0) {
              let endIndex =
                Js.Math.min_int(
                  100,
                  Js.Math.max_int(
                    Array.length(self.state.matchedStations),
                    Array.length(self.state.matchedStations) - 2500,
                  ),
                );
              Array.sub(self.state.matchedStations, 0, endIndex)
              |> Array.mapi((index, station: Stations.station) => {
                   let stationName = station.name;
                   let stationCode = station.crsCode;
                   let selected = self.state.selectedStation == Some(station);
                   <div
                     className=(Style.title(selected))
                     key={j|index_$index|j}
                     onClick=(onStationClick(self.send, onSelection, station))>
                     (ReasonReact.string({j|$stationName ($stationCode)|j}))
                     (selected ? <Selected /> : ReasonReact.null)
                   </div>;
                 })
              |> ReasonReact.array;
            } else {
              ReasonReact.null;
            }
          )
        </div>
      </div>
    </div>,
};