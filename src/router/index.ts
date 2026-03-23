import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import CustomerHome from "../views/customer/CustomerHome.vue";
import CustomerLawView from "../views/law/CustomerLawView.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { 
    path: "/dashboard", 
    name: "AdminOverview", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "overview" },
  },
  { 
    path: "/assets", 
    name: "AdminAssets", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "assets" },
  },
  { 
    path: "/law-admin/:tab?", 
    name: "AdminLaw", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "law" },
  },
  { 
    path: "/users", 
    name: "AdminUsers", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "users" },
  },
  { 
    path: "/reports", 
    name: "AdminReports", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "reports" },
  },
  { 
    path: "/metrics", 
    name: "AdminMetrics", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "metrics" },
  },
  { 
    path: "/db-nodes", 
    name: "AdminDBNodes", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "db-nodes" },
  },
  { 
    path: "/blockchain", 
    name: "AdminBlockchain", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "blockchain" },
  },
  { 
    path: "/vault", 
    name: "AdminVault", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "vault" },
  },

  { 
    path: "/admin", 
    redirect: "/dashboard"
  },
  { 
    path: "/home", 
    name: "CustomerHome", 
    component: CustomerHome,
    meta: { requiresAuth: true, role: ['user', 'guest'] } 
  },
  { 
    path: "/law", 
    name: "CustomerLaw", 
    component: CustomerLawView,
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin', 'manager', 'lawyer'] } 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (to.meta.requiresAuth && !token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && token && user) {
    // Redirect already logged in user
    if (["admin", "moderator", "manager", "lawyer"].includes(user.role)) {
      next({ name: "AdminOverview" });
    } else {
      next({ name: "CustomerHome" });
    }
  } else if (
    to.meta.role &&
    Array.isArray(to.meta.role) &&
    (!user || !to.meta.role.includes(user.role))
  ) {
    // Role mismatch
    if (user && ["user", "guest"].includes(user.role)) {
      next({ name: "CustomerHome" });
    } else if (user && ["admin", "moderator", "manager", "lawyer"].includes(user.role)) {
      next({ name: "Dashboard" });
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
