<!-- <template>
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
    width: 100,
    height: 100,
    // scale: 1,                 // 3x scaling factor
    // height: ,                // Bar height, in millimeters
    // includetext: true,        // Show human-readable text
    textxalign: 'center',     // Always good to set this
    backgroundcolor: 'FFFFFF' // Set background color to white
  }, (err) => {
    if (err) {
      console.error(err)
      alert('生成条码失败')
    }
  }
)
}
</script>

<style scoped>
.component-data-matrix-generator {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 28px;
}
#barcode-canvas {
  margin-top: 20px;
  width: 100%;
  max-width: 40svw; /* Set max-width to 300px to make it square */
  height: 50svh;
  height: auto;
}
</style> -->

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
    scale: 5,                 // Scaling factor
    includetext: false,       // Hide human-readable text
    textxalign: 'center',     // Align text to center
    backgroundcolor: 'FFFFFF' // Set background color to white
  }, (err) => {
    if (err) {
      console.error(err)
      alert('生成 DataMatrix 條碼失敗')
    }
  })
}
</script>

<style scoped>
.component-data-matrix-generator {
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50svh;
  width: 50svw;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
#barcode-canvas {
  width: 100%;
  max-width: 400px; /* Make canvas square */
  height: auto;
}
</style>
