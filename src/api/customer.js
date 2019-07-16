import axios from '@/libs/api.request'

// 顾客列表
export const getCustomerInfo = (data) => {
  return axios.request({
    url: 'v1/customer/list',
    method: 'get',
    params: data
  })
}

// 添加顾客
export const addCustomerInfo = (info) => {
  return axios.request({
    url: 'v1/customer/create',
    method: 'post',
    data: info
  })
}
