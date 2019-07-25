<template>
  <div>
    <Card>
      <i-form>
        <Form-item prop="query_header.customer_id" label="客户姓名">
          <i-select v-model="query_header.customer_id" placeholder="请选择客户">
            <i-option v-for="item in customerList" :key="item.id" :value="item.name" :label="item.name"></i-option>
          </i-select>
        </Form-item>
      </i-form>
    </Card>
  </div>
</template>

<script>
import { getGoodsInfo } from '@/api/goods'
import { getCustomerInfo } from '@/api/customer'

export default {
  name: 'query-header',
  data () {
    return {
      // 客户列表返回数据
      customerList: [],
      // 客户列表查询参数
      customer_query: [],
      // 商品列表返回数据
      goodsList: [],
      // 商品列表查询参数  
      goods_query: [],
      // query参数列
      query_header: {
        customer_id: 0,
        goods_id: 0,

      }
    }
  },
  methods: {
    getGoodList () {

    },
    getCustomerList () {
      getCustomerInfo().then(res => {
      })
    }
  }
}
</script>