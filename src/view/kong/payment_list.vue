<template>
  <div>
    <Card>
        <i-table :columns="paymentColumns" :data="paymentData"></i-table>
    </Card>
  </div>
</template>

<script>
import { getPaymentList } from '@/api/customer'
import * as util from '@/utils/util'

export default {
  name: 'payment_list',
  data () {
    return {
      // 还款列表
      paymentColumns: [
        { title: '用户ID', key: 'user_id' },
        {
          title: '姓名',
          key: 'user_id',
          render: (h, params) => {
            if (params.row.user_type === 1) {
              return h('div',
                params.row.customer_name
              )
            } else {
              return h('div',
                params.row.supplier_name
              )
            }
          }
        },
        {
          title: '用户类型',
          key: 'user_type',
          render: (h, params) => {
            return h('div',
              util.getPaymentType(params.row.user_type)
            )
          }
        },
        {
          title: '付款方式',
          key: 'pay_way',
          render: (h, params) => {
            return h('div',
              util.showPayWay(params.row.pay_way)
            )
          }
        },
        { title: '已付金额', key: 'pay_number' },
        { title: '备注信息', key: 'comment' },
        { title: '图片', key: 'photo' },
        { title: '创建时间', key: 'created_at' },
        { title: '修改时间', key: 'updated_at' }
      ],
      paymentData: []
    }
  },
  mounted () {
    this.getPaymentList()
  },
  methods: {
    getPaymentList () {
      getPaymentList({ 'user_type': 1 }).then(res => {
        this.paymentData = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
