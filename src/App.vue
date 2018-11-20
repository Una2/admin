<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <Button @click="modal10 = true">Vertical center</Button>
    <Modal
        title="Title"
        v-model="modal10"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
      <v-alert  :tips-options="tipsOptions" ref="dialog"  @yes="yes" v-cloak></v-alert>
  </div>
</template>
<script>
import alert from "@/components/alert";
// import loading from "@/components/loading";
export default {
  name: "app",
  data() {
    return {
      modal10: false,
      showAlert: true,
       tipsOptions: {
        title: "弹窗",
        text: "写了一个弹窗组件",
        showbtn: true, //默认true
        btnText: "我知道了" //默认确定
      }
    };
  },
  components: {
    "v-alert": alert
    // "v-loading": loading
  },
  methods: {
    // 监听从组件内传递出来的事件
    yes(args) {
      // console.log( args );
      alert(JSON.stringify(args));
    },
    // 显示tips
    showtips() {
      //   console.log(this.$refs.dialog,"this.$refs.dialog");
      this.$refs.dialog.showTips();
      $(".modal_box").show();
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "./assets/font/iconfont.css";
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}

[v-cloak] {
  display: none;
}
</style>
