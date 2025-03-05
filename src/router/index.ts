import { createRouter, createWebHistory } from "vue-router";
import PruebaComponent from "../domains/shared/components/PruebaComponent.vue";

const routes = [
  { path: "", name: "Prueba", component: PruebaComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;