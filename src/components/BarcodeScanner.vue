<template>
  <div id="barcode-reader" class="component-barcode-reader"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHtml5QrCode } from '../hooks/html5-qr-code'

const html5QrCode = ref(null)

onMounted(() => {
  html5QrCode.value = useHtml5QrCode('barcode-reader')
  html5QrCode.value.start(qrCodeSuccessCallback)
})

onUnmounted(() => {
  if (html5QrCode.value) {
    html5QrCode.value.handleStop()
  }
})

const qrCodeSuccessCallback = (decodedText) => {
  console.log(`扫描成功：${decodedText}`)
}
</script>

<style >
#qr-shaded-region {
  border-width: unset !important;
  
}
.component-barcode-reader {
  display: flex;
  width: 100%;
  max-width: 640px;
  height: 400px;
  width: 400px;
  margin: 0 auto;
  background-color: #000;
}
</style>
