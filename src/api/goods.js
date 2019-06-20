import axios from '@/libs/api.request'

export const getGoodsInfo = () => {
  return axios.request({
    url: 'v1/goods/list',
    method: 'get'
  })
}

export const getSalesOrder = () => {
  return axios.request({
    url: 'v1/order/get_sales_order',
    method: 'get'
  })
}

export const getSalesRecord = info => {
  return axios.request({
    url: 'v1/sales/get_sales_record',
    method: 'get',
    data: info
  })
}

export const getPurchaseOrder = () => {
  return axios.request({
    url: 'v1/order/get_purchase_order',
    method: 'get'
  })
}

export const getPurchaseRecord = info => {
  return axios.request({
    url: 'v1/purchase/list',
    method: 'get',
    data: info
  })
}

export const getCategoryList = () => {
  return axios.request({
    url: 'v1/category/list',
    method: 'get'
  })
}

export const addCategory = info => {
  return axios.request({
    url: 'v1/category/create',
    method: 'post',
    data: info
  })
}
