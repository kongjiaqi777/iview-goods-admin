<template>
  <div>
     <Card>
      <tables ref="purchaseTables" editable searchable search-place="top" v-model="purchaseData" :columns="purchaseOrderColumns"/>
    </Card>
    <Modal
        v-model="showDetail"
        title="订单详情"
        @on-ok="showDetail=false">
        <tables ref="record_table" v-model="purchaseRecordData" :columns="purchaseRecordColumns"/>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getPurchaseOrder, getPurchaseRecord } from '@/api/goods'

export default {
  name: 'purchase_order',
  components: {
    Tables
  },
  data () {
    return {
      purchaseOrderColumns: [
        { title: '订单编号', key: 'order_code', sortable: true },
        { title: '总价', key: 'total_price' },
        { title: '折扣', key: 'discount' },
        { title: '付款方式', key: 'pay_way' },
        { title: '是否付款', key: 'is_pay_off' },
        { title: '已付金额', key: 'pay_number' },
        { title: '供应商名称', key: 'supplier_name' },
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
                      this.getpurchaseRecordItem(params.row.order_code)
                      this.showDetail = true
                    }
                  }
                }, '查看原因')
              ])
            }
          ]
        }
      ],
      purchaseData: [],
      purchaseRecordColumns: [
        { title: '货物编号', key: 'goods_id' },
        { title: '货物名称', key: 'goods_name' },
        { title: '采购订单', key: 'purchase_order_code', width: 100 },
        { title: '采购数量', key: 'num' },
        { title: '采购价格', key: 'charge_price' },
        { title: '采购日期', key: 'supplier_date' },
        { title: '供应商名称', key: 'supplier_name' },
        { title: '备注信息', key: 'comment' }
      ],
      purchaseRecordData: [],
      showDetail: false,
      asyncOK: false
    }
  },
  mounted () {
    getPurchaseOrder().then(res => {
      this.purchaseData = res.data.info
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getpurchaseRecordItem: function (order_code) {
      getPurchaseRecord({ 'purchase_order_code': order_code }).then(res => {
        this.purchaseRecordData = res.data.info
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
