import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";
Vue.use(Vuex);
const tokenKey = "toutiao_token";
export default new Vuex.Store({
  // 全局任何地方都能使用
  // 存储全局状态数据
  state: {
    user: getLocal(tokenKey),
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 第一个参数就是仓库的状态
    setUser(state, user) {
      state.user = user;
      // 将token转换为JSON格式存入本地
      // localStorage.setItem(tokenKey, JSON.stringify(user));
      setLocal(tokenKey, user);
      console.log(user);
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});
