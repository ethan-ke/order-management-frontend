<template>
  <div class="min-h-[calc(100vh-80px)] bg-slate-100/80 flex flex-col select-none">

    <!-- 1. 独立悬浮 Segmented Control (Tab Switcher) -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 shadow-sm">
      <div class="bg-slate-100 p-1 rounded-2xl flex items-center space-x-1">
        <!-- Phone Tab -->
        <button
            @click="activeTab = 'phone'"
            class="flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5"
            :class="activeTab === 'phone'
            ? 'bg-white text-emerald-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>Phone Search</span>
        </button>

        <!-- Photo Tab -->
        <button
            @click="activeTab = 'photo'"
            class="flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5"
            :class="activeTab === 'photo'
            ? 'bg-white text-emerald-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>Photo Search</span>
        </button>
      </div>
    </div>

    <!-- 2. 内容区域 -->
    <div class="flex-1 p-4 space-y-4">
      <search-phone v-if="activeTab === 'phone'" />
      <search-photo v-if="activeTab === 'photo'" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchPhone from './components/Phone.vue'
import SearchPhoto from './components/Photo.vue'

const activeTab = ref('phone')
</script>