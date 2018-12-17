<template>
    <div class="pageone">
        hello  I am pageone
    </div>
</template>
<script>
export default {
  name:"pageone",
  data() {
    return {
      data:""
    };
  },
  mounted() {
    this.data=this.$route;
    console.log(this, "pageone.vue");
  }
};
</script>

