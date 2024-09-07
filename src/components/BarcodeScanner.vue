<template>
  <div id="barcode-reader" class="component-barcode-reader"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHtml5QrCode } from '../hooks/html5-qr-code'
import { toast } from 'vue3-toastify'; // 引用
import 'vue3-toastify/dist/index.css'; // 官方

const html5QrCode = ref(null)

onMounted(() => {
  html5QrCode.value = useHtml5QrCode('barcode-reader')
  html5QrCode.value.start(qrCodeSuccessCallback, qrCodeErrorCallback)
})

onUnmounted(() => {
  if (html5QrCode.value) {
    html5QrCode.value.handleStop()
  }
})

const qrCodeSuccessCallback = (decodedText) => {
  notify(decodedText)
}

const qrCodeErrorCallback = (error) => {
  console.error('QR code parse error:', error)
}

const notify = (decodedText) => {
  const confirm = window.confirm(`確認造訪景點${decodedText}`)
  if (confirm) {
    toast.success(`造訪景點${decodedText}`)
  } else {
    toast.error(`取消造訪景點${decodedText}`)
  }

  // toast(`扫描成功：${decodedText}`, {
  //   autoClose: 2500,
  // }); // ToastOptions
}
</script>

<style scoped>
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
