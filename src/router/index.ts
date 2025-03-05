import { createRouter, createWebHistory } from "vue-router";
import StockView from "../domains/stocks/views/StockView.vue";

const routes = [
  { path: "", name: "StockView", component: StockView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;