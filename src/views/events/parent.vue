// 父组件
<template>
  <div>
    <span>{{name}}</span>
    // 在父组件中监听 fromChild事件
    <child @fromChild="onFromChild"></child>
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: ''
      }
    },
    methods: {
      onFromChild: function (data,data1) {
        // data就是子组件传过来的值
        // 如果传过来多个值就用逗号隔开去接收 data1, data2, data3
        this.name = data
        console.log(data,data1)
      }
    }
  }
</script>