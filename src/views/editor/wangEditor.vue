<template>
    <div>
      <div id="editorElem" style="text-align:left"></div>
   <button v-on:click="getContent">查看内容</button>
    </div>
</template>
<script type="text/javascript">
import E from "wangeditor";
 export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        var editor = new E('editorElem')
        console.log(editor,"editor")
        editor.config.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>
<style >
#account--editor {
    width: 100%;
    min-height: 330px;
    height: auto;
}
</style>

