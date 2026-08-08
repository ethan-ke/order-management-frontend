<template>
  <div class="space-y-3">
    <!-- 1. 上传/拍摄区域卡片 -->
    <div class="bg-white rounded-2xl p-4 shadow-sm">
      <label class="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 active:bg-blue-50 active:border-blue-400 transition-colors cursor-pointer">
        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span class="text-sm font-semibold text-gray-800">Upload / Take Face Photo</span>
        <span class="text-xs text-gray-400 mt-1">Tap here to select photo or use camera</span>

        <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            class="hidden"
            @change="handleFileChange"
        />
      </label>
    </div>

    <!-- 2. 加载中状态 -->
    <div v-if="loading" class="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-gray-500">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <span class="text-sm">Compressing & Matching face data...</span>
    </div>

    <!-- 3. 双列卡片式匹配结果 -->
    <div v-else-if="faceItems.length > 0" class="space-y-2">
      <div class="flex items-center justify-between px-1">
        <h4 class="text-xs font-bold text-gray-500">
          Matching Results ({{ faceItems.length }})
        </h4>
        <span class="text-[10px] text-gray-400">Tap photo to enlarge</span>
      </div>

      <!-- 网格容器：一行2列 -->
      <div class="grid grid-cols-2 gap-3">
        <div
            v-for="(item, index) in faceItems"
            :key="index"
            class="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group"
        >
          <!-- 点击传索引 index，方便后续左右切图 -->
          <div
              class="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 cursor-pointer group"
              @click="openPreview(index)"
          >
            <img
                :src="item.image"
                alt="Face result"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>

            <div
                class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-black shadow-sm backdrop-blur-md"
                :class="getScoreBadgeStyle(item.score)"
            >
              {{ item.score }}%
            </div>
          </div>

          <div class="mt-2.5 px-0.5 space-y-1">
            <div class="flex justify-between items-center text-[11px] text-gray-500 font-medium">
              <span>Similarity</span>
              <span class="font-bold text-gray-700">{{ item.score }}%</span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                  class="h-full transition-all duration-300 rounded-full"
                  :class="getProgressBarColor(item.score)"
                  :style="{ width: `${item.score}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 未找到结果提示 -->
    <div v-else-if="uploaded && faceItems.length === 0" class="bg-white rounded-2xl p-8 shadow-sm text-center text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-sm">No face matches found</p>
    </div>

    <!-- 💡 5. 全屏预览 Modal（独立顶部控制栏 + 支持左右滑动切换） -->
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
      <div
          v-if="previewIndex !== null"
          class="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl select-none"
          style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom));"
          @click="closePreview"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
      >
        <!-- 顶部独立黑底控制栏 -->
        <div class="w-full h-14 px-4 flex items-center justify-between text-white border-b border-white/10 shrink-0 bg-black/80" @click.stop>
          <div class="flex items-center space-x-2">
            <span class="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
              {{ previewIndex + 1 }} / {{ faceItems.length }}
            </span>
            <span class="text-xs text-gray-400 font-medium hidden sm:inline">Use ← → or swipe to switch</span>
          </div>

          <button
              @click="closePreview"
              class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 图片展示区：高度进一步收紧至 max-h-[62vh]，留足安全距离 -->
        <div class="flex-1 relative flex items-center justify-center p-4 min-h-0 overflow-hidden">

          <!-- 上一张按钮 -->
          <button
              v-if="faceItems.length > 1"
              @click.stop="prevImage"
              class="absolute left-2 z-10 text-white bg-black/50 hover:bg-black/80 border border-white/20 p-2.5 rounded-full backdrop-blur-sm transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- 主图片容器 -->
          <div class="relative max-w-full max-h-full flex flex-col items-center justify-center" @click.stop>
            <img
                :src="currentItem.image"
                alt="Enlarged preview"
                class="max-w-full max-h-[62vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            <!-- 底部浮动显示的相似度分数 -->
            <div class="mt-3 px-3.5 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-white text-xs font-bold shadow-lg">
              Similarity: <span :class="getScoreTextColor(currentItem.score)">{{ currentItem.score }}%</span>
            </div>
          </div>

          <!-- 下一张按钮 -->
          <button
              v-if="faceItems.length > 1"
              @click.stop="nextImage"
              class="absolute right-2 z-10 text-white bg-black/50 hover:bg-black/80 border border-white/20 p-2.5 rounded-full backdrop-blur-sm transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Compressor from 'compressorjs'
import { SearchCustomerPhoto } from '@/api/customer'

const faceItems = ref([])
const loading = ref(false)
const uploaded = ref(false)

// 当前预览的图片索引 (null 表示不弹窗)
const previewIndex = ref(null)

// 触屏滑动开始坐标
const touchStartX = ref(0)

// 当前选中的图片对象
const currentItem = computed(() => {
  if (previewIndex.value === null || !faceItems.value[previewIndex.value]) return {}
  return faceItems.value[previewIndex.value]
})

// 打开预览
const openPreview = (index) => {
  previewIndex.value = index
}

// 关闭预览
const closePreview = () => {
  previewIndex.value = null
}

// 切换下一张
const nextImage = () => {
  if (previewIndex.value === null) return
  if (previewIndex.value < faceItems.value.length - 1) {
    previewIndex.value++
  } else {
    previewIndex.value = 0 // 循环到第一张
  }
}

// 切换上一张
const prevImage = () => {
  if (previewIndex.value === null) return
  if (previewIndex.value > 0) {
    previewIndex.value--
  } else {
    previewIndex.value = faceItems.value.length - 1 // 循环到最后一张
  }
}

// 📱 监听手势滑动（Touch events）
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const diffX = touchEndX - touchStartX.value

  // 滑动距离大于 50px 才触发切图
  if (diffX > 50) {
    prevImage() // 右划 -> 上一张
  } else if (diffX < -50) {
    nextImage() // 左划 -> 下一张
  }
}

// ⌨️ 键盘按键支持 (Esc关闭，左右键切图)
const handleKeyDown = (e) => {
  if (previewIndex.value === null) return
  if (e.key === 'Escape') closePreview()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const compressFile = (rawFile) => {
  return new Promise((resolve, reject) => {
    new Compressor(rawFile, {
      quality: 0.7,
      maxWidth: 1920,
      maxHeight: 1920,
      convertSize: 1000000,
      success: resolve,
      error: reject
    })
  })
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  loading.value = true
  uploaded.value = true

  try {
    const compressedBlob = await compressFile(file)

    const formData = new FormData()
    formData.append('image', compressedBlob, file.name || 'face.jpg')

    const res = await SearchCustomerPhoto(formData)
    faceItems.value = res.data || []
  } catch (err) {
    console.error('File search error:', err)
    faceItems.value = []
  } finally {
    loading.value = false
    event.target.value = ''
  }
}

const getScoreBadgeStyle = (score) => {
  if (score >= 80) return 'bg-rose-500/90 text-white'
  if (score >= 60) return 'bg-amber-500/90 text-white'
  return 'bg-blue-500/90 text-white'
}

const getProgressBarColor = (score) => {
  if (score >= 80) return 'bg-rose-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-blue-500'
}

const getScoreTextColor = (score) => {
  if (score >= 80) return 'text-rose-400 font-black'
  if (score >= 60) return 'text-amber-400 font-black'
  return 'text-blue-400 font-black'
}
</script>