import request from "./request";

export function getHotelsRes() {
  return request({
    url: "/api/hotel/list",
    method: "get",
  });
}
