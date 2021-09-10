import request from '@/utils/request'

export function fetchMerchant(id) {
  return request({
    url: '/merchant/information/' + id,
    method: 'get'
  })
}
