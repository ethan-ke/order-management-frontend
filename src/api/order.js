import request from '@/utils/request'

export function createOrder(data) {
  return request({
    url: '/orders',
    method: 'post',
    data
  })
}
export function fetchOrders() {
  return request({
    url: '/orders',
    method: 'get'
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
export function updateOrderStatus(data, id) {
  return request({
    url: '/orders/status/' + id,
    method: 'patch',
    data
  })
}
