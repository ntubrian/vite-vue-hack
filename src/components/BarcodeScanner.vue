<template>
  <div class="container">
    <!-- 条形码扫描器容器 -->
    <div id="reader"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

import { Html5Qrcode } from 'html5-qrcode'

let cameraId = ref('')
let devicesInfo = ref<any>('')
let html5QrCode = ref<any>(null)


onMounted(() => {
  getCameras()
})

onUnmounted(() => {
  stop()
})

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      console.log('摄像头信息', devices)
      if (devices && devices.length) {
        if (devices.length > 1) {
          cameraId.value = devices[1].id
        } else {
          cameraId.value = devices[0].id
        }
        devicesInfo.value = devices
        start()
      }
    })
    .catch((err) => {
      console.log('获取设备信息失败', err)
    })
}

const start = () => {
  html5QrCode.value = new Html5Qrcode('reader')
  html5QrCode.value
    .start(
      cameraId.value,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText, decodedResult) => {
        console.log('扫描的结果', decodedText, decodedResult)
        alert(`扫描成功：${decodedText}`)
      },
      (errorMessage) => {
        console.log('暂无额扫描结果', errorMessage)
      }
    )
    .catch((err) => {
      console.log(`Unable to start scanning, error: ${err}`)
    })
}

const stop = () => {
  if (html5QrCode.value) {
    html5QrCode.value
      .stop()
      .then((ignore) => {
        console.log('QR Code scanning stopped.', ignore)
      })
      .catch((err) => {
        console.log('Unable to stop scanning.', err)
      })
  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.48);
}
#reader {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
