<template>
  <div class="min-h-screen bg-slate-100/80 p-4 space-y-3.5 select-none">

    <!-- 1. 订单列表有数据时 -->
    <div v-if="orders && orders.length > 0" class="space-y-3.5">
      <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 transition-all active:scale-[0.995]"
      >
        <!-- 卡片头部：房间号与状态 Badge -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-100">
              🏠
            </div>
            <div>
              <span class="text-xs text-slate-400 font-medium block">Room Number</span>
              <h3 class="text-base font-extrabold text-slate-800 tracking-tight">
                {{ order.room_number || 'N/A' }}
              </h3>
            </div>
          </div>

          <!-- 状态标识 Badge -->
          <span
              class="px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
              :class="getStatusBadgeClass(order.status)"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(order.status)"></span>
            <span>{{ getStatusText(order.status) }}</span>
          </span>
        </div>

        <!-- 卡片主体：信息网格 (Price, Deduction, Phone, Created At) -->
        <div class="py-3.5 grid grid-cols-2 gap-3 text-xs">
          <!-- Price -->
          <div class="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100">
            <span class="text-slate-400 block mb-0.5">Price</span>
            <span class="text-sm font-bold text-emerald-600">¥ {{ order.price || '0.00' }}</span>
          </div>

          <!-- Deduction -->
          <div class="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100">
            <span class="text-slate-400 block mb-0.5">Deduction</span>
            <span class="text-sm font-semibold text-slate-700">¥ {{ order.deduction || '0.00' }}</span>
          </div>

          <!-- Phone -->
          <div class="col-span-2 flex items-center justify-between px-1 text-slate-500">
            <span class="flex items-center space-x-1.5">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>{{ order.phone || 'No phone' }}</span>
            </span>

            <span class="text-[11px] text-slate-400 font-mono">
              {{ order.created_at }}
            </span>
          </div>
        </div>

        <!-- 卡片底部操作按钮 -->
        <div v-if="order.status === 1" class="pt-2 border-t border-slate-100 flex justify-end">
          <button
              @click="handleEdit(order.id)"
              class="bg-emerald-600 active:bg-emerald-700 text-white font-medium text-xs px-4 py-2 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <span>Edit Order</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. 无数据 Empty 占位卡片 -->
    <div v-else-if="orders && orders.length === 0" class="bg-white rounded-3xl p-12 shadow-sm border border-slate-200/60 text-center space-y-3">
      <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <div class="space-y-1">
        <h3 class="text-base font-bold text-slate-700">No Orders Today</h3>
        <p class="text-xs text-slate-400">There are currently no orders available to display.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchOrders } from '@/api/order'

const router = useRouter()
const orders = ref([])

const getOrders = async () => {
  try {
    const response = await fetchOrders()
    if (response && response.data) {
      orders.value = response.data.orders || []
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

const handleEdit = (id) => {
  router.push({ name: 'OrdersEdit', params: { id } })
}

// 动态处理状态样式
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 1:
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
    case 2:
      return 'bg-amber-50 text-amber-700 border border-amber-200/60'
    case 3:
      return 'bg-slate-100 text-slate-600 border border-slate-200/60'
    default:
      return 'bg-slate-100 text-slate-500'
  }
}

const getStatusDotClass = (status) => {
  switch (status) {
    case 1:
      return 'bg-emerald-500'
    case 2:
      return 'bg-amber-500'
    case 3:
      return 'bg-slate-400'
    default:
      return 'bg-slate-400'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 1:
      return 'Active'
    case 2:
      return 'Canceled'
    case 3:
      return 'Finished'
    default:
      return 'Unknown'
  }
}

onMounted(() => {
  getOrders()
})
</script>