<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360"></video>
    <button @click="player.play()">Play</button>
  </div>
</template>

<script lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  name: "M3U8Player",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.initPlayer();
  },
  watch: {
    src(newSrc) {
      if (this.player) {
        this.player.pause(); // Stop current playback
        this.player.src({ src: newSrc, type: "application/x-mpegURL" });
        this.player.load(); // Ensure the new source is loaded

        // Listen for "canplay" event before attempting playback
        this.player.one("canplay", () => {
          this.player.play().catch((error) => {
            console.warn("Autoplay prevented:", error);
          });
        });
      }
    },
  },
  methods: {
    initPlayer() {
      this.player = videojs(this.$refs.videoPlayer, {
        controls: true,
        autoplay: false,
        fluid: true,
        responsive: true,
        sources: [
          {
            src: this.src,
            type: "application/x-mpegURL",
          },
        ],
      });
    },
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
.video-js {
  max-width: 100%;
  height: auto;
}
</style>
