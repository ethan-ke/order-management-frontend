import request from '@/utils/request'

export function fetchCoupons() {
  return request({
    url: 'coupons',
    method: 'get'
  })
}
export function fetchCoupon(id) {
  return request({
    url: 'coupons/' + id,
    method: 'get'
  })
}
