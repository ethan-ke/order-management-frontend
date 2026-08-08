<template>
  <div class="min-h-screen bg-slate-100/80 px-4 py-6 space-y-5 select-none">

    <!-- 1. 顶部用户信息卡片 -->
    <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 flex items-center space-x-4">
      <!-- 拟人上班族喝咖啡头像 (SVG) -->
      <div class="relative w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 shadow-inner">
        <svg class="w-12 h-12 text-teal-600" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 头发 & 脸部 -->
          <path d="M46 28C46 18.0589 39.732 10 32 10C24.268 10 18 18.0589 18 28C18 31.5 19 36 21 39L32 50L43 39C45 36 46 31.5 46 28Z" fill="#334155"/>
          <circle cx="32" cy="28" r="12" fill="#FED7AA"/>
          <!-- 眼镜 & 腮红 -->
          <circle cx="28" cy="27" r="2.5" fill="#0F172A"/>
          <circle cx="36" cy="27" r="2.5" fill="#0F172A"/>
          <path d="M26 27H38" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M29 32C30.5 33.5 33.5 33.5 35 32" stroke="#EA580C" stroke-width="1.5" stroke-linecap="round"/>
          <!-- 身体/衬衫 -->
          <path d="M16 54C16 46 23 42 32 42C41 42 48 46 48 54V58H16V54Z" fill="#0D9488"/>
          <!-- 咖啡杯 -->
          <rect x="36" y="42" width="10" height="12" rx="2" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>
          <path d="M46 45H48C49.1046 45 50 45.8954 50 47V49C50 50.1046 49.1046 51 48 51H46" stroke="#94A3B8" stroke-width="1.5"/>
          <path d="M40 38C40 38 41 36.5 40 35" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
      </div>

      <!-- 用户名与欢迎词 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <h2 class="text-lg font-bold text-slate-800 truncate">{{ user.username || 'Workaholic' }}</h2>
          <span class="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">Active</span>
        </div>
        <p class="text-xs text-slate-400 mt-0.5">Keep pushing & Enjoy your coffee ☕</p>
      </div>
    </div>

    <!-- 2. 核心财务/工资看板 (Dashboard Card) -->
    <div class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-xl shadow-slate-900/10 space-y-4">
      <!-- 核心指标：今日收益 -->
      <div class="border-b border-slate-700/60 pb-4">
        <span class="text-xs font-medium text-slate-400 tracking-wide uppercase">Today's Salary</span>
        <div class="text-3xl font-extrabold text-emerald-400 mt-1 flex items-baseline space-x-1">
          <span class="text-lg font-normal">¥</span>
          <span>{{ statistics.today_income || '0.00' }}</span>
        </div>
      </div>

      <!-- 网格指标：月度与历史统计 -->
      <div class="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span class="text-slate-400 block mb-0.5">Total Month</span>
          <span class="text-sm font-semibold text-slate-100">¥ {{ statistics.total_amount || '0.00' }}</span>
        </div>
        <div>
          <span class="text-slate-400 block mb-0.5">Actual Salary</span>
          <span class="text-sm font-semibold text-emerald-300">¥ {{ statistics.actual_salary || '0.00' }}</span>
        </div>
        <div>
          <span class="text-slate-400 block mb-0.5">Last Month Salary</span>
          <span class="text-sm font-semibold text-slate-200">¥ {{ statistics.last_month_income || '0.00' }}</span>
        </div>
        <div>
          <span class="text-slate-400 block mb-0.5">Last Month Total</span>
          <span class="text-sm font-semibold text-slate-200">¥ {{ statistics.last_month_total_amount || '0.00' }}</span>
        </div>
      </div>
    </div>

    <!-- 3. 功能菜单列表 -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-200/60 divide-y divide-slate-100 overflow-hidden">
      <!-- 修改密码 -->
      <button
          @click="changePassword"
          class="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
      >
        <div class="flex items-center space-x-3.5">
          <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-700">Change Password</span>
        </div>
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- 上报不良客户 (图片) -->
      <button
          @click="reportCustomerPic"
          class="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
      >
        <div class="flex items-center space-x-3.5">
          <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-700">Report Bad Customers (Pic)</span>
        </div>
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- 上报不良客户 (号码) -->
      <button
          @click="reportCustomerNumber"
          class="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
      >
        <div class="flex items-center space-x-3.5">
          <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <span class="text-sm font-medium text-slate-700">Report Bad Customers (Phone)</span>
        </div>
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- 4. 退出登录按钮 -->
    <button
        @click="handleLogout"
        class="w-full bg-white rounded-2xl py-4 shadow-sm border border-rose-100 text-rose-600 font-semibold text-sm hover:bg-rose-50/50 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
      </svg>
      <span>Log Out</span>
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getStatistics } from '@/api/order'
import { logout } from '@/api/user'

const store = useStore()
const router = useRouter()

const user = ref({
  username: store.state.user.username,
  avatar: store.state.user.avatar
})

const statistics = ref({
  today_income: '0.00',
  total_amount: '0.00',
  actual_salary: '0.00',
  last_month_income: '0.00',
  last_month_total_amount: '0.00'
})

onMounted(async () => {
  try {
    const res = await getStatistics()
    if (res && res.data) {
      statistics.value = res.data
    }
  } catch (err) {
    console.error('Failed to fetch user statistics:', err)
  }
})

const changePassword = () => router.push({ name: 'Password' })
const reportCustomerPic = () => router.push({ name: 'ReportCustomersPic' })
const reportCustomerNumber = () => router.push({ name: 'ReportCustomersNumber' })

const handleLogout = async () => {
  try {
    await logout()
    // 清除前端本地存储状态（可选）
    // await store.dispatch('user/resetToken')
    router.push({ name: 'SignIn' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>