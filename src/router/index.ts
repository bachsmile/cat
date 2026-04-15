import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import TrialWelcome from "../views/auth/TrialWelcome.vue";
import Dashboard from "../views/manager/admin/Dashboard.vue";
import StoreHome from "../views/retail/StoreHomeView.vue";
import CustomerHome from "../views/customer/CustomerHome.vue";
import CustomerLawView from "../views/law/CustomerLawView.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/welcome-trial", name: "TrialWelcome", component: TrialWelcome },
  {
    path: "/welcome-trial/law",
    name: "LawTrial",
    component: () => import("../views/law/LawTrial.vue"),
  },
  {
    path: "/welcome-trial/finance",
    name: "FinanceTrial",
    component: () => import("../views/finance/FinanceTrial.vue"),
  },
  {
    path: "/welcome-trial/medical",
    name: "MedicalTrial",
    component: () => import("../views/medical/MedicalTrial.vue"),
  },
  {
    path: "/welcome-trial/education",
    name: "EducationTrial",
    component: () => import("../views/education/EducationTrial.vue"),
  },
  {
    path: "/welcome-trial/retail",
    name: "RetailTrial",
    component: () => import("../views/retail/RetailTrial.vue"),
  },
  {
    path: "/welcome-trial/logistics",
    name: "LogisticsTrial",
    component: () => import("../views/logistics/LogisticsTrial.vue"),
  },
  {
    path: "/ad",
    name: "AdminOverview",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "overview",
    },
  },
  {
    path: "/ad/users",
    name: "AdminUsers",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "users",
    },
  },
  {
    path: "/ad/system/modules",
    name: "AdminModules",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin"],
      module: "system_modules",
    },
  },
  {
    path: "/ad/licenses",
    name: "AdminLicenses",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin"],
      module: "licenses",
    },
  },
  {
    path: "/ad/law/:tab?",
    name: "AdminLaw",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "law",
    },
  },
  {
    path: "/ad/wedding/:tab?",
    name: "AdminWedding",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "wedding",
    },
  },
  {
    path: "/ad/finance/:tab?",
    name: "AdminFinance",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "finance",
    },
  },
  {
    path: "/ad/medical/:tab?",
    name: "AdminMedical",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "medical",
    },
  },
  {
    path: "/ad/edu/:tab?",
    name: "AdminEducation",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "education",
    },
  },
  {
    path: "/ad/retail/:tab?",
    name: "AdminRetail",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "retail",
    },
  },
  {
    path: "/ad/logistics/:tab?",
    name: "AdminLogistics",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager"],
      module: "logistics",
    },
  },
  {
    path: "/reports",
    name: "AdminReports",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "reports",
    },
  },
  {
    path: "/metrics",
    name: "AdminMetrics",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "metrics",
    },
  },
  {
    path: "/db-nodes",
    name: "AdminDBNodes",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "db-nodes",
    },
  },
  {
    path: "/blockchain",
    name: "AdminBlockchain",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "blockchain",
    },
  },
  {
    path: "/vault",
    name: "AdminVault",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin", "moderator", "manager", "lawyer"],
      module: "vault",
    },
  },
  {
    path: "/ai-playground",
    name: "AdminAi",
    component: Dashboard,
    meta: { requiresAuth: true, role: ["super_admin", "admin"], module: "ai" },
  },
  {
    path: "/licenses",
    name: "AdminLicenses",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin"],
      module: "licenses",
    },
  },
  {
    path: "/system/modules",
    name: "AdminModules",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: ["super_admin", "admin"],
      module: "system_modules",
    },
  },

  {
    path: "/sp-ad/:tab?",
    name: "SuperAdminHub",
    component: () =>
      import("../views/manager/super-admin/SuperAdminMainView.vue"),
    meta: { requiresAuth: true, role: ["super_admin"] },
  },

  { path: "/dashboard", redirect: "/admin" },
  {
    path: "/admin",
    redirect: () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const role = user.role?.toLowerCase();
      return role === "super_admin" ? "/sp-ad" : "/ad";
    },
  },
  {
    path: "/home",
    name: "CustomerHome",
    component: CustomerHome,
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/law",
    name: "CustomerLaw",
    component: CustomerLawView,
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/law-admin/templates/create",
    name: "LawTemplateCreate",
    component: () => import("../views/law/LawTemplateEditorView.vue"),
    meta: {
      requiresAuth: true,
      role: ["admin", "moderator", "manager", "lawyer"],
    },
  },
  {
    path: "/store",
    name: "CustomerStore",
    component: StoreHome,
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/finance/user/home",
    name: "FinanceUserHome",
    component: () => import("../views/finance/FinanceHomeView.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding",
    name: "WeddingHome",
    component: () => import("../views/wedding/WeddingHomeView.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/my-order",
    name: "WeddingMyOrders",
    component: () => import("../views/wedding/WeddingMyOrdersView.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/album",
    name: "WeddingAlbum",
    component: () => import("../views/wedding/WeddingAlbumView.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/cards",
    name: "WeddingCardList",
    component: () => import("../views/wedding/WeddingCardListView.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/cards/editor",
    name: "WeddingCardEditor",
    component: () => import("../views/wedding/WeddingCardEditor.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/cards/demo",
    name: "WeddingCardDemo",
    component: () => import("../views/wedding/WeddingCardDemo.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/cards/editor",
    name: "WeddingCardEditor",
    component: () => import("../views/wedding/WeddingCardEditor.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  {
    path: "/wedding/cards/demo",
    name: "WeddingCardDemo",
    component: () => import("../views/wedding/WeddingCardDemo.vue"),
    meta: {
      requiresAuth: true,
      role: ["user", "guest", "admin", "manager", "lawyer"],
    },
  },
  // PUBLIC: Invitation view (no auth)
  {
    path: "/invitation/:code",
    name: "WeddingInvitation",
    component: () => import("../views/wedding/WeddingInvitationView.vue"),
  },

  {
    path: "/npm",
    name: "CustomerNpm",
    component: () => import("../views/npm/NpmProjectsView.vue"),
    meta: { requiresAuth: true, role: ["user", "guest", "admin"] },
  },
  {
    path: "/npm/docs/:id",
    name: "NpmDocs",
    component: () => import("../views/npm/NpmDocumentView.vue"),
    meta: { requiresAuth: true, role: ["user", "guest", "admin"] },
    children: [
      { path: "", redirect: (to: any) => `${to.fullPath}/foundation` },
      {
        path: "foundation",
        name: "DocFoundation",
        component: () => import("../views/npm/docs/Foundation.vue"),
      },
      {
        path: "typography",
        name: "DocTypography",
        component: () => import("../views/npm/docs/Typography.vue"),
      },
      {
        path: "components/buttons",
        name: "DocButtons",
        component: () => import("../views/npm/docs/Buttons.vue"),
      },
      {
        path: "components/cards",
        name: "DocCards",
        component: () => import("../views/npm/docs/Cards.vue"),
      },
      {
        path: "components/checkboxes",
        name: "DocCheckboxes",
        component: () => import("../views/npm/docs/Checkboxes.vue"),
      },
      {
        path: "components/modals",
        name: "DocModals",
        component: () => import("../views/npm/docs/Modals.vue"),
      },
      {
        path: "components/toolbars",
        name: "DocToolbars",
        component: () => import("../views/npm/docs/Toolbars.vue"),
      },
    ],
  },
  {
    path: "/npm/payment-success",
    name: "PaymentSuccess",
    component: () => import("../views/npm/PaymentSuccessView.vue"),
    meta: { requiresAuth: true, role: ["user", "guest", "admin"] },
  },
  {
    path: "/law-admin/templates/:id/edit",
    name: "LawTemplateEdit",
    component: () => import("../views/law/LawTemplateEditorView.vue"),
    meta: {
      requiresAuth: true,
      role: ["admin", "moderator", "manager", "lawyer"],
    },
  },
  {
    path: "/web/wedding/:id",
    name: "WeddingPublic",
    component: () => import("../views/wedding/WeddingPublicView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (to.meta.requiresAuth && !token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && token && user) {
    // Redirect already logged in user
    const userRole = user?.role?.toLowerCase();
    if (userRole === "super_admin") {
      next({ name: "SuperAdminHub" });
    } else if (["admin", "moderator", "manager", "lawyer"].includes(userRole)) {
      next({ name: "AdminOverview" });
    } else {
      next({ name: "CustomerHome" });
    }
  } else if (
    to.meta.role &&
    Array.isArray(to.meta.role) &&
    (!user ||
      (user.role?.toLowerCase() !== "super_admin" &&
        !to.meta.role.includes(user.role?.toLowerCase())))
  ) {
    // Role mismatch
    if (user && ["user", "guest"].includes(user.role?.toLowerCase())) {
      next({ name: "CustomerHome" });
    } else if (
      user &&
      ["admin", "moderator", "manager", "lawyer"].includes(
        user.role?.toLowerCase(),
      )
    ) {
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
    const authorizedModules =
      user.modules || (user.module ? [user.module] : []);
    const role = user.role?.toLowerCase();
    const isAuthorized =
      role === "admin" ||
      role === "super_admin" ||
      authorizedModules.includes(to.meta.module);

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
