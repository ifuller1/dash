let stationDecoder = stationJson : Stations.station =>
  Json.Decode.{
    name: stationJson |> field("name", string),
    crsCode: stationJson |> field("crsCode", string),
  };

let settingsDecoder = settingsJson : Settings.settings =>
  Json.Decode.{
    startStationOption:
      settingsJson |> optional(field("startStationOption", stationDecoder)),
    endStationOption:
      settingsJson |> optional(field("endStationOption", stationDecoder)),
  };

let encodeStation = stationOption =>
  switch (stationOption) {
  | Some((station: Stations.station)) =>
    Json.Encode.object_([
      ("name", Json.Encode.string(station.name)),
      ("crsCode", Json.Encode.string(station.crsCode)),
    ])
  | None => Json.Encode.null
  };

let settingsEncoder = (settings: Settings.settings) =>
  Json.Encode.(
    object_([
      ("startStationOption", encodeStation(settings.startStationOption)),
      ("endStationOption", encodeStation(settings.endStationOption)),
    ])
  );

let emptySettings: Settings.settings = {
  startStationOption: None,
  endStationOption: None,
};

let fetchSettings = (callback: option(Settings.settings) => unit) =>
  BrowserPersist.getItem(~decoder=settingsDecoder, "settings")
  |> Js.Promise.then_(decodedSettings =>
       switch (decodedSettings) {
       | Js.Result.Ok(result) =>
         Js.log({j|storage results - $result|j});
         callback(Some(result));
         Js.Promise.resolve();
       | Js.Result.Error(err) =>
         Js.log({j|storage error $err|j});
         callback(None);
         Js.Promise.resolve();
       }
     );

let saveSettings = (settings: Settings.settings) =>
  BrowserPersist.setItem(~encoder=settingsEncoder, ~key="settings", settings);

let saveFromStation = toStation =>
  fetchSettings((currentSavedSettings: option(Settings.settings)) =>
    switch (currentSavedSettings) {
    | Some(currentSettings) =>
      saveSettings({...currentSettings, startStationOption: Some(toStation)})
      |> ignore
    | None =>
      saveSettings({...emptySettings, startStationOption: Some(toStation)})
      |> ignore
    }
  )
  |> ignore;

let saveToStation = toStation =>
  fetchSettings((currentSavedSettings: option(Settings.settings)) =>
    switch (currentSavedSettings) {
    | Some(currentSettings) =>
      saveSettings({...currentSettings, endStationOption: Some(toStation)})
      |> ignore
    | None =>
      saveSettings({...emptySettings, endStationOption: Some(toStation)})
      |> ignore
    }
  )
  |> ignore;