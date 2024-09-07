<script setup>
import { ref, onMounted } from 'vue'

const isAuthorized = ref(false)
const isScanning = ref(false)
const scanResult = ref(null)
const parsedInfo = ref(null)
const video = ref(null)

const requestAuthorization = async () => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.BarcodeDetector) {
      throw new Error('您的设备不支持条形码检测 API。请尝试在 Chrome 桌面版或 Android 上使用。')
    }
    await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    isAuthorized.value = true
  } catch (error) {
    console.error('授权失败:', error)
    alert(error.message)
  }
}

const startScanning = async () => {
  if (!isAuthorized.value) {
    console.error('未授权')
    return
  }
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    video.value.srcObject = stream
    await video.value.play()
    isScanning.value = true
    scanResult.value = null
    parsedInfo.value = null

    const barcodeDetector = new BarcodeDetector({ formats: ['data_matrix'] })

    const canvas = document.createElement('canvas')
    canvas.width = video.value.videoWidth
    canvas.height = video.value.videoHeight
    const context = canvas.getContext('2d')

    const checkForDataMatrix = async () => {
      if (!isScanning.value) return

      context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
      const barcodes = await barcodeDetector.detect(canvas)
      
      if (barcodes.length > 0) {
        scanResult.value = barcodes[0].rawValue
        parseDataMatrix(scanResult.value)
        stopScanning()
      } else {
        requestAnimationFrame(checkForDataMatrix)
      }
    }

    checkForDataMatrix()
  } catch (error) {
    console.error('扫描失败:', error)
    alert('扫描失败: ' + error.message)
  }
}

const stopScanning = () => {
  isScanning.value = false
  if (video.value && video.value.srcObject) {
    video.value.srcObject.getTracks().forEach(track => track.stop())
  }
}

const parseDataMatrix = (data) => {
  try {
    const parts = data.split('|')
    if (parts.length < 3) {
      throw new Error('数据格式不正确')
    }
    const parsedData = {
      id: parts[0],
      name: parts[1],
      date: parts[2],
      // 添加更多字段
    }
    parsedInfo.value = parsedData

    // 使用 alert 显示解析后的数据
    const alertMessage = `
      解析成功:
      ID: ${parsedData.id}
      名称: ${parsedData.name}
      日期: ${parsedData.date}
    `
    alert(alertMessage)

  } catch (error) {
    console.error('解析数据矩阵失败:', error)
    parsedInfo.value = { error: '无法解析数据矩阵' }
    alert('解析数据矩阵失败: ' + error.message)
  }
}

onMounted(() => {
  video.value = document.getElementById('data-matrix-video')
  video.value.width = 400 // 设置默认宽度
  video.value.height = 400 // 设置默认高度
  video.value.style['object-fit'] = 'cover'
})
</script>

<template>
  <div>
    <button @click="requestAuthorization" :disabled="isAuthorized">
      {{ isAuthorized ? '已授权' : '请求授权' }}
    </button>
    <button @click="startScanning" :disabled="!isAuthorized || isScanning">
      开始扫描
    </button>
    <button @click="stopScanning" :disabled="!isScanning">
      停止扫描
    </button>
    <div v-if="scanResult">
      <h3>扫描结果:</h3>
      <p>{{ scanResult }}</p>
    </div>
    <div v-if="parsedInfo">
      <h3>解析信息:</h3>
      <p>ID: {{ parsedInfo.id }}</p>
      <p>名称: {{ parsedInfo.name }}</p>
      <p>日期: {{ parsedInfo.date }}</p>
      <!-- 添加更多字段显示 -->
    </div>
    <video 
    id="data-matrix-video" 
  style="width: 400px; height: 400px; object-fit: cover !important; display: block; margin-top: 20px;"
  :style="{ display: isScanning ? 'block' : 'none' }"
    ></video>
  </div>
</template>
