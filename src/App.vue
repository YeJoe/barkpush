<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Global from "./components/global.vue";
import Layout from "./pages/layout/layout.vue";

import { defineComponent, ref, Component } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import {
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NConfigProvider,
  NCard,
  NSpace,
  NButton,
  NGlobalStyle,
} from "naive-ui";

const theme = ref<GlobalTheme | null>(null);
</script>

<template>
  <div id="app">
      <n-message-provider>
        <n-dialog-provider>
          <Global />
          <Layout />
        </n-dialog-provider>
      </n-message-provider>
  </div>
</template>

<style scoped>
</style>
