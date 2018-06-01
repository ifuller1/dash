let parseChannels = stationList => {
  /* Js.log({j|and the list... $firstElement|j});  */
  let mappedList =
    Array.map(
      item => {
        /* Js.log({j|$item|j}); */
        let result =
          switch (String.length(item)) {
          | 0 =>
            let station: Stations.station = {
              name: "Invalid",
              crsCode: "Invalid",
            };
            station;
          | _ =>
            let itemSplit = item |> Js.String.split(",");
            /* Js.log({j|$itemSplit0|j}); */
            let station: Stations.station = {
              name: itemSplit[0],
              crsCode: itemSplit[1],
            };
            /* Js.log({j|station - $station|j}); */
            station;
          };
        result;
      },
      Array.sub(stationList, 1, Array.length(stationList) - 2),
    );
  mappedList;
};

let fetchStationList = callback =>
  Js.Promise.(
    Fetch.fetch("/assets/stations.csv")
    |> then_(Fetch.Response.text)
    |> then_(text =>
         text
         |> Js.String.split("\n")
         |> parseChannels
         |> (
           stories => {
             callback(stories);
             resolve();
           }
         )
       )
    |> ignore
  ); /* TODO: error handling */