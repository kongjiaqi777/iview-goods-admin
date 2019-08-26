<template>
  <div>
     <Card>
      <i-button type="primary" @click="showUpdateDetail=true, this.modelType=1, this.modelTitle='添加采购订单'">添加采购订单</i-button>
      <tables ref="purchaseTables" v-model="purchaseData" :columns="purchaseOrderColumns"/>
    </Card>
    <Modal
        v-model="showDetail"
        title="订单详情"
        @on-ok="showDetail=false" width="800">
        <tables ref="record_table" v-model="purchaseRecordData" :columns="purchaseRecordColumns"/>
    </Modal>
    <Modal v-model="showUpdateDetail" title="修改订单信息" @on-ok="AddOrder" @on-cancel="clearFormData" width="800">
      <i-form ref="addPurshaseOrder" :model="addPurchaseOrderForm" :rules="addPurchaseOrderRules" :label-width="100" style="width:713px;padding-top:50px;">
          <Form-item label="客户信息" prop="customer_id">
            <i-select v-model="addPurchaseOrderForm.supplier_id" placeholder="请选择客户">
              <i-option v-for="item in supplierData" :key="item.id" :value="item.id" :label="item.name"></i-option>
            </i-select>
          </Form-item>

          <i-table borderd :columns="sullpierRecordColumn" :data="supplierRecord" style="margin-top:50px;margin-bottom:50px;">
          </i-table>

          <Form-item label="总价" prop="total_price_display">
            <i-input type="text" v-model="addPurchaseOrderForm.total_price_display" disabled></i-input>
          </Form-item>
          <Form-item label="折扣金额" prop="discount">
            <i-input type="text" v-model="addPurchaseOrderForm.discount"></i-input>
          </Form-item>
          <Form-item label="付款方式" prop="pay_way">
            <RadioGroup v-model="addPurchaseOrderForm.pay_way">
              <Radio v-for="item in payWay" :label="item.value" :key="item.value">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="是否付款" prop="is_pay_off">
            <RadioGroup v-model="addPurchaseOrderForm.is_pay_off">
              <Radio v-for="item in payOff" :label="item.value" :key="item.value">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="已付金额" prop="pay_number">
            <i-input type="text" v-model="addPurchaseOrderForm.pay_number"></i-input>
          </Form-item>
          <Form-item label="凭证" prop="photo">
            <i-input type="text" v-model="addPurchaseOrderForm.photo"></i-input>
          </Form-item>
          <Form-item label="备注信息" prop="comment">
            <i-input type="text" v-model="addPurchaseOrderForm.comment"></i-input>
          </Form-item>
          <!-- <Form-item>
            <i-button @click="AddOrder" type="primary">确认添加</i-button>
            <i-button style="margin-left: 8px">取消</i-button>
          </Form-item> -->
        </i-form>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getPurchaseOrder, getPurchaseRecord } from '@/api/order'
import * as util from '@/utils/util'

export default {
  name: 'purchase_order',
  components: {
    Tables
  },
  data () {
    return {
      purchaseOrderColumns: [
        { title: '订单编号', key: 'order_code', sortable: true },
        {
          title: '总价',
          key: 'total_price',
          render: (h, params) => {
            return h('div',
              util.montyFormatterOutput(params.row.total_price)
            )
          }
        },
        {
          title: '折扣价格',
          key: 'discount',
          render: (h, params) => {
            return h('div',
              util.montyFormatterOutput(params.row.discount)
            )
          }
        },
        { title: '付款方式', key: 'pay_way' },
        { title: '是否付款', key: 'is_pay_off' },
        {
          title: '已付金额',
          key: 'pay_number',
          render: (h, params) => {
            return h('div',
              util.montyFormatterOutput(params.row.pay_number)
            )
          }
        },
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
                }, '查看详情')
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
        {
          title: '采购价格',
          key: 'charge_price',
          render: (h, params) => {
            return h('div',
              util.montyFormatterOutput(params.row.charge_price)
            )
          }
        },
        {
          title: '采购总价',
          render: (h, params) => {
            return h('div',
              util.montyFormatterOutput(parseInt(params.row.charge_price) * parseInt(params.row.num))
            )
          }
        },
        { title: '采购日期', key: 'supplier_date' },
        { title: '供应商名称', key: 'supplier_name' },
        { title: '备注信息', key: 'comment' }
      ],
      purchaseRecordData: [],
      showDetail: false,
      showUpdateDetail: false,
      modelType: 1,
      modelTitle: '添加采购订单',
      addPurchaseOrderForm: {
        supplier_id: 0, // 客户ID
        purchase_record: [],
        pay_way: 0, // 付款方式
        discount: 0, // 折扣
        is_pay_off: 0, // 是否全部付款
        pay_number: 0, // 付款金额
        total_price: 0,
        photo: '',
        comment: '',
        total_price_display: 0
      },
      addPurchaseOrderRules: {
        supplier_id: [
          { required: true, message: '请选择客户' }
        ],
        pay_way: [
          { required: true, message: '请选择付款方式' }
        ],
        total_price: [
          { required: true, message: '全部价格为空', trigger: 'blur' }
        ],
        is_pay_off: [
          { required: true, message: '请选择是否全部付款' }
        ],
        pay_number: [
          { required: true, message: '请填写实际付款金额', trigger: 'blur' }
        ]
      }
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
        console.log(order_code)
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
