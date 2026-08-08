import axios from 'axios'
import { getAccessToken } from '@/utils/auth'

// 1. 手写一个极简纯原生 Tailwind Toast 提示函数
const showToast = (message) => {
    // 检查页面上是否已有 Toast，有的话先移除
    const existingToast = document.getElementById('custom-toast')
    if (existingToast) {
        existingToast.remove()
    }

    // 创建 Toast 容器
    const toast = document.createElement('div')
    toast.id = 'custom-toast'
    // 使用 Tailwind CSS 打造动态毛玻璃浮层动画
    toast.className = `
    fixed top-5 left-1/2 -translate-x-1/2 z-[9999] 
    bg-gray-900/90 text-white text-xs font-medium px-4 py-2.5 rounded-full 
    shadow-xl backdrop-blur-md transition-all duration-300 transform -translate-y-2 opacity-0
    flex items-center space-x-2 max-w-[85vw] break-words
  `

    toast.innerHTML = `
    <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  `

    document.body.appendChild(toast)

    // 触发渐入动画
    requestAnimationFrame(() => {
        toast.classList.remove('-translate-y-2', 'opacity-0')
        toast.classList.add('translate-y-0', 'opacity-100')
    })

    // 2.5 秒后自动离场并销毁
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100')
        toast.classList.add('-translate-y-2', 'opacity-0')
        setTimeout(() => toast.remove(), 300)
    }, 2500)
}

// 2. 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
    timeout: 10000
})

// 3. 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('Request Error:', error)
        return Promise.reject(error)
    }
)

// 4. 响应拦截器
service.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.dir(error)

        let errorMessage = 'An error occurred, please try again'

        if (error.response) {
            const { status, data } = error.response

            // 提取后端返回的 message 字段[cite: 8]
            if (data && data.message) {
                errorMessage = data.message
            }
            // 针对 422 验证错误
            else if (status === 422 && data?.errors) {
                const firstErrorKey = Object.keys(data.errors)[0]
                errorMessage = data.errors[firstErrorKey]?.[0] || 'Validation failed'
            }
            // 状态码 Fallback
            else if (status === 401) {
                errorMessage = 'Unauthorized, please sign in again'
            } else if (status === 404) {
                errorMessage = 'API Endpoint Not Found (404)'
            } else if (status >= 500) {
                errorMessage = 'Server internal error'
            }
        } else if (error.message) {
            if (error.message.includes('timeout')) {
                errorMessage = 'Request timeout, please try again'
            } else {
                errorMessage = error.message
            }
        }

        // 💡 调用纯原生 Tailwind Toast 提示
        showToast(errorMessage)

        return Promise.reject(error)
    }
)

export default service