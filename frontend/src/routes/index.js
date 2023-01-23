import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { useMainStore } from "../store/main";

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: "/",
      component: () => import("../layouts/Main.vue"),

      children: [
        { path: "/", redirect: { name: "home" } },
        {
          path: "/",
          name: "home",
          component: () => import("../pages/Dashboard.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../pages/dashboard/Profile.vue"),
        },
        {
          path: "/add-job/:id?",
          name: "addJob",
          component: () => import("../pages/dashboard/AddJob.vue"),
        },

        {
          path: "/all-job",
          name: "allJob",
          component: () => import("../pages/dashboard/Jobs.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/landing",
      name: "landing",
      component: () => import("../pages/Landing.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/Register.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/:pathMatch(.*)",
      name: "error",
      component: () => import("../pages/Error.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useMainStore();

  if (to.meta.requiresAuth && !store._user)
    next({ path: "/register", query: { redirect: to.fullPath } });
  else if (!to.meta.requiresAuth && store._user) next({ path: "/" });

  next();
});
export default router;
