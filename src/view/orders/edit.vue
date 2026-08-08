<template>
  <div class="min-h-screen bg-slate-100/80 p-4 space-y-3">
    <!-- 顶部 Back 按钮 -->
    <div class="flex items-center justify-between py-1">
      <button
          @click="$router.back()"
          class="flex items-center space-x-1 text-slate-500 font-medium text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm active:scale-95 transition-all"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
      </button>
      <span class="text-xs font-bold text-slate-400">Edit Order</span>
    </div>

    <!-- 编辑表单 -->
    <OrderForm :is-edit="true" />
  </div>
</template>

<script setup>
import OrderForm from '../components/OrderForm.vue'
</script>