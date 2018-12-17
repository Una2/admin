import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";

import "normalize.css" //CSS resets
import "amfe-flexible/index.js";
import api from "./assets/js/plugins/axios/index.js"; //http ajax axios封装方法
import iview from "./assets/js/plugins/iview"; //iView UI
import templates from './assets/vue-templates';

// // 在入口文件中引入基本样式
// import './assets/css/reset.css'
// import './assets/css/border.css'
// import Editor from 'wangeditor'
import E from 'wangeditor'

// import 'wangeditor/release/wangEditor.min.css'


import util from "./assets/js/libs/util.js";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
// Vue.use(iview);
const env = process.env.NODE_ENV === "production" ? true : false; //生产环境和开发环境
// console.log(process.env.NODE_ENV,"process.env.NODE_ENV")
Vue.prototype.$http = api; //全局绑定axios方法
Vue.prototype.util=util;//全局绑定公共js

Vue.config.silent = env ? true : false; //取消 Vue 所有的日志与警告。
Vue.config.productionTip = env ? true : false; //设置为 false 以阻止 vue 在启动时生成生产提示。


//***********路由拦截***************************************
  // router.beforeEach((to, from, next) => {
  //   //	console.log("from",from)
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
  //     // next({
  //     //   name: "home"
  //     // });
  //     next();
  //   }
  // });
  // //router.afterEach((to, from, next) => {
  // router.afterEach((to, from, next) => {
  //   console.log(to,from,next)
  //   //	iView.LoadingBar.finish();
  //   window.scrollTo(0, 0);
  // });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
