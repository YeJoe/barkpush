<template>
  <n-grid cols="1 s:1 m:2 l:2 xl:2 2xl:2" responsive="screen">
    <n-grid-item>
      <div class="light-green">
        <n-card title="BarkPush" hoverable>
          <n-form
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
          >
            <!-- <n-form-item label="API" path="api">
              <n-input v-model:value="formValue.api" placeholder="例如:https://xxx.com/key/" clearable />
            </n-form-item> -->
            <n-form-item label="deviceKey" path="device_key">
              <n-input
                v-model:value="formValue.device_key"
                placeholder="输入DeviceKey"
              />
            </n-form-item>
            <n-form-item label="标题" path="title">
              <n-input
                v-model:value="formValue.title"
                placeholder="标题"
                clearable
              />
            </n-form-item>
            <n-form-item label="内容" path="body">
              <n-input
                type="textarea"
                v-model:value="formValue.body"
                placeholder="内容"
              />
            </n-form-item>
            <n-form-item label="sound" path="sound">
              <n-select v-model:value="formValue.sound" :options="options" />
              <!-- <n-input v-model:value="formValue.sound" placeholder="sound" /> -->
            </n-form-item>
            <n-form-item label="图标" path="icon">
              <n-input
                v-model:value="formValue.icon"
                placeholder="图标"
                clearable
              />
            </n-form-item>
            <n-form-item label="group" path="group">
              <n-input
                v-model:value="formValue.group"
                placeholder="group"
                clearable
              />
            </n-form-item>
            <n-form-item label="URL" path="url">
              <n-input
                v-model:value="formValue.url"
                placeholder="url"
                clearable
              />
              <n-button attr-type="button" @click="UrlEncode">URL编码</n-button>
            </n-form-item>
            <n-form-item>
              <n-button
                attr-type="button"
                type="primary"
                @click="handleValidateClick"
                style="margin: 0 auto; width: 100%"
              >
                推送
              </n-button>
            </n-form-item>
          </n-form>
        </n-card>
      </div>
    </n-grid-item>
    <n-grid-item>
      <n-card title="实时参数" hoverable class="pre">
        <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { FormInst, useMessage } from "naive-ui";
import { useBarkPushStore } from "@/pinia/barkpush";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  NCard,
  NSpace,
  NGridItem,
  NGrid,
} from "naive-ui";
import axios from "@/axios/index";
const formRef = ref<FormInst | null>(null);
const barkpushStore = useBarkPushStore()
const formValue = ref({
  // api: '',
  title: "",
  body: "",
  device_key: "",
  sound: "healthnotification.caf",
  icon: "https://day.app/assets/images/avatar.jpg",
  group: "",
  url: "",
});
const rules = {
  api: {
    required: true,
    message: "请输入api",
    trigger: ["input", "blur"],
  },
  title: {
    required: false,
    message: "any text",
    trigger: ["input", "blur"],
  },
  body: {
    required: true,
    message: "body text",
    trigger: ["input", "blur"],
  },
  device_key: {
    required: true,
    message: "请输入device_key",
    trigger: ["input", "blur"],
  },
  sound: {
    required: false,
    message: "请输入sound",
    trigger: ["input"],
  },
  icon: {
    required: false,
    message: "请输入icon",
    trigger: ["input"],
  },
  group: {
    required: false,
    message: "请输入group",
    trigger: ["input"],
  },
  url: {
    required: false,
    message: "请输入url",
    trigger: ["input"],
  },
};
const options = [
  {
    label: "无",
    value: "",
  },
  {
    label: "alarm.caf",
    value: "alarm.caf",
  },
  {
    label: "healthnotification.caf",
    value: "healthnotification.caf",
  },
  {
    label: "anticipate.caf",
    value: "anticipate.caf",
  },
  {
    label: "bell.caf",
    value: "bell.caf",
  },
  {
    label: "bloom.caf",
    value: "bloom.caf",
  },
  {
    label: "calypso.caf ",
    value: "calypso.caf ",
  },
  {
    label: "birdsong.caf ",
    value: "birdsong.caf ",
  },
  {
    label: "newmail.caf ",
    value: "newmail.caf ",
  },
];
const handleValidateClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // let pushUrl = `${_this.formValue.api}?title=${_this.formValue.title}&body=${_this.formValue.body}&icon=${_this.formValue.icon}&sound=${_this.formValue.sound}&url=${_this.formValue.url}&group=${_this.formValue.group}`;
      /* 调用接口 */
      axios.post("/api", formValue.value)
        .then((res) => {
          console.log("结果", res);
          window.$message.success("推送成功");
          barkpushStore.updateAPI(formValue.value)
        })
        .catch((err) => {
          console.log("err", err.data);
          window.$message.error("推送失败，请检查bark日志");
        });
      window.$message.success("Valid");
    } else {
      // console.log(JSON.stringify(formValue.value));
      console.log(errors)
      window.$message.error("Invalid");
    }
  });
};
const UrlEncode = async () => {
  formValue.value.url = encodeURIComponent(formValue.value.url);
};
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  // formValue.value = barkpushStore.$state.formValue
  let list = localStorage.getItem("BarkPush_config")
  if(list){
    formValue.value = barkpushStore.$state.formValue

  }else{
    console.log('本地无内容:',list)
  }
});      
</script>
<style scoped>
.n-card{
  min-height: 810px;
}
//移动端不显示 pre
@media (max-width: 480px){ 
  .pre{
    display: none;
  }
 }
</style>
