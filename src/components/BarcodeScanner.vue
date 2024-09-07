<template>
  <div id="barcode-reader" class="component-barcode-reader"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHtml5QrCode } from '../hooks/html5-qr-code'
import { toast } from 'vue3-toastify'; 
import 'vue3-toastify/dist/index.css'; 

const html5QrCode = ref(null)
const isProcessing = ref(false) // 添加标志

onMounted(() => {
  html5QrCode.value = useHtml5QrCode('barcode-reader')
  startScanner()
})

onUnmounted(() => {
  if (html5QrCode.value) {
    html5QrCode.value.handleStop()
  }
})

const startScanner = () => {
  html5QrCode.value.start(qrCodeSuccessCallback, qrCodeErrorCallback)
}

const qrCodeSuccessCallback = (decodedText) => {
  if (!isProcessing.value) {
    isProcessing.value = true
    notify(decodedText)
  }
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
  isProcessing.value = false // 重置 mark
  restartScanner() // 重新啟動
}

const restartScanner = () => {
  html5QrCode.value.handleStop()
  setTimeout(() => {
    startScanner()
  }, 1000) // 延遲1秒重新啟動掃描器
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
