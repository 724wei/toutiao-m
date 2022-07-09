import store from "@/store";
import axios from "axios";
const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
});
// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    // config==当前配置项，设置token
    const token = store.state?.user?.token;
    // 判断是否存在token方法
    // 存在就在config中添加请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // 为了使后面的代码能够在不成功的时候报错，如果使用resolved即使错误后面也会正常运行
    return Promise.reject(err);
  }
);
request.interceptors.response.use(); //响应拦截器
export default request;
