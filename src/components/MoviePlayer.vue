<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hls from "hls.js";

const videoPlayer = ref(null);
const src = "https://vip.opstream16.com/20230114/29216_3fdf8707/index.m3u8";

onMounted(() => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoPlayer.value.play();
    });
  } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {
    videoPlayer.value.src = src;
    videoPlayer.value.addEventListener("loadedmetadata", () => {
      videoPlayer.value.play();
    });
  }
});
</script>

<template>
  <div>
    <video ref="videoPlayer" controls class="video-player"></video>
  </div>
</template>

<style>
.video-player {
  width: 100%;
  max-width: 800px;
  border: 1px solid #ccc;
}
</style>
