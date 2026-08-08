<template>
  <!-- 动态绑定 pb-20，为底部 navigation 留足安全高度 -->
  <div
      class="min-h-screen bg-slate-100 text-slate-900 transition-all selection:bg-teal-500 selection:text-white"
      :class="{ 'pb-20': route.meta.showTabbar }"
  >
    <!-- 1. 主路由视图 -->
    <router-view />

    <!-- 2. WhatsApp 风格底部导航栏 -->
    <nav
        v-if="route.meta.showTabbar"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-3 py-1.5 flex justify-around items-center shadow-lg select-none"
    >
      <router-link
          v-for="item in navList"
          :key="item.path"
          :to="item.path"
          class="group flex flex-col items-center justify-center w-full py-1 transition-all duration-200"
      >
        <!-- WhatsApp 标志性的圆角胶囊背景 (Pill Indicator) -->
        <div
            class="px-5 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center mb-0.5"
            :class="route.path === item.path
            ? 'bg-emerald-100 text-emerald-700 shadow-sm'
            : 'text-slate-500 group-active:scale-95 group-active:bg-slate-100'"
        >
          <component
              :is="item.icon"
              class="w-6 h-6 transition-transform duration-200"
              :class="route.path === item.path ? 'scale-105' : 'opacity-80'"
          />
        </div>

        <!-- 扎实的字重与高对比度文字 -->
        <span
            class="text-[11px] tracking-tight transition-all duration-200"
            :class="route.path === item.path ? 'font-bold text-emerald-800' : 'font-medium text-slate-500'"
        >
          {{ item.name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { h } from 'vue'

const route = useRoute()

// WhatsApp 风格：线条更粗、造型更扎实的实效 SVG 图标 (Stroke Width: 2.2)
const IconOrders = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2.2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })
])

const IconSubmit = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2.2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 4v16m8-8H4' })
])

const IconSearch = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2.2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' })
])

const IconUser = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2.2 }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' })
])

const navList = [
  { name: 'Orders', path: '/', icon: IconOrders },
  { name: 'Submit', path: '/submit', icon: IconSubmit },
  { name: 'Search', path: '/search', icon: IconSearch },
  { name: 'Me', path: '/user', icon: IconUser }
]
</script>