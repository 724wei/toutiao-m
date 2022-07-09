import request from "@/utils/request";
export const getChannel = () => {
  return request({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};
