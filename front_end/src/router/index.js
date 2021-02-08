import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/news",
    name: "News",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/world",
    name: "World",
    component: () => import("../views/World.vue"),
  },
  {
    path: "/rumors",
    name: "Rumors",
    component: () => import("../views/Rumors.vue"),
  },
  {
    path: "/news/:id",
    name: "NewsItem",
    component: () => import("../components/News/NewsItem.vue"),
    props: true,
  },
  {
    path: "/:id",
    name: "ChinaProvince",
    component: () => import("../components/China/ChinaProvin.vue"),
    props: true,
  },
  {
    path: "/world/:id",
    name: "WorldCountry",
    component: () => import("../components/World/WorldCountry.vue"),
    props: true,
  },
  {
    path: "/world/predict/:id",
    name: "WorldPredict",
    component: () => import("../components/World/WorldPredict.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
