<template>
  <div>
    <img
      :src="isFullscreen ? small : full"
      @click="click"
      alt
      ref="img"
      style="height:20px;cursor: pointer;"
    >
  </div>
</template>
<script>
import small from '@/assets/small.png'
import full from '@/assets/full.png'
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data() {
    return {
      isFullscreen: false,
      full,
      small
    }
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
    }
  },
  mounted() {
    // var isFullscreen =
    //   document.fullscreenEnabled ||
    //   window.fullScreen ||
    //   document.webkitIsFullScreen ||
    //   document.msFullscreenEnabled
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
