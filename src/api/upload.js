import request from '@/utils/request'

export function uploadPicture(data) {
  return request({
    url: 'upload-picture',
    method: 'post',
    data
  })
}
export function reportBadCustomers(formData) {
  return request({
    url: 'report',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function reportCustomersNumber(data) {
  return request({
    url: 'report/number',
    method: 'post',
    data
  })
}
