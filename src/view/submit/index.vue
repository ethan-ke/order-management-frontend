<template>
  <div class="min-h-screen bg-slate-100/80 p-4">
    <!-- 纯新建模式 -->
    <OrderForm :is-edit="false" />
  </div>
</template>

<script setup>
import OrderForm from '../components/OrderForm.vue'
</script>