<template>
  <div>
     <Card>
      <tables ref="tables" editable v-model="tableData" :columns="columns"/>
    </Card>
    <Modal
        v-model="showDetail"
        title="订单详情"
        @on-ok="showDetail=false" width="800">
        <tables ref="record_table" v-model="recordData" :columns="recordColumns"/>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getSalesOrder, getSalesRecord } from '@/api/order'

export default {
  name: 'sales_order',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '订单编号', key: 'order_code', sortable: true },
        { title: '总价', key: 'total_price' },
        { title: '折扣', key: 'discount' },
        { title: '付款方式', key: 'pay_way' },
        { title: '是否付款', key: 'is_pay_off' },
        { title: '已付金额', key: 'pay_number' },
        { title: '顾客名称', key: 'customer_name' },
        { title: '凭证', key: 'photo' },
        { title: '备注信息', key: 'comment' },
        {
          title: '详情',
          key: 'handle',
          options: ['详情'],
          button: [
            (h, params, vm) => {
              return h('div', [
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
              ])
            }
          ]
        }
      ],
      tableData: [],
      recordColumns: [
        { title: '货物编号', key: 'goods_id' },
        { title: '货物名称', key: 'goods_name' },
        { title: '销售订单', key: 'sales_order_code', width: 100 },
        { title: '销售数量', key: 'num' },
        { title: '销售价格', key: 'sales_price' },
        { title: '销售日期', key: 'sales_date' },
        { title: '顾客名称', key: 'customer_name' },
        { title: '备注信息', key: 'comment' }
      ],
      recordData: [],
      showDetail: false,
      asyncOK: false
    }
  },
  mounted () {
    getSalesOrder().then(res => {
      this.tableData = res.data.info
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getSalesRecordItem: function (order_code) {
      getSalesRecord({ 'sales_order_code': order_code }).then(res => {
        this.recordData = res.data.info
      }).catch(err => {
        console.log(err)
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
