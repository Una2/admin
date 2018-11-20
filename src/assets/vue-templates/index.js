import About from "../../views/Abouts/About.vue";

export default {
  install(vue) {
    /**
     * 全局组件
     */
    vue.component("Aboout", About); //自定义About
  }
};
