import request from '@/utils/request'

export function signIn(data) {
  return request({
    url: 'authorizations',
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: 'user',
    method: 'get'
  })
}
export function setPassword(data) {
  return request({
    url: 'password',
    method: 'patch',
    data
  })
}
