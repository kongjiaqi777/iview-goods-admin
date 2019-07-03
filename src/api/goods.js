import axios from '@/libs/api.request'

// 商品列表
export const getGoodsInfo = () => {
  return axios.request({
    url: 'v1/goods/list',
    method: 'get'
  })
}

// 销售订单列表
export const getSalesOrder = () => {
  return axios.request({
    url: 'v1/order/get_sales_order',
    method: 'get'
  })
}

// 销售订单记录
export const getSalesRecord = info => {
  return axios.request({
    url: 'v1/sales/get_sales_record',
    method: 'get',
    data: info
  })
}

// 购买订单列表
export const getPurchaseOrder = () => {
  return axios.request({
    url: 'v1/order/get_purchase_order',
    method: 'get'
  })
}

// 购买记录
export const getPurchaseRecord = info => {
  return axios.request({
    url: 'v1/purchase/list',
    method: 'get',
    data: info
  })
}

// 类别列表
export const getCategoryList = () => {
  return axios.request({
    url: 'v1/category/list',
    method: 'get'
  })
}

// 添加列表
export const addCategory = info => {
  return axios.request({
    url: 'v1/category/create',
    method: 'post',
    data: info
  })
}

// 修改类别
export const modifyCategory = info => {
  return axios.request({
    url: 'v1/category/edit',
    method: 'post',
    data: info
  })
}
// 顾客列表
