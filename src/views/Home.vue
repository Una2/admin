<template>
  <div class="home">
    <img alt="Vue logo"  src="../assets/logo.png">
    <HelloWorld msg/>
    <button @click="getLogin()"> 登录</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {
  decrypt,
  simpleEncrypt,
  simpleDecrypt
} from "../assets/js/libs/secret.js";

// import { constants } from "http";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      deviceType: ""
    };
  },
  methods: {
    getLogin() {
      // console.log(this.$http, "this.$http");
      // this.$http
      //   .put("/app/appserver/customerLogin", {
      //     userId: simpleEncrypt("18255457802"),
      //     password: simpleEncrypt("Aa123456"),
      //     type: "login",
      //     deviceType: this.deviceType,
      //     deviceId: simpleEncrypt("-" + "18255457802" + "-")
      //   })
      //   .then(function(response) {
      //     console.log(response,"response")
      //   })
      //   .catch(function(error) {
      //     console.log(error,"error")          
      //   });
      this.$http.get("/app/appserver/uauth/isRegister",{
        mobile: simpleEncrypt('1111111111')
      }) .then((res)=> {
        // console.log(data,"data")
        console.log(res,"res")
        })
        // .catch((error)=> {
        //   console.log(error,"error")          
        // });
    }
  },
  mounted() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      this.deviceType = "AND";
    } else if(isiOS) {
      this.deviceType = "IOS";
    }
  }
};
</script>
