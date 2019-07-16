import axios from '@/libs/api.request'

// 供应商列表
export const getSupplierList = (data) => {
  return axios.request({
    url: 'v1/suppliers/list',
    method: 'get',
    params: data
  })
}
