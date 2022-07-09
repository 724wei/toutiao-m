import request from "@/utils/request";
export const getArticle = (data) => {
  return request({
    url: "/v1_0/articles",
    method: "GET",
    params: data,
  });
};
