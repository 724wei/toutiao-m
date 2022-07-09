import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
