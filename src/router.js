import { createMemoryHistory, createRouter } from "vue-router";

import DashboardView from "./pages/Dashboard.vue";
import ImportView from "./pages/ImportView.vue";

const routes = [
  { path: "/", component: DashboardView },
  { path: "/import", component: ImportView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
