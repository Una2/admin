import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Util from "@/assets/js/libs/util";
import pageone from "./views/Abouts/pageone.vue";
import pagetwo from "./views/Abouts/pagetwo.vue";
import about from "./views/Abouts/About.vue";
import validator from "./views/form/validator.vue";
import upload from "./views/form/upload.vue";
import form from "./views/form/form.vue";
import scroll from "./views/scroll/scroll.vue";
import event from "./views/events/parent.vue";
import wangEditor from './views/editor/wangEditor.vue'

Vue.use(Router);

export default new Router({
    mode: "hash", //hash
    base: process.env.BASE_URL,
    linkActiveClass: "router-link-active",
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
            // subRoutes: {
            //   "/": {
            //     // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
            //     // 为了简便，这里使用了一个组件的定义
            //     component: {
            //       template: "<p>subROutes</p>"
            //     }
            //   }
            // }
        },
        {
            path: "/about",
            name: "about",
            redirect: "/pageone",
            meta: {
                title: "",
                key: "1",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: about,
            // component: () =>
            //   import(/* webpackChunkName: "about" */ "./views/Abouts/About.vue"),
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
        },
        {
            path: "/hello",
            name: "hello",
            component: () =>
                import(/* webpackChunkName: "about" */ "./components/HelloWorld.vue")
        },
        {
            path: "/validator",
            name: "validator",
            component: validator
        },
        {
            path: "/upload",
            name: "upload",
            component: upload
        },
        {
            path: "/form",
            name: "form",
            component: form
        },
        {
            path: "/scroll",
            name: "scroll",
            component: scroll
        },
        {
            path:"/event",
            name: "event",
            component: event
        },
        {
            path:"/wangEditor",
            name:"wangEditor",
            component:wangEditor
        },
        { path: "*", redirect: "/", component: Home }
    ]
    //   scrollBehavior(to,from,savedPosition){
    //     console.log(savedPosition,"savedPosition")
    //     if(savedPosition){
    //         return savedPosition;
    //     }else{
    //         return {x: 0,y: 0}
    //     };

    //     // if (to.hash) {
    //     //   return {
    //     //     selector: to.hash
    //     //   }
    //     // }
    // }
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
