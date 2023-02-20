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

export function getHotelsRes() {
  return request({
    url: "/api/hotel/list",
    method: "get",
  });
}
export function getPointsRes() {
  return request({
    url: "/api/point/list",
    method: "get",
  });
}
