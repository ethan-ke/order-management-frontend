<template>
  <div class="min-h-screen bg-slate-100/80 p-4 space-y-4 select-none relative">

    <!-- Toast 浮层提示 -->
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
          v-if="toastMsg"
          class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center space-x-2 border border-slate-700/50"
      >
        <span :class="toastType === 'success' ? 'text-emerald-400' : 'text-amber-400'">
          {{ toastType === 'success' ? '✅' : '⚠️' }}
        </span>
        <span>{{ toastMsg }}</span>
      </div>
    </Transition>

    <!-- 顶部 Back 返回栏 -->
    <div class="flex items-center justify-between py-1">
      <button
          @click="router.back()"
          class="flex items-center space-x-1 text-slate-500 font-medium text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm active:scale-95 transition-all"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
      </button>
      <span class="text-xs font-bold text-slate-400">User Center</span>
    </div>

    <!-- 表单卡片 -->
    <form @submit.prevent="onSubmit" class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 space-y-4">
      <h2 class="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3">
        Report Bad Customers
      </h2>

      <!-- 图片上传区 -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600 block">Picture</label>

        <div class="flex items-center space-x-3">
          <!-- 已选择图片预览 -->
          <div v-if="previewUrl" class="relative w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 group">
            <img :src="previewUrl" class="w-full h-full object-cover" />
            <button
                type="button"
                @click="removeImage"
                class="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-rose-600 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- 上传入口：不带 capture 属性，允许选择相册或拍摄 -->
          <label
              v-else
              class="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/80 active:scale-98 transition-all"
          >
            <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="text-[11px] text-slate-400 mt-1 font-medium">Upload Image</span>
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                class="hidden"
                @change="handleFileChange"
            />
          </label>
        </div>
      </div>

      <div class="pt-2">
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ loading ? 'Submitting...' : 'Submit' }}</span>
        </button>
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Compressor from 'compressorjs'
import { reportBadCustomers } from '@/api/upload' // 确保你的 API 方法路径正确

const router = useRouter()
const loading = ref(false)

const previewUrl = ref('')       // 本地用于 <img> 预览的 Blob URL
const selectedBlob = ref(null)   // 压缩后的图像 Blob 对象
const rawFileName = ref('')      // 选中的原始文件名

const toastMsg = ref('')
const toastType = ref('error')

const showToast = (msg, type = 'error') => {
  toastMsg.value = msg
  toastType.value = type
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

// 图片压缩，直接返回 Blob
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

// 处理图片选择
const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    rawFileName.value = file.name
    // 1. 压缩为 Blob
    const compressedBlob = await compressFile(file)
    selectedBlob.value = compressedBlob

    // 2. 生成本地预览地址
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value) // 释放上一次的内存占用
    }
    previewUrl.value = URL.createObjectURL(compressedBlob)
  } catch (err) {
    console.error('Image compression failed:', err)
    showToast('Failed to process image!')
  }
}

const removeImage = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = ''
  selectedBlob.value = null
  rawFileName.value = ''
}

const onSubmit = async () => {
  if (loading.value) return
  if (!selectedBlob.value) {
    showToast('Please upload picture!')
    return
  }

  loading.value = true

  try {
    // 💡 构造 FormData 文件上传
    const formData = new FormData()
    // 参数 key 必须为 'image'，保持与后端 $request->validate(['image' => ...]) 一致
    formData.append('image', selectedBlob.value, rawFileName.value || 'report.jpg')

    await reportBadCustomers(formData)

    showToast('Success', 'success')
    setTimeout(() => {
      router.push({ name: 'User' })
    }, 1000)
  } catch (err) {
    console.error('Report submission error:', err)

    // 提取接口返回的验证错误
    const errRes = err?.response?.data || err?.data
    if (errRes?.errors?.image?.[0]) {
      showToast(errRes.errors.image[0])
    } else if (errRes?.message) {
      showToast(errRes.message)
    } else {
      showToast('Timeout, please try again!')
    }
  } finally {
    loading.value = false
  }
}
</script>