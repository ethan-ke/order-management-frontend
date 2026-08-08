import request from '@/utils/request'

export function getRooms() {
  return request({
    url: 'rooms',
    method: 'get'
  })
}
export function fetchRoom(id) {
  return request({
    url: 'rooms/' + id,
    method: 'get'
  })
}
export function fetchOrders(id) {
  return request({
    url: `rooms/${id}/orders`,
    method: 'get'
  })
}
