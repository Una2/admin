<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/pageone">pageone</router-link>
    <span>||||||||||</span>
    <router-link to="/pagetwo">pagetwo</router-link>
    <router-view></router-view>
    <!-- <myCanvas :dotsNum="dotsNum" :isColor="false" :lineColor="lineColor" :roundColor="roundColor"></myCanvas> -->
  </div>
</template>
<script>
import myCanvas from "vue-atom-canvas";

export default {
  name: "about",
  data() {
    return {
      lineColor: "rgba(140,178,218,0.1)",
      roundColor: "rgba(140,178,218,0.1)",
      dotsNum: 80,
      showLoading: false
    };
  },
  components: {
    myCanvas
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
// @import './xx.css';
.canvas {
  z-index: 1 !important;
}
</style>
