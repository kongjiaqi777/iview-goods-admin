import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUrl = 'http://homestead.test/'
// const baseUrl = 'http://api.kongry.top:8083'
const axios = new HttpRequest(baseUrl)
export default axios
