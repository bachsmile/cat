import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import TrialWelcome from "../views/auth/TrialWelcome.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import CustomerHome from "../views/customer/CustomerHome.vue";
import CustomerLawView from "../views/law/CustomerLawView.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/welcome-trial", name: "TrialWelcome", component: TrialWelcome },
  { path: "/welcome-trial/law", name: "LawTrial", component: () => import("../views/law/LawTrial.vue") },
  { path: "/welcome-trial/finance", name: "FinanceTrial", component: () => import("../views/finance/FinanceTrial.vue") },
  { path: "/welcome-trial/medical", name: "MedicalTrial", component: () => import("../views/medical/MedicalTrial.vue") },
  { path: "/welcome-trial/education", name: "EducationTrial", component: () => import("../views/education/EducationTrial.vue") },
  { path: "/welcome-trial/retail", name: "RetailTrial", component: () => import("../views/retail/RetailTrial.vue") },
  { path: "/welcome-trial/logistics", name: "LogisticsTrial", component: () => import("../views/logistics/LogisticsTrial.vue") },
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
    path: "/finance/:tab?", 
    name: "AdminFinance", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "finance" },
  },
  { 
    path: "/medical/:tab?", 
    name: "AdminMedical", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "medical" },
  },
  { 
    path: "/education/:tab?", 
    name: "AdminEducation", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "education" },
  },
  { 
    path: "/retail/:tab?", 
    name: "AdminRetail", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "retail" },
  },
  { 
    path: "/logistics/:tab?", 
    name: "AdminLogistics", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"], module: "logistics" },
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
    path: "/ai-playground", 
    name: "AdminAi", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin"], module: "ai" },
  },
  { 
    path: "/licenses", 
    name: "AdminLicenses", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin"], module: "licenses" },
  },
  { 
    path: "/system/modules", 
    name: "AdminModules", 
    component: Dashboard,
    meta: { requiresAuth: true, role: ["admin"], module: "system_modules" },
  },

  { 
    path: "/admin", 
    redirect: "/dashboard"
  },
  { 
    path: "/home", 
    name: "CustomerHome", 
    component: CustomerHome,
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin', 'manager', 'lawyer'] } 
  },
  { 
    path: "/law", 
    name: "CustomerLaw", 
    component: CustomerLawView,
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin', 'manager', 'lawyer'] } 
  },
  {
    path: "/law-admin/templates/create",
    name: "LawTemplateCreate",
    component: () => import("../views/law/LawTemplateEditorView.vue"),
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"] }
  },
  {
    path: "/npm",
    name: "CustomerNpm",
    component: () => import("../views/npm/NpmProjectsView.vue"),
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin'] }
  },
  {
    path: "/npm/purchase/:id",
    name: "NpmPurchase",
    component: () => import("../views/npm/NpmPurchaseView.vue"),
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin'] }
  },
  {
    path: "/npm/payment-success",
    name: "PaymentSuccess",
    component: () => import("../views/npm/PaymentSuccessView.vue"),
    meta: { requiresAuth: true, role: ['user', 'guest', 'admin'] }
  },
  {
    path: "/law-admin/templates/:id/edit",
    name: "LawTemplateEdit",
    component: () => import("../views/law/LawTemplateEditorView.vue"),
    meta: { requiresAuth: true, role: ["admin", "moderator", "manager", "lawyer"] }
  }
];

const router = createRouter({
  history: createWebHistory(),
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
      next({ name: "AdminOverview" });
    } else {
      next({ name: "Login" });
    }
  } else if (
    to.meta.module &&
    user &&
    to.meta.module !== "overview" // Allow overview for everyone
  ) {
    // Multi-module Domain restriction
    const authorizedModules = user.modules || (user.module ? [user.module] : []);
    const isAuthorized = user.role === "admin" || authorizedModules.includes(to.meta.module);
    
    if (!isAuthorized) {
      // Redirect to the first authorized module if available
      if (authorizedModules.includes("law")) {
        next({ name: "AdminLaw" });
      } else {
        next({ name: "AdminOverview" });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
