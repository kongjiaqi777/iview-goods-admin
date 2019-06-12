import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUrl = 'http://homestead.test/'
// 'http://www.goods.com:8089/'
const axios = new HttpRequest(baseUrl)
export default axios
