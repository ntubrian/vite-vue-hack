<template>
  <div class="component-data-matrix-generator">
    <canvas id="barcode-canvas" ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import bwipjs from 'bwip-js'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const canvas = ref(null)

watch(() => props.text, (newText) => {
  if (newText) {
    generateBarcode(newText)
  }
})

const generateBarcode = (text) => {
  bwipjs.toCanvas(canvas.value, {
    bcid: 'datamatrix',       // Barcode type
    text: text,               // Text to encode
    scale: 10,                 // 3x scaling factor
    // height: 3,                // Bar height, in millimeters
    includetext: true,        // Show human-readable text
    textxalign: 'center',     // Always good to set this
    backgroundcolor: 'FFFFFF' // Set background color to white
  }, (err) => {
    if (err) {
      console.error(err)
      alert('生成条码失败')
    }
  })
}
</script>

<style scoped>
.component-data-matrix-generator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100svw;
}
#barcode-canvas {
  margin-top: 20px;
  width: 100%;
  max-width: 40svw; /* Set max-width to 300px to make it square */
  height: 50svh;
  height: auto;
}
</style>
