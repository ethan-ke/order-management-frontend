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
export function SearchCustomerPhoto(base64) {
  return request({
    url: '/search/photo',
    method: 'post',
    data: {
      base64: base64
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
