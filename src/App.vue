<template>
  <div id="app">
    <md-field class="block" title="投保人">
      <md-input-item
        title="投保人姓名"
        placeholder="请填写投保人姓名"
      ></md-input-item>
      <md-input-item
        title="身份证号"
        placeholder="请填写投保人身份证号"
      ></md-input-item>
    </md-field>
    <div style="font-size:8px">我是8px</div>
    <div style="font-size:10px">我是10px</div>
    <div style="font-size:12px">我是12px</div>
    <div style="font-size:14px">我是14px</div>
    <div id="nav">
      <i class="iconfont">&#xe627;</i>
      <i class="iconfont icon-ascend"></i>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="slide-left">
    <router-view/>
    </transition>
    <Button @click="modal10 = true">Vertical center</Button>
     <div class="md-example-child  md-example-child-button md-example-child-button-3">
    <div class="md-example-section">
      <md-button type="primary" icon="edit" inline>Inline Primary</md-button>
      <md-button type="primary" inline plain>Inline Plain</md-button>
    </div>
    <div class="md-example-section">
      <md-button type="warning" size="small" inline>Warning</md-button>
      <md-button type="disabled" size="small" inline>Disabled</md-button>
    </div>
  </div>
    <Modal
        title="Title"
        v-model="modal10"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
     <a href="javascript:;" rel="external nofollow" @click="showtips">显示</a>
      <v-alert  :tips-options="tipsOptions" ref="dialog"  @yes="yes" v-cloak></v-alert>
  </div>
</template>
<script>
import {
  Agree,
  ActionBar,
  Field,
  FieldItem,
  InputItem,
  Picker,
  Button
} from 'mand-mobile'
import alert from "@/components/alert";
// function reverseTree(data, pid){
//     var result = [],
//         temp;

//     // var data = JSON.parse(JSON.stringify(data));  // 将一个DataModel的object转成了JS的Object
//  var data =data;
//     for(var i in data){
//         if(data[i].parentId == pid){
//             result.push(data[i]);
//             temp = reverseTree(data, data[i]._id);
//             if(temp.length>0){
//                 data[i].children = temp;
//             }
//         }
//     }
//     return result;
// }

function reverseTree(data, id){
    var result = [],temp;
    // var data = JSON.parse(JSON.stringify(data));  // 将一个DataModel的object转成了JS的Object
 var data =data;
//  if(data.id){
   for(var i=0;i<data.length;i++){
     console.log(i,"i")
        if(data[i].id == id){
            result.push(data[i]);
            temp = reverseTree(data[i].childList, data[i].id);
            if(temp.length>0){
                data[i].children = temp;
            }
        }
    }
//  }
    console.log(result,"result")
    
    return result;
}
// import loading from "@/components/loading";
export default {
  name: "app",
  components: {
    [Agree.name]: Agree,
    [ActionBar.name]: ActionBar,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Picker.name]: Picker,
    [Button.name]: Button,
  },
  data() {
    return {
      modal10: false,
      showAlert: true,
      tipsOptions: {
        title: "弹窗",
        text: "写了一个弹窗组件",
        showbtn: true, //默认true
        btnText: "我知道了" //默认确定
      },
      relation: '本人',
      isPickerShow: false,
      actionBarData: [{
        text: '我要投保'
      }],
      pickerData: [[{text:'本人'},{text:'父母'},{text:'配偶'},{text:'子女'}]]
    };
  },
  components: {
    "v-alert": alert
    // "v-loading": loading
  },
  methods: {
    // 监听从组件内传递出来的事件
    yes(args) {
      console.log( args );
      // alert(JSON.stringify(args));
    },
    // 显示tips
    showtips() {
      //   console.log(this.$refs.dialog,"this.$refs.dialog");
      this.$refs.dialog.showTips();
      $(".modal_box").show();
    },
  },
  mounted() {
    // console.log(this.$mui,"this.$mui")
    // this.$refs.dialog.showTips(); 
    // var data=[{"id":"","name":"产品分类","childList":[{"id":"T0001","name":"保单贷","childList":[],"level":3},{"id":"T0002","name":"保险分期","childList":[],"level":3},{"id":"T0003","name":"够花（7贷）","childList":[],"level":3},{"id":"T0004","name":"创客贷（电信）","childList":[],"level":3},{"id":"T0005","name":"够花（产业）","childList":[],"level":3},{"id":"T0006","name":"够花（会员）","childList":[],"level":3},{"id":"T0007","name":"家电分期","childList":[],"level":3},{"id":"T0008","name":"家电尊享、精英贷","childList":[],"level":3},{"id":"T0009","name":"净水设备","childList":[],"level":3},{"id":"T0010","name":"冷柜分期","childList":[],"level":3},{"id":"T0011","name":"手机分期","childList":[],"level":3},{"id":"T0012","name":"装修（产业）","childList":[],"level":3},{"id":"T0013","name":"车位贷","childList":[],"level":3},{"id":"T0014","name":"创客贷（海尔）","childList":[],"level":3},{"id":"T0015","name":"创客贷（政企）","childList":[],"level":3},{"id":"T0016","name":"够花（社区）","childList":[],"level":3},{"id":"T0017","name":"惠农贷","childList":[],"level":3},{"id":"T0018","name":"家居贷（红星）","childList":[],"level":3},{"id":"T0019","name":"教育分期","childList":[],"level":3},{"id":"T0020","name":"旅游项目","childList":[{"id":"T0025","name":"有住家装","childList":[{"id":"T0100","name":"有住家装-101","childList":[],"updateDate":"2019-01-11","level":2}],"level":3}],"level":3},{"id":"T0021","name":"心意贷（房东乐）","childList":[],"level":3},{"id":"T0022","name":"心意贷（社区）","childList":[],"level":3},{"id":"T0023","name":"馨厨冰箱","childList":[],"level":3},{"id":"T0024","name":"医美贷","childList":[],"level":3},{"id":"T0026","name":"装修贷（社区）","childList":[],"level":3},{"id":"T0027","name":"租房贷","childList":[],"level":3},{"id":"T0028","name":"达飞消费","childList":[],"level":3},{"id":"T0029","name":"达飞云贷","childList":[],"level":3},{"id":"T0030","name":"够花（达飞）","childList":[],"level":3},{"id":"T0031","name":"够花（夸客）","childList":[],"level":3},{"id":"T0032","name":"够花（网商）","childList":[],"level":3},{"id":"T0033","name":"够花（网约车）","childList":[],"level":3},{"id":"T0034","name":"亨元金融","childList":[],"level":3},{"id":"T0035","name":"桔子分期","childList":[],"level":3},{"id":"T0036","name":"美利金融","childList":[],"level":3},{"id":"T0037","name":"线上商城（创新）","childList":[],"level":3},{"id":"T0038","name":"心意贷（夸客）","childList":[],"level":3},{"id":"T0039","name":"够花（互联）","childList":[],"level":3},{"id":"T0040","name":"够花（嗨付）","childList":[],"level":3},{"id":"T0041","name":"够花（支付宝）","childList":[],"level":3},{"id":"T0042","name":"家电分期（顺逛）","childList":[],"level":3},{"id":"T0043","name":"线上商城（空气堡）","childList":[],"level":3},{"id":"T0044","name":"线上商城（标准）","childList":[],"level":3},{"id":"T0045","name":"够花（高铁管家）","childList":[],"level":3},{"id":"T0046","name":"够花（咖啡）","childList":[],"level":3},{"id":"T0047","name":"够花（云贷）","childList":[],"level":3},{"id":"T0048","name":"够花（其他）","childList":[],"level":3}]}]
    // reverseTree(data[0].childList,"")
    
  }
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
  //渐变动效
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.1s ease-in;
    opacity: 1;
  }
  .slide-left-enter,
  .slide-left-leave-active {
    opacity: 0;
  }

  //左滑动效
  // .slide-left-enter-active {
  //   animation: slideLeft .3s;
  // }
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
@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

</style>
