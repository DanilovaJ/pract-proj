import { createRouter, createWebHashHistory } from "vue-router";
import Persons from "@/pages/person-page.vue";
import Calculating from "@/pages/calculate-page.vue";
import Results from "@/pages/result-page.vue";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Persons },
    { path: "/calculating", component: Calculating },
    { path: "/results", component: Results },
  ],
});
