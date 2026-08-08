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
        Report Customer Number
      </h2>

      <!-- Name -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600">Name</label>
        <input
            v-model="postForm.name"
            type="text"
            required
            placeholder="e.g. Bad Customer"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <!-- Number (含区号检测) -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-slate-600">Number</label>
          <span class="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Must include country code</span>
        </div>
        <input
            v-model="postForm.phone"
            type="tel"
            required
            placeholder="e.g. +966501234567"
            @input="handlePhoneInput"
            @paste="handlePhonePaste"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <!-- Status (代替 van-radio-group) -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600 block">Status</label>
        <div class="grid grid-cols-2 gap-3">
          <button
              type="button"
              @click="postForm.status = 0"
              class="py-3 px-4 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center space-x-2"
              :class="postForm.status === 0 ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm' : 'bg-slate-50 border-slate-200/80 text-slate-500'"
          >
            <span>🚫 Bad</span>
          </button>

          <button
              type="button"
              @click="postForm.status = 1"
              class="py-3 px-4 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center space-x-2"
              :class="postForm.status === 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-slate-50 border-slate-200/80 text-slate-500'"
          >
            <span>✅ Normal</span>
          </button>
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
import { reportCustomersNumber } from '../../api/upload'

const router = useRouter()
const loading = ref(false)
const toastMsg = ref('')
const toastType = ref('error')

const postForm = ref({
  name: '',
  phone: '',
  status: 0
})

const showToast = (msg, type = 'error') => {
  toastMsg.value = msg
  toastType.value = type
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

// 实时清理电话号码格式（只保留 '+' 和 数字）
const cleanPhoneNumber = (val) => {
  if (!val) return ''
  let cleaned = val.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  if (cleaned.indexOf('+') > 0) {
    cleaned = cleaned.replace(/\+/g, '')
  }
  return cleaned
}

const handlePhoneInput = (e) => {
  postForm.value.phone = cleanPhoneNumber(e.target.value)
}

const handlePhonePaste = (e) => {
  e.preventDefault()
  const clipboardData = e.clipboardData || window.clipboardData
  const pastedText = clipboardData.getData('text') || ''
  postForm.value.phone = cleanPhoneNumber(pastedText)
}

const onSubmit = async () => {
  if (loading.value) return

  if (!postForm.value.name) {
    showToast('Please enter name!')
    return
  }

  // 国际区号校验正则（如 +966501234567）
  const internationalPhoneReg = /^\+\d{8,15}$/
  if (!postForm.value.phone || !internationalPhoneReg.test(postForm.value.phone)) {
    showToast('Number must include country code (e.g. +966501234567)')
    return
  }

  loading.value = true
  try {
    await reportCustomersNumber(postForm.value)
    showToast('Success', 'success')
    setTimeout(() => {
      router.push({ name: 'User' })
    }, 1000)
  } catch (err) {
    console.error(err)
    showToast('Submission failed, please try again.')
  } finally {
    loading.value = false
  }
}
</script>