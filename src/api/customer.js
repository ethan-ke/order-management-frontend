import request from '@/utils/request'
import qs from 'qs'

export function createOrder(data) {
  return request({
    url: '/orders',
    method: 'post',
    data
  })
}
export function fetchCustomers(query) {
  return request({
    url: '/search/phone',
    method: 'get',
    params: {
      phone: query.phone
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: true })
    }
  })
}
export function SearchCustomerPhoto(formData) {
  return request({
    url: '/search/photo',
    method: 'post',
    data: formData, // 直接传入 formData 实例
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function scanPhoneOcr(formData) {
  return request({
    url: '/api/customer/ocr-phone',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function fetchOrder(id) {
  return request({
    url: '/orders/' + id,
    method: 'get'
  })
}
export function updateOrder(data, id) {
  return request({
    url: '/orders/' + id,
    method: 'patch',
    data
  })
}
