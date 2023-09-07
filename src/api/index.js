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

export function getUserInfoRes() {
  return request({
    url: "/api/user/info",
    method: "get",
  });
}

export function getCheckTypesRes() {
  return request({
    url: "/api/category/list?type=check_type",
    method: "get",
  });
}

export function getPetTypesRes() {
  return request({
    url: "/api/pet_info/pet_list",
    method: "get",
  });
}

export function getInsuresRes() {
  return request({
    url: "/api/insure_info/insure_list",
    method: "get",
  });
}

export function addOrUpdateOrderRes(payload) {
  return request({
    url: "/api/user_quotation_price_d/create",
    method: "post",
    payload,
  });
}

export function getOrdersRes(payload) {
  return request({
    url: "/api/user_quotation_price_d/get_user_quotation",
    method: "get",
    payload,
  });
}

export function getOrderInfoRes(order_number) {
  return request({
    url: "/api/user_quotation_price_d/view",
    method: "get",
    payload: {
      order_number,
    },
  });
}

export function getMerchantsRes(order_number) {
  return request({
    url: "/api/transport_quotation_price_d/list",
    method: "get",
    payload: {
      order_number,
    },
  });
}

export function getMerchantPriceRes(payload) {
  return request({
    url: "/api/user_order_d/get_deposit_price",
    method: "get",
    payload,
  });
}

export function getPayParamsRes(payload) {
  return request({
    url: "/api/user_order_d/deposit_pay",
    method: "post",
    payload,
  });
}

export function getFinalPayParamsRes(payload) {
  return request({
    url: "/api/user_order_d/order_pay",
    method: "post",
    payload,
  });
}

export function getRefundRuleRes() {
  return request({
    url: "/api/index/get_refund_rule",
    method: "get",
  });
}

export function getReleaseAgreementRes() {
  return request({
    url: "/api/index/get_release_agreement",
    method: "get",
  });
}
export function refundRes(payload) {
  return request({
    url: "/api/user_order_d/cancel_order",
    method: "post",
    payload,
  });
}
// 取消托运
export function cancelOrderRes(order_number) {
  return request({
    url: "/api/user_quotation_price_d/cancel",
    method: "get",
    payload: {
      order_number,
    },
  });
}

export function confirmOrderRes(order_number) {
  return request({
    url: "/api/user_quotation_price_d/confirm_order",
    method: "get",
    payload: {
      order_number,
    },
  });
}

export function getCagesRes() {
  return request({
    url: "/api/cage_info/cage_list",
    method: "get",
  });
}

export function merchantApplyRes(payload) {
  return request({
    url: "/api/transport_service_info/apply",
    method: "post",
    payload,
  });
}

export function getBannersRes() {
  return request({
    url: "/api/banner/list",
    method: "get",
  });
}
export function getTravelInfoRes() {
  return request({
    url: "/api/user_quotation_price_d/get_travel_track",
    method: "get",
  });
}
export function getInsureClauseRes() {
  return request({
    url: "/api/index/get_insure_clause",
    method: "get",
  });
}
export function getServiceMobileRes() {
  return request({
    url: "/api/index/get_service_mobile",
    method: "get",
  });
}
export function getCommonQuestionRes() {
  return request({
    url: "/api/index/get_common_question",
    method: "get",
  });
}
export function getAboutUSRes() {
  return request({
    url: "/api/index/get_about_us",
    method: "get",
  });
}
export function getServiceAgreementRes() {
  return request({
    url: "/api/index/get_service_agreement",
    method: "get",
  });
}
export function getMerchantReviewStatusRes() {
  return request({
    url: "/api/transport_service_info/get_apply_status",
    method: "get",
  });
}

export function updateUserProfileRes(payload) {
  return request({
    url: "/api/user/profile",
    method: "post",
    payload,
  });
}
export function applyAfterSalesRes(payload) {
  return request({
    url: "/api/user_quotation_price_d/after_sale",
    method: "post",
    payload,
  });
}
export function getApplyAfterSalesRes(order_number) {
  return request({
    url: "/api/user_quotation_price_d/get_after_sale",
    method: "get",
    payload: {
      order_number,
    },
  });
}
