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
