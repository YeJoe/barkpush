
<template>
    <div></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, getCurrentInstance } from "vue";
  import { useDialog, useMessage,useNotification  } from "naive-ui";
  
  export default defineComponent({
    setup() {
      window.$message = useMessage();
      window.$dialog = useDialog();
      // window.$notification  = useNotification();
  
    },
  });
  </script>