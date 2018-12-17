<template>
  <div>
    <span>{{childValue}}</span>
    <input type="button" value="点击触发" @click="send">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        childValue: '我是子组件的数据'
      }
    },
    methods: {
      send () {
      // 如果传多个值就用逗号隔开 a, b, c
        this.$emit('fromChild', this.childValue,1)
      }
    }
  }
</script>