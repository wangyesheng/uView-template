import request from "./request";

export function decryUserPhoneRes(payload) {
  return request({
    url: "api/user/decryUserPhone",
    method: "post",
    payload,
  });
}

export function checkLoginRes(payload) {
  return request({
    url: "/api/user/login",
    method: "post",
    payload,
  });
}

export function getRegionsRes() {
  return request({
    url: "/api/region/list",
    method: "get",
  });
}

export function getRoutesRes(payload) {
  return request({
    url: "/api/driver_route/getRouteList",
    method: "get",
    payload,
  });
}

export function getSchedulesRes(payload) {
  return request({
    url: "/api/driver_route/scheduleList",
    method: "get",
    payload,
  });
}

export function getRouteInfoRes(payload) {
  return request({
    url: "/api/driver_route/routeInfo",
    method: "get",
    payload,
  });
}

export function createReportDataRes(payload) {
  return request({
    url: "/api/driver_route/createInfo",
    method: "post",
    payload,
  });
}

export function getReportsRes() {
  return request({
    url: "/api/driver_route/reportList",
    method: "get",
  });
}

export function getReportByIdRes(report_id) {
  return request({
    url: "/api/driver_route/reportInfo",
    method: "get",
    payload: { report_id },
  });
}

export function getStaffRoutesRes() {
  return request({
    url: "/api/staff_route/list",
    method: "get",
  });
}

export function getStaffStationsByRouteIdRes(route_id) {
  return request({
    url: "/api/staff_route/station_list",
    method: "get",
    payload: {
      route_id,
    },
  });
}

export function getStaffRouteInfoByRouteIdRes(route_id) {
  return request({
    url: "/api/staff_route/info",
    method: "get",
    payload: {
      route_id,
    },
  });
}

export function updateUserProfileRes(payload) {
  return request({
    url: "/api/user/profile",
    method: "post",
    payload,
  });
}

export function getCustomerPhoneRes() {
  return request({
    url: "/api/help/servicePhone",
    method: "get",
  });
}

export function getAgreementRes() {
  return request({
    url: "/api/help/agreement",
    method: "get",
  });
}

export function getAboutRes() {
  return request({
    url: "/api/help/about",
    method: "get",
  });
}

export function getBannersRes() {
  return request({
    url: "/api/banner/list",
    method: "get",
  });
}

export function getHotelsRes(payload) {
  return request({
    url: "/api/hotel/list",
    method: "get",
    payload,
  });
}
export function getPointsRes() {
  return request({
    url: "/api/point/list",
    method: "get",
  });
}

export function getRouteNumberRes(payload) {
  return request({
    url: "/api/route/getNumber",
    method: "post",
    payload,
  });
}

export function getRouteInfoListRes(payload) {
  return request({
    url: "/api/route_station/getRouteInfoList",
    method: "get",
    payload,
  });
}

export function createReserveRes(payload) {
  return request({
    url: "/api/reserve/create",
    method: "post",
    payload,
  });
}

export function getReservesRes(payload) {
  return request({
    url: "/api/reserve/list",
    method: "get",
    payload,
  });
}

export function cancelReserveRes(reserve_id) {
  return request({
    url: "/api/reserve/cancel",
    method: "post",
    payload: {
      reserve_id,
    },
  });
}

export const getReserveByIdRes = (reserve_id) => {
  return request({
    url: "/api/reserve/info",
    method: "get",
    payload: {
      reserve_id,
    },
  });
};

export const updateReserveRes = (payload) => {
  return request({
    url: "/api/reserve/update",
    method: "post",
    payload,
  });
};

export function getLastestReserveRes() {
  return request({
    url: "/api/reserve/new",
    method: "get",
  });
}

export function createOpinionRes(payload) {
  return request({
    url: "/api/help/create",
    method: "post",
    payload,
  });
}

export function getOpinionsRes() {
  return request({
    url: "/api/help/list",
    method: "get",
  });
}
