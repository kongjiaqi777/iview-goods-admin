import axios from '@/libs/api.request'

// 商品列表
export const getGoodsInfo = (data) => {
  return axios.request({
    url: 'v1/goods/list',
    method: 'get',
    params: data
  })
}

// 添加商品
export const addGoodsInfo = (info) => {
  return axios.request({
    url: 'v1/goods/create',
    method: 'post',
    data: info
  })
}

// 修改商品信息
export const modifyGoodsInfo = (info) => {
  return axios.request({
    url: 'v1/goods/update',
    method: 'post',
    data: info
  })
}

// 类别列表
export const getCategoryList = (data) => {
  return axios.request({
    url: 'v1/category/list',
    method: 'get',
    params: data
  })
}

// 添加列表
export const addCategory = (info) => {
  return axios.request({
    url: 'v1/category/create',
    method: 'post',
    data: info
  })
}

// 修改类别
export const modifyCategory = (info) => {
  return axios.request({
    url: 'v1/category/edit',
    method: 'post',
    data: info
  })
}
