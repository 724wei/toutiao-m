import request from "@/utils/request";
// import store from "@/store";
export const userLogin = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
export const getCode = (mobile) =>
  request({ method: "GET", url: `/v1_0/sms/codes/${mobile}` });
// 获取用户信息
export const fetchUser = () =>
  request({
    method: "GET",
    url: "/v1_0/user",
  });
