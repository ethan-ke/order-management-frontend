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
        Set Password
      </h2>

      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600">New Password</label>
        <input
            v-model="postForm.password"
            type="password"
            required
            placeholder="Please enter password"
            @input="handlePasswordInput"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <div class="pt-2">
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ loading ? 'Saving...' : 'Confirm' }}</span>
        </button>
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setPassword } from '../../api/user'

const router = useRouter()
const loading = ref(false)
const toastMsg = ref('')
const toastType = ref('error')

const postForm = ref({
  password: ''
})

const showToast = (msg, type = 'error') => {
  toastMsg.value = msg
  toastType.value = type
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

// 实时过滤空格
const handlePasswordInput = (e) => {
  if (e.target.value) {
    postForm.value.password = e.target.value.replace(/\s+/g, '')
  }
}

const onSubmit = async () => {
  if (loading.value) return
  if (!postForm.value.password) {
    showToast('Please enter password!')
    return
  }

  loading.value = true
  try {
    await setPassword(postForm.value)
    showToast('Success', 'success')
    setTimeout(() => {
      router.push({ name: 'User' })
    }, 1000)
  } catch (err) {
    console.error(err)
    showToast('Failed to set password, please try again.')
  } finally {
    loading.value = false
  }
}
</script>