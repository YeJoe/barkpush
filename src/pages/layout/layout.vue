<script setup lang="ts">
import { defineComponent, h, ref, Component } from "vue";
import {
  NGlobalStyle,
  NConfigProvider,
  NCard,
  NSpace,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NSwitch,
  NMenu,
} from "naive-ui";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
const theme = ref<GlobalTheme | null>(null);

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "dance-dance-dance",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "home",
              },
            },
            { default: () => "首页" }
          ),
        key: "go-home",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "barkpush",
                path: "/barkpush",
              },
            },
            { default: () => "Bark推送" }
          ),
        key: "go-barkpush",
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "barkpush",
            path: "/barkpush",
          },
        },
        { default: () => "Bark推送" }
      ),
    key: "go-barkpush2",
  },
];

const inverted = ref(false);

const changeTheme = async () => {
  if (theme.value == null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-card title="" size="medium" style="position: relative">
      <div><n-switch v-model:value="inverted" />inverted</div>
      <div class="changeTheme">
        <n-button @click="changeTheme"> 深色 </n-button>
      </div>
    </n-card>

    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
          class="layoutsider"
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          show-trigger
          :inverted="inverted"
          default-expand-all="true"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            accordion
          />
        </n-layout-sider>
        <n-layout>
          <RouterView></RouterView>
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<style scoped>
.changeTheme {
  position: absolute;
  right: 80px;
  top: 20px;
}
.layoutsider {
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  position: relative;
  z-index: 13;
  transition: all 0.2s ease-in-out;
}
</style>
