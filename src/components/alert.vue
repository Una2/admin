
/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {string} modal.text 模态框内容
 * @param {boolean} modal.showbtn 是否显示按钮
 * @param {string} modal.btnText 按钮文字
 */
<template>
<div class="modal_box">
    <div class="tips" v-show="show" transition="fade">
    <div class="tips-close" @click="closeTips">x</div>
    <div class="tips-header">
        <slot name="header">
        <p class="title">{{tips.title}}</p>
        </slot>
    </div>
    <div class="tips-body">
        <slot name="body">
        <p class="notice">{{tips.text}}</p>
        </slot>
    </div>
    <div class="tips-footer">
        <a href="javascript:;" rel="external nofollow" v-if="tips.showbtn" @click="yes" >{{tips.btnText}}</a>
    </div>
    </div>
</div>
</template>
<script>
export default {
  props: ["tipsOptions"],
  template: "#tips",
  data() {
    return {
      show: false
    };
  },
  computed: {
    tips: {
      get() {
        let tips = this.tipsOptions || {};
        tips = {
          title: tips.title || "提示",
          text: tips.text || "",
          showbtn: tips.showbtn || true,
          btnText: tips.btnText || "确定"
        };
        // console.log(tips);
        return tips;
      }
    }
  },
  watch: {},
  mounted() {
    $(".modal_box").height($("body").height());
  },
  methods: {
    closeTips() {
      this.show = false;
      $(".modal_box").hide();      
      $("body").css("overflow","auto");
    },

    yes: function() {
      this.show = false;
      this.$emit("yes", { name: "wenzi", age: 111 }); // 触发yes事件
      $(".modal_box").hide();
      $("body").css("overflow","auto");
    },

    showTips() {
      var self = this;
      self.show = true;
      $("body").css("overflow","hidden");
      setTimeout(function() {
        // self.show = false;
      }, 2000);
    }
  }
};
</script>
<style scoped>
.modal_box {
  width: 100%;
  display: none;
  z-index: 10001;
  /* height: 100%; */
  /* height: {{tempHeight}}; */
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  right: 0;
  position: absolute;
  bottom: 0;
}
.tips {
  position: fixed;
  /* left: 10px; */
  left: 50%;
  top: 40%;
  transform: translate(-50%);
  /* bottom: 10px; */
  z-index: 1001;
  -webkit-overflow-scrolling: touch;
  max-width: 690px;
  width: 280px;
  padding: 20px 10px;
  background: #fff;
  box-shadow: 0 0 10px #888;
  border-radius: 4px;
}
.tips-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.tips-header {
  text-align: center;
  font-size: 25px;
}
</style>
