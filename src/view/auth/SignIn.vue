<template>
  <div class="relative min-h-screen flex items-center justify-center bg-slate-100 overflow-hidden p-5">
    <!-- 1. 背景渐变光晕艺术元素 -->
    <div class="absolute w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-60 -top-16 -left-16 pointer-events-none"></div>
    <div class="absolute w-80 h-80 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full blur-3xl opacity-60 -bottom-20 -right-16 pointer-events-none"></div>

    <!-- 2. 现代毛玻璃登录卡片 -->
    <div class="relative z-10 w-full max-w-sm bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-white/60">

      <!-- 头部 Logo 与欢迎词 -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
          <!-- User Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight mb-1">Welcome Back</h2>
        <p class="text-xs text-gray-400">Please sign in to continue</p>
      </div>

      <!-- 表单区域 -->
      <form @submit.prevent="handleSignIn" class="space-y-4">
        <!-- 用户名输入框 -->
        <div class="relative flex items-center bg-gray-50/80 rounded-2xl border border-transparent focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
              v-model="postForm.username"
              type="text"
              placeholder="Username"
              required
              class="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <!-- 密码输入框 (支持明密文切换) -->
        <div class="relative flex items-center bg-gray-50/80 rounded-2xl border border-transparent focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
              v-model="postForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
              class="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <!-- 切换明密文按钮 -->
          <button
              type="button"
              @click="showPassword = !showPassword"
              class="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
          >
            <!-- 睁眼 -->
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <!-- 闭眼 -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 014.122-.963c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.385 1.385L3 3l18 18" />
            </svg>
          </button>
        </div>

        <!-- 提交按钮 -->
        <div class="pt-2">
          <button
              type="submit"
              :disabled="loading"
              class="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/35 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const postForm = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const handleSignIn = async () => {
  loading.value = true

  try {
    // 触发 Vuex Action
    await store.dispatch('user/signIn', postForm)
    // 登录成功路由跳转
    const redirectPath = route.query?.redirect || '/'
    router.push({ path: redirectPath })
  } catch (err) {
    console.error('Sign in failed:', err)
  } finally {
    loading.value = false
  }
}
</script>