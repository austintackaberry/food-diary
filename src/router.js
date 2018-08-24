import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import User from "./views/User.vue";
import moment from "moment";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/user/:username/:date",
      name: "userDate",
      component: User,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.user) {
          next({
            name: "home"
          });
        } else {
          next();
        }
      }
    },
    {
      path: "/user/:username",
      name: "user",
      redirect: to => {
        return {
          name: "userDate",
          params: {
            date: moment().format("YYYYMMDD"),
            ...to.params
          }
        };
      }
    }
  ]
});

export default router;
