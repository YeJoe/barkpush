import { defineStore } from 'pinia';
import {  ref } from "vue";
 
export const useBarkPushStore = defineStore({
  id: 'barkpush', // 必填且唯一
  state: () => {
    return {

      formValue: ref({
          // api: '',
          title: '',
          body: '',
          device_key: "",
          sound: "healthnotification.caf",
          icon: "https://day.app/assets/images/avatar.jpg",
          group: "",
          url: "",
        })
    };
  },
  actions: {
    updateAPI(BarkPush_config: any) {
    // console.log('BarkPush_config:',BarkPush_config)
      this.formValue = BarkPush_config;
    },
  },
  //使用该插件，开启数据缓存
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'BarkPush_config',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.localStorage, 
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['formValue.device_key','formValue.sound','formValue.icon','formValue.group',],
  },
});
