import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Util from "@/assets/js/libs/util";
import pageone from "./views/Abouts/pageone.vue";
import pagetwo from "./views/Abouts/pagetwo.vue";

Vue.use(Router);

export default new Router({
  mode: "history", //hash
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Home",
        key: "0",
        requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    },
    {
      path: "/about",
      name: "about",
      redirect:'/pageone',
      meta: {
        title: "",
        key: "1",
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Abouts/About.vue"),
      children: [
        {
          path: "/pageone",
          name: "pageone",
          component: pageone
        },
        {
          path: "/pagetwo",
          name: "pagetwo",
          component: pagetwo
        }
      ]
    }
  ]
});

// //***********路由拦截***************************************
// router.beforeEach((to, from, next) => {
//   //	console.log("from",from)
//   //	from.name=="login" ? window.location.reload() : "";
//   let xmtoken = window.sessionStorage.getItem("xmtoken"),
//     ctoken = window.sessionStorage.getItem("ctoken");
//   //	iView.LoadingBar.start();
//   Util.title(to.meta.title);
//   //有xmtoken且有ctoken且是内页或者路由指向登录页面 否则，重置到登录页面
//   if (
//     (!!xmtoken && !!ctoken && to.meta.requireAuth) ||
//     to.name == "login" ||
//     to.name == "sessionLogs"
//   ) {
//     // 判断该路由是否需要登录权限
//     next();
//   } else {
//     next({
//       name: "login"
//     });
//   }
// });
// //router.afterEach((to, from, next) => {
// router.afterEach(() => {
//   //	iView.LoadingBar.finish();
//   window.scrollTo(0, 0);
// });
