// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("bs-json/src/Json_decode.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var partial_arg = (/00:/g);

function makeMidnight24Hrs(param) {
  return param.replace(partial_arg, "24:");
}

function callingAtDecoder(callingAtEntry) {
  return /* record */[
          /* stationName */Json_decode.field("station_name", Json_decode.string, callingAtEntry),
          /* aimedArrivalTime */makeMidnight24Hrs(Json_decode.field("aimed_arrival_time", Json_decode.string, callingAtEntry))
        ];
}

function stationDetailDecoder(stationDetailJson) {
  return /* record */[/* callingAt */Json_decode.field("calling_at", (function (param) {
                  return Json_decode.array(callingAtDecoder, param);
                }), stationDetailJson)];
}

function routeDecoder(routeJson) {
  return /* record */[
          /* finalStation */Json_decode.field("destination_name", Json_decode.string, routeJson),
          /* startTime */Json_decode.field("expected_departure_time", Json_decode.string, routeJson),
          /* endTime */Json_decode.field("expected_departure_time", Json_decode.string, routeJson),
          /* platform */Json_decode.field("platform", Json_decode.string, routeJson),
          /* stationDetail */Json_decode.field("station_detail", stationDetailDecoder, routeJson)
        ];
}

function departuresDecoder(routeJson) {
  return /* record */[/* departures */Json_decode.field("departures", (function (param) {
                  return Json_decode.dict((function (param) {
                                return Json_decode.array(routeDecoder, param);
                              }), param);
                }), routeJson)];
}

function tryDepartureCodes(routeJson) {
  var stationDetail = /* record */[/* callingAt : array */[/* record */[
        /* stationName */"",
        /* aimedArrivalTime */""
      ]]];
  var route = /* record */[
    /* finalStation */"",
    /* startTime */"",
    /* endTime */"",
    /* platform */"",
    /* stationDetail */stationDetail
  ];
  var departures = { };
  departures["all"] = /* array */[route];
  var emptyResponse = /* record */[/* departures */departures];
  try {
    return departuresDecoder(routeJson);
  }
  catch (exn){
    return emptyResponse;
  }
}

function fetchRouteDetails(toStation, fromStation, callback) {
  fetch("https://transportapi.com/v3/uk/train/station/" + (fromStation + ("/live.json?app_id=80307cbf&app_key=a5af3a5b774723ceb037271b7c43cb32&calling_at=" + (toStation + "&darwin=false&from_offset=-PT01:00:00&train_status=passenger&station_detail=calling_at")))).then((function (prim) {
            return prim.json();
          })).then((function (json) {
          var response = tryDepartureCodes(json);
          Curry._1(callback, Js_primitive.undefined_to_opt(response[/* departures */0]["all"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var appId = "80307cbf";

var key = "a5af3a5b774723ceb037271b7c43cb32";

exports.appId = appId;
exports.key = key;
exports.makeMidnight24Hrs = makeMidnight24Hrs;
exports.callingAtDecoder = callingAtDecoder;
exports.stationDetailDecoder = stationDetailDecoder;
exports.routeDecoder = routeDecoder;
exports.departuresDecoder = departuresDecoder;
exports.tryDepartureCodes = tryDepartureCodes;
exports.fetchRouteDetails = fetchRouteDetails;
/* partial_arg Not a pure module */
