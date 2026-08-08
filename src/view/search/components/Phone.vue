<template>
  <div class="space-y-4 select-none">

    <!-- 1. 搜索输入卡片 -->
    <div class="bg-white rounded-3xl p-2 shadow-sm border border-slate-200/60 flex items-center space-x-2">
      <!-- Phone Icon -->
      <div class="pl-3 text-slate-400">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </div>

      <!-- 原生 Input -->
      <input
          v-model="phone"
          type="tel"
          placeholder="Enter phone number..."
          class="flex-1 bg-transparent py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          @keyup.enter="handleSearch"
      />

      <!-- 清除按钮 -->
      <button
          v-if="phone"
          @click="phone = ''"
          class="text-slate-300 hover:text-slate-500 p-1 active:scale-95 transition-all"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- 💡 拍照/选图识别手机号按钮 -->
      <label
          class="text-slate-400 hover:text-emerald-600 active:scale-95 transition-all p-1 cursor-pointer relative flex items-center justify-center"
          title="Scan phone number from photo"
      >
        <!-- 识别中 Loading 圈 -->
        <span v-if="ocrLoading" class="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>

        <!-- 相机 Icon -->
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        <!-- 隐藏的 File Input -->
        <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            class="hidden"
            :disabled="ocrLoading"
            @change="handleOcrScan"
        />
      </label>

      <!-- 搜索按钮 -->
      <button
          @click="handleSearch"
          :disabled="loading || ocrLoading"
          class="bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs px-5 py-2.5 rounded-2xl shadow-sm transition-all flex items-center space-x-1.5 flex-shrink-0"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ loading ? 'Searching...' : 'Search' }}</span>
      </button>
    </div>

    <!-- 2. 查询结果面板 -->
    <div>
      <!-- 搜到结果：展示风控卡片 -->
      <div v-if="customer && customer.phone" class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 space-y-4">
        <div class="flex items-center space-x-3.5">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold text-lg border border-emerald-100">
            {{ (customer.name || 'U').charAt(0).toUpperCase() }}
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-slate-800 truncate">{{ customer.name || 'Unknown' }}</h3>
            <p class="text-xs text-slate-400 font-mono mt-0.5">{{ customer.phone }}</p>
          </div>

          <span
              class="px-3 py-1 rounded-full text-xs font-bold"
              :class="customer.status === 1
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'"
          >
            {{ statusText }}
          </span>
        </div>

        <div class="border-t border-slate-100"></div>

        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-400 font-medium">Customer Risk Level</span>
          <span
              class="font-bold px-2.5 py-1 rounded-lg"
              :class="customer.status === 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'"
          >
            {{ customer.status === 0 ? '⚠️ High Risk (Bad)' : '✅ Normal Customer' }}
          </span>
        </div>
      </div>

      <!-- 未搜到结果：Empty 占位图 -->
      <div v-else-if="searched && !customer" class="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 text-center space-y-2">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-700">No customer records found</p>
        <p class="text-xs text-slate-400">Please double check the phone number and try again</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Compressor from 'compressorjs'
import { fetchCustomers, scanPhoneOcr } from '@/api/customer' // 引入 OCR 接口 API

const phone = ref('')
const customer = ref(null)
const loading = ref(false)
const ocrLoading = ref(false)
const searched = ref(false)

// 压缩图片
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

// 📸 拍照/选择图片并通过后台进行 OCR 识别
const handleOcrScan = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  ocrLoading.value = true

  try {
    // 1. 压缩图片
    const compressedBlob = await compressFile(file)

    // 2. 构造 FormData
    const formData = new FormData()
    formData.append('image', compressedBlob, file.name || 'ocr.jpg')

    // 3. 请求后端 OCR 识别接口
    const res = await scanPhoneOcr(formData)

    // 假定后端返回的结构为 { code: 200, data: { phone: '13800138000' } }
    if (res && res.data && res.data.phone) {
      phone.value = res.data.phone
      // 💡 提取成功后自动触发搜索，极大地提高效率
      handleSearch()
    } else {
      alert('No phone number detected in image.')
    }
  } catch (err) {
    console.error('OCR Recognition failed:', err)
    alert('OCR failed, please input manually.')
  } finally {
    ocrLoading.value = false
    event.target.value = '' // 重置 input 文件域
  }
}

const handleSearch = async () => {
  const cleanPhone = phone.value.replace(/\s*/g, '')
  if (!cleanPhone) return

  loading.value = true
  searched.value = true

  try {
    const res = await fetchCustomers({ phone: cleanPhone })
    if (!res || !res.data || res.length === 0) {
      customer.value = null
      return
    }
    customer.value = res.data
  } catch (err) {
    console.error('Phone search failed:', err)
    customer.value = null
  } finally {
    loading.value = false
  }
}

const statusText = computed(() => {
  if (!customer.value) return ''
  return customer.value.status === 1 ? 'Normal' : 'Bad'
})
</script>