<template>
  <n-card title="RTMP" size="medium">
    <n-input
      size="large"
      round
      clearable
      v-model:value="rtmpUrl"
      type="textarea"
      placeholder="请输入链接"
    />
    <n-grid cols="1 s:1 m:2 l:4 xl:6 2xl:8" responsive="screen">
      <n-grid-item>
        <n-button type="info" @click="Play"> 用potplayer播放 </n-button>
      </n-grid-item>
      <n-grid-item>
        <n-button type="warning" @click="APlay"> 用Aplayer播放 </n-button>
      </n-grid-item>
      <n-grid-item>
        <n-button type="success" @click="Copy"> 复制 </n-button>
      </n-grid-item>
      <n-grid-item>
        <n-button strong secondary type="warning" @click="clearable">
          清空
        </n-button>
      </n-grid-item>
      <n-grid-item>
        <n-button type="success" secondary @click="BarkPush">
          bark推送
        </n-button>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>
<script setup lang="ts">
import {
  ref,
  Ref,
} from "vue";
import { NSpace, NCard, NButton, NGrid, NGridItem, NInput } from "naive-ui";
import useClipboard from "vue-clipboard3";
import axios from "@/axios/index";
const { toClipboard } = useClipboard();

const rtmpUrl = ref("");

const Play = async () => {
  if (rtmpUrl.value.length > 0) {
    let str = rtmpUrl.value;
    let str1 = str.replace("<playpath>", "/");
    let str2 = str1.replace("<swfUrl> <pageUrl>", "");
    rtmpUrl.value = str2;
    // console.log(rtmpUrl.value);
    window.location.href="potplayer://" + rtmpUrl.value;
    // window.open("potplayer://" + rtmpUrl.value, "_blank");
  } else {
    window.$message.error("请先输入链接");
    return false;
  }
};
const APlay = async () => {
  if (rtmpUrl.value.length > 0) {
    let str = rtmpUrl.value;
    let str1 = str.replace("<playpath>", "/");
    let str2 = str1.replace("<swfUrl> <pageUrl>", "");
    rtmpUrl.value = str2;
    // console.log(rtmpUrl.value);
    window.location.assign("alookplayer://" + rtmpUrl.value);
  } else {
    window.$message.error("请先输入链接");
    return false;
  }
};
const Copy = async () => {
  try {
    if (rtmpUrl.value.length > 0) {
      let str = rtmpUrl.value;
      let str1 = str.replace("<playpath>", "/");
      let str2 = str1.replace("<swfUrl> <pageUrl>", "");
      rtmpUrl.value = str2;
      // console.log(rtmpUrl.value);
      await toClipboard(rtmpUrl.value);
      window.$message.success("复制成功!");
    } else {
      window.$message.error("请先输入链接");
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

const clearable = async () => {
  rtmpUrl.value = "";
};
const BarkPush = async () => {
  let config = {
    title: "Bark-RTMP",
    body: rtmpUrl.value,
    device_key: "",
    url: "",
    sound: "",
    icon: "",
    group: "Bark-RTMP",
  };
  // let url ="api" + `?title=${config.title}&body=${config.body}&icon=${config.icon}&sound=${config.sound}&url=${config.url}&group=${config.group}`;
  /* 调用接口 */
  await axios
    .post('api', config)
    .then((res) => {
      console.log("结果", res);
      window.$message.success("推送成功");
    })
    .catch((err) => {
      console.log("err", err.data);
      window.$message.error("推送失败，请检查bark日志");
    });
  // let str ={
  //   title: "any text",
  //   body: "body text",
  //   sound: "minuet.caf",
  //   group: "test",
  //   }
  //     axios.post('api',str).then(res => {
  //       console.log(res);
  //     }).catch(err => {
  //       console.log(err.data);
  //     })

};
</script>
<style scoped>
.n-button {
  margin: 10px;
  width: 130px;
}
</style>
