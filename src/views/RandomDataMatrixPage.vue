<template>
  <div>
    <!-- <button @click="generateRandomText">生成随机 DataMatrix</button> -->
    <input v-model="text" placeholder="輸入數字" />
    <DataMatrixGenerator :text="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataMatrixGenerator from '../components/DataMatrixGenerator.vue'

const text = ref('')

const generateRandomText = () => {
  const randomText = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  text.value = randomText.substring(0, 300) // 确保长度在 1 到 300 之间
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
input {
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
}
</style>
