<template>
  <div class="app-container">
    <input v-model="text" placeholder="輸入數字" />
    <DataMatrixGenerator :text="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataMatrixGenerator from '../components/DataMatrixGenerator.vue'

const text = ref('12345')  // 預設一個數字
</script>

<style scoped>
.app-container {
  background-color: #1f1f1f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 20px;
}
input {
  margin-bottom: 20px;
  width: 90%;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}
</style>
