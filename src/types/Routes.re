type callingAt = {
  stationName: string,
  aimedArrivalTime: string,
};

type stationDetail = {
  callingAt: array(callingAt),
};

type route = {
  finalStation: string,
  startTime: string,
  endTime: string,
  platform: string,
  stationDetail: stationDetail,
};

type routes = array(route);