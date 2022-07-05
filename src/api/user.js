import request from "@/utils/request";
export const userLogin = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
export const getCode = (mobile) =>
  request({ method: "GET", url: `/v1_0/sms/codes/${mobile}` });
