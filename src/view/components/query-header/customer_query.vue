<template>
    <div>
        <Form-item prop="query_header.customer_id" label="客户姓名">
            <i-select v-model="query_header.customer_id" placeholder="请选择客户">
                <i-option v-for="item in customerList" :key="item.id" :value="item.name" :label="item.name"></i-option>
            </i-select>
        </Form-item>
    </div>
</template>

<script>
import { getCustomerInfo } from '@/api/customer'

export default {
  name: 'query-header',
  data () {
    return {
      // 客户列表返回数据
      customerList: [],
      // 客户列表查询参数
      customer_query: [],
      // query参数列
      query_header: {
        customer_id: 0
      }
    }
  },
  methods: {
    getCustomerList () {
      getCustomerInfo().then(res => {
        this.customerList = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
