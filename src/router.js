import { createMemoryHistory, createRouter } from "vue-router";

import DashboardView from "./pages/Dashboard.vue";
import ImportView from "./pages/ImportView.vue";
import AccountView from "./pages/Account.vue";

const routes = [
  { path: "/", component: DashboardView },
  { path: "/import", component: ImportView },
  { path: "/account", component: AccountView, props: true },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
