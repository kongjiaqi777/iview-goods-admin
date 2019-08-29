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

// 更改顾客信息
export const updateCustomerInfo = (info) => {
  return axios.request({
    url: 'v1/customer/update',
    method: 'post',
    data: info
  })
}

// 更新还款信息列表
export const getPaymentList = (data) => {
  return axios.request({
    url: 'v1/payment/list',
    method: 'get',
    params: data
  })
}
