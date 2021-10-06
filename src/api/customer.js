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
    url: '/customers/search',
    method: 'get',
    params: {
      phone: query.phone
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: true })
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
