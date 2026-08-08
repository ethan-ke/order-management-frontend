<template>
  <div class="space-y-4 select-none relative">

    <!-- 1. 漂亮的 Tailwind 风格 Toast 浮层提示 -->
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
        <span class="text-amber-400">⚠️</span>
        <span>{{ toastMsg }}</span>
      </div>
    </Transition>

    <!-- 2. 主表单卡片 -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60 space-y-4">
      <h2 class="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
        {{ isEdit ? 'Edit Order Details' : 'Create New Order' }}
      </h2>

      <!-- Phone (必须带 '+' 及国际区号) -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-slate-600">Phone</label>
          <span class="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Must include country code</span>
        </div>
        <input
            v-model="postForm.phone"
            type="tel"
            required
            placeholder="e.g. +966501234567 or +971501234567"
            @input="handlePhoneInput"
            @paste="handlePhonePaste"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <!-- Price -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600">Price (SAR)</label>
        <input
            v-model="postForm.price"
            type="number"
            required
            placeholder="Please enter price"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <!-- Room Number -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-600">Room Number</label>
        <input
            v-model="postForm.room_number"
            type="text"
            required
            placeholder="Please enter room number"
            class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <!-- 按钮区：新建模式 (Submit) -->
      <div v-if="!isEdit" class="pt-2">
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ loading ? 'Submitting...' : 'Submit' }}</span>
        </button>
      </div>

      <!-- 按钮区：编辑模式 (Update) -->
      <div v-else class="pt-2">
        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ loading ? 'Updating...' : 'Update Order' }}</span>
        </button>
      </div>
    </form>

    <!-- 编辑模式下的快捷操作按钮 -->
    <div v-if="isEdit" class="grid grid-cols-2 gap-3">
      <button
          type="button"
          @click="openModal('Cancel', 2)"
          class="bg-white border border-amber-200 text-amber-700 active:bg-amber-50 font-semibold text-xs py-3 rounded-2xl shadow-sm transition-all"
      >
        Cancel Order
      </button>

      <button
          type="button"
          @click="openModal('Finish', 3)"
          class="bg-white border border-emerald-200 text-emerald-700 active:bg-emerald-50 font-semibold text-xs py-3 rounded-2xl shadow-sm transition-all"
      >
        Finish Order
      </button>
    </div>

    <!-- 确认 Modal (原生替代品) -->
    <div v-if="modalInfo" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-5 max-w-xs w-full space-y-4 shadow-xl text-center">
        <h3 class="text-base font-bold text-slate-800">{{ modalInfo.actionText }} Order</h3>
        <p class="text-xs text-slate-500">Are you sure you want to {{ modalInfo.actionText.toLowerCase() }} this order？</p>
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button
              type="button"
              @click="modalInfo = null"
              class="bg-slate-100 text-slate-600 text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
              type="button"
              @click="confirmStatusUpdate"
              class="bg-emerald-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-emerald-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createOrder, fetchOrder, updateOrder, updateOrderStatus } from '@/api/order'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const modalInfo = ref(null)
const toastMsg = ref('')

// 显示美化后的 Toast 提示，2.5s 自动消失
const showToast = (msg) => {
  toastMsg.value = msg
  setTimeout(() => {
    toastMsg.value = ''
  }, 2500)
}

const postForm = ref({
  phone: '',
  price: '',
  room_number: ''
})

/**
 * 💡 实时过滤：只保留 '+' 和 数字
 */
const cleanPhoneNumber = (val) => {
  if (!val) return ''
  // 去除所有空格，过滤除了 '+' 和 数字以外的全部字符
  let cleaned = val.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  // 确保 '+' 只能出现在最开头
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

onMounted(async () => {
  if (props.isEdit) {
    const orderId = route.params.id
    if (orderId) {
      try {
        const res = await fetchOrder(orderId)
        if (res?.data) {
          postForm.value = {
            phone: cleanPhoneNumber(res.data.phone || ''),
            price: res.data.price || '',
            room_number: res.data.room_number || ''
          }
        }
      } catch (err) {
        console.error('Fetch order detail failed:', err)
      }
    }
  }
})

// 提交表单
const handleSubmit = async () => {
  if (loading.value) return

  const phoneVal = postForm.value.phone

  // 💡 正则表达校验：必须以 '+' 开头，且后面跟着 8 至 15 位纯数字（符合 E.164 国际电话标准）
  const internationalPhoneReg = /^\+\d{8,15}$/

  if (!phoneVal || !internationalPhoneReg.test(phoneVal)) {
    showToast('Phone number must include country code (e.g. +966501234567)')
    return
  }

  loading.value = true
  try {
    if (props.isEdit) {
      const orderId = route.params.id
      await updateOrder(postForm.value, orderId)
    } else {
      await createOrder(postForm.value)
    }
    router.push('/')
  } catch (err) {
    console.error('Submit failed:', err)
    showToast('Operation failed, please try again.')
  } finally {
    loading.value = false
  }
}

const openModal = (actionText, status) => {
  modalInfo.value = { actionText, status }
}

const confirmStatusUpdate = async () => {
  if (!modalInfo.value) return
  const orderId = route.params.id
  try {
    await updateOrderStatus({ status: modalInfo.value.status }, orderId)
    modalInfo.value = null
    router.push('/')
  } catch (err) {
    console.error('Update status failed:', err)
    showToast('Failed to update status.')
  }
}
</script>