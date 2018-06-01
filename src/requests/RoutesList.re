let appId = "80307cbf";

let key = "a5af3a5b774723ceb037271b7c43cb32";

let makeMidnight24Hrs = Js.String.replaceByRe([%bs.re "/00:/g"], "24:");

let callingAtDecoder = callingAtEntry : Routes.callingAt =>
  Json.Decode.{
    stationName: callingAtEntry |> field("station_name", string),
    aimedArrivalTime:
      callingAtEntry
      |> field("aimed_arrival_time", string)
      |> makeMidnight24Hrs,
  };

let stationDetailDecoder = stationDetailJson : Routes.stationDetail =>
  Json.Decode.{
    callingAt:
      field("calling_at", array(callingAtDecoder), stationDetailJson),
  };

let routeDecoder = routeJson : Routes.route =>
  Json.Decode.{
    finalStation: routeJson |> field("destination_name", string),
    platform: routeJson |> field("platform", string),
    startTime: routeJson |> field("expected_departure_time", string),
    endTime: routeJson |> field("expected_departure_time", string),
    stationDetail: routeJson |> field("station_detail", stationDetailDecoder),
  };

type response = {departures: Js.Dict.t(array(Routes.route))};

/* type departures = {
     all: list(Routes.route)
   };  */
let departuresDecoder = routeJson =>
  Json.Decode.{
    departures: field("departures", dict(array(routeDecoder)), routeJson),
  };

let tryDepartureCodes = routeJson => {
  let callingAt: Routes.callingAt = {stationName: "", aimedArrivalTime: ""};
  let stationDetail: Routes.stationDetail = {callingAt: [|callingAt|]};
  let route: Routes.route = {
    finalStation: "",
    startTime: "",
    endTime: "",
    platform: "",
    stationDetail,
  };
  let departures = Js.Dict.empty();
  Js.Dict.set(departures, "all", [|route|]);
  let emptyResponse = {departures: departures};
  let response =
    try (departuresDecoder(routeJson)) {
    | exn => emptyResponse
    };
  response;
};

let fetchRouteDetails =
    (toStation, fromStation, callback: option(Routes.routes) => unit) =>
  Js.Promise.(
    Fetch.fetch(
      "https://transportapi.com/v3/uk/train/station/"
      ++ fromStation
      ++ "/live.json?app_id=80307cbf&app_key=a5af3a5b774723ceb037271b7c43cb32&calling_at="
      ++ toStation
      ++ "&darwin=false&from_offset=-PT01:00:00&train_status=passenger&station_detail=calling_at",
    )
    |> then_(Fetch.Response.json)
    |> then_(json =>
         json
         |> tryDepartureCodes
         |> (
           response => {
             callback(Js.Dict.get(response.departures, "all"));
             resolve();
           }
         )
       )
    |> ignore
  ); /* TODO: error handling */