<template>
  <div>
     <Card>
      <i-button type="primary" @click="gotoAddPage">添加销售订单</i-button>
      <i-table :columns="columns" :data="tableData"></i-table>
    </Card>
    <Modal
        v-model="showDetail"
        title="订单详情"
        @on-ok="showDetail=false" width="800">
        <i-table :data="recordData" :columns="recordColumns"></i-table>
    </Modal>
  </div>
</template>
<script>
import { getSalesOrder, getSalesRecord } from '@/api/order'
import * as util from '@/utils/util'

export default {
  name: 'sales_order',
  data () {
    return {
      // 订单列表
      columns: [
        {
          title: '订单编号',
          key: 'order_code',
          sortable: true
        },
        {
          title: '订单总额',
          key: 'total_price',
          render: (h, params) => {
            return h('div',
              this.montyFormatterOutput(params.row.total_price)
            )
          }
        },
        {
          title: '折扣金额',
          key: 'discount',
          render: (h, params) => {
            return h('div',
              this.montyFormatterOutput(params.row.discount)
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
        {
          title: '是否付款',
          key: 'is_pay_off',
          render: (h, params) => {
            return h('div',
              util.showPayOff(params.row.is_pay_off)
            )
          }
        },
        {
          title: '已付金额',
          key: 'pay_number',
          render: (h, params) => {
            return h('div',
              this.montyFormatterOutput(params.row.pay_number)
            )
          }
        },
        { title: '顾客姓名', key: 'customer_name' },
        { title: '凭证', key: 'photo' },
        { title: '备注信息', key: 'comment' },
        { title: '订单添加时间', key: 'created_at' },
        {
          title: '详情',
          key: 'handle',
          render: (h, params) => {
            return h('div',
              [
                h('Button', {
                  props: {
                    type: 'primary'
                  },
                  style: {
                    width: '80%',
                    display: 'flex',
                    'justify-content': 'center'
                  },
                  on: {
                    click: () => {
                      this.getSalesRecordItem(params.row.order_code)
                      this.showDetail = true
                    }
                  }
                }, '查看详情')
              ]
            )
          }
        }
      ],
      // 订单数据
      tableData: [],
      // 记录列表
      recordColumns: [
        { title: '货物编号', key: 'goods_id' },
        { title: '货物名称', key: 'goods_name' },
        { title: '销售订单', key: 'sales_order_code', width: 100 },
        { title: '销售数量', key: 'num' },
        {
          title: '销售价格',
          key: 'sales_price',
          render: (h, params) => {
            return h('div',
              this.montyFormatterOutput(params.row.sales_price)
            )
          }
        },
        { title: '销售日期', key: 'sales_date' },
        { title: '顾客名称', key: 'customer_name' },
        { title: '备注信息', key: 'comment' }
      ],
      // 记录数据
      recordData: []
    }
  },
  mounted () {
    this.getSalesOrderList()
  },
  methods: {
    // 获取订单列表
    getSalesOrderList () {
      getSalesOrder().then(res => {
        this.tableData = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取销售记录
    getSalesRecordItem: function (order_code) {
      getSalesRecord({ 'sales_order_code': order_code }).then(res => {
        this.recordData = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    gotoAddPage () {
      this.$router.push({
        path: '/add_sales_order'
      })
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
