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

export function getRoutesRes(payload) {
  return request({
    url: "/api/route/getRouteList",
    method: "get",
    payload,
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
    url: "/api/help/help_list",
    method: "get",
  });
}

export function getIsReadRes() {
  return request({
    url: "/api/help/get_is_read",
    method: "get",
  });
}

export function setIsReadRes(payload) {
  return request({
    url: "/api/help/set_is_read",
    method: "get",
    payload,
  });
}
