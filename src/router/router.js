import Vue from "vue";
import Router from "vue-router";
import Wrapper from "../components/Wrapper";
import TagsPage from "../page/TagsPage";
import UsersPage from "../page/UsersPage";
import Authorization from "../components/Authorization";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "authorization",
      component: Authorization,
    },

    {
      path: "/wrapper",
      name: "wrapper",
      component: Wrapper,
    },

    {
      path: "/tags",
      name: "tags-page",
      component: TagsPage,
    },

    {
      path: "/users",
      name: "users-page",
      component: UsersPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 1 Не пропускать пользователя если он не залогинен
  // 2 если пользователь залогинен пропускать его на все стр кроме авторизации
  // debugger;

  if (localStorage.getItem("currentUserId") === null) {
    if (to.name === "authorization") {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    if (to.name === "authorization") {
      next({ path: "/wrapper" });
    } else {
      next();
    }
  }
});

export default router;
