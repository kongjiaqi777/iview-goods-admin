<template>
  <div>
     <Card>
      <i-button type="primary" @click="modalShow=true">添加销售订单</i-button>
      <tables ref="tables" editable v-model="tableData" :columns="columns"/>
    </Card>
    <Modal
        v-model="showDetail"
        title="订单详情"
        @on-ok="showDetail=false" width="800">
        <tables ref="record_table" v-model="recordData" :columns="recordColumns"/>
    </Modal>
    <Modal v-modal="modalShow" title="添加订单" @on-ok="addSalesOrder" @on-cancel="clearOrderForm">
      <i-form ref="addSalesOrder" :model="addSalesOrderForm" :rules="addSalesOrderRules">
        <From-item label="客户信息" prop="customer_id">
          <i-select v-model="addSalesOrderForm.customer_id" placeholder="请选择客户">
            <i-option v-for="item in customerData" :key="item.id" :value="item.name" :label="item.name"></i-option>
          </i-select>
        </From-item>
        <Form-item label="总价">
          <i-input type="input" v-model="addSalesOrderForm.total_price"></i-input>
        </Form-item>
        <Form-item label="折扣金额">
          <i-input type="input" v-model="addSalesOrderForm.discount"></i-input>
        </Form-item>
        <Form-item label="付款方式">
          <Radio-group v-model="addSalesOrderForm.pay_way">
            <Radio value="1" label="现金"></Radio>
            <Radio value="2" label="微信"></Radio>
            <Radio value="3" label="支付宝"></Radio>
            <Radio value="4" label="银行卡"></Radio>
          </Radio-group>
        </Form-item>

        <Form-item label="是否付款">
          <Radio-group v-model="addSalesOrderForm.is_pay_off">
            <Radio value="1" label="已付款"></Radio>
            <Radio value="2" label="欠款"></Radio>
            <Radio value="3" label="部分付款"></Radio>
            <Radio value="4" label="付款结余"></Radio>
          </Radio-group>
        </Form-item>

        <Form-item label="已付金额">
          <i-input type="input" v-model="addSalesOrderForm.pay_number"></i-input>
        </Form-item>

        <Form-item label="凭证">
          <i-input type="input" v-model="addSalesOrderForm.photo"></i-input>
        </Form-item>

        <Form-item label="备注信息">
          <i-input type="input" v-model=""></i-input>
        </Form-item>

      </i-form>

      <i-form>
        <table cellspacing="0" cellpadding="0" border="0" style="width: 320px;">
            <thead>
              <tr>
                <th>序号</th>
                <th>商品名称</th>
                <th>数量</th>
                <th>实际售价</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in saleRecord" :key="index">
                    <td>{{index + 1}}</td>
                    <td>
                      <Form-item prop="record.goods_id" label="商品名称">
                        <i-select v-model="saleRecord.goods_id" placeholer="请选择商品">
                          <i-option v-for="item in goodsList" :key="item.id" :value="item.id" :label="item.name"></i-option>
                        </i-select>
                      </Form-item>
                    </td>
                    <td>
                      <Form-item prop="record.num" label="数量">
                        <i-input v-model="saleRecord.num" placeholder="请输入销售数量"></i-input>
                      </Form-item>
                    </td>
                    <td>
                      <Form-item prop="record.sales_price" label="售价">
                        <i-input v-model="saleRecord.sales_price" placeholder="请输入售价"></i-input>
                      </Form-item>
                    </td>
                </tr>
            </tbody>
        </table>
      </i-form>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getSalesOrder, getSalesRecord } from '@/api/order'
import { getCustomerInfo } from '@/api/customer'
import { getGoodsInfo } from '@/api/goods'

export default {
  name: 'sales_order',
  components: {
    Tables
  },
  data () {
    return {
      // 订单列表
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
      // 订单数据
      tableData: [],
      // 记录列表
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
      // 记录数据
      recordData: [],
      // 订单详情显示
      showDetail: false,
      // 顾客列表数据
      customerData: [],
      // 添加订单显示
      modalShow: false,
      // 增加订单表单
      addSalesOrderForm: {
        customer_id: 0, // 客户ID
        sales_record: [],
        pay_way: 0, // 付款方式
        discount: 0, // 折扣
        is_pay_off: 0, // 是否全部付款
        pay_number: 0 // 付款金额
      },
      // 添加订单验证
      addSalesOrderRules: {
        customer_id: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        pay_way: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请填写折扣部分金额', trigger: 'blur' }
        ],
        is_pay_off: [
          { required: true, message: '请选择是否全部付款', trigger: 'change' }
        ],
        pay_number: [
          { required: true, message: '请天蝎付款金额', trigger: 'blur' }
        ],
        'sales_record.*.goods_id': [
          { required: true, message: '请选择商品', trigger: 'change' }
        ],
        'sales_record.*.num': [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { min: 1, message: '数量必须大于0', trigger: 'blur' }
        ],
        'sales_record.*.sales_price': [
          { required: true, message: '请输入售价', trigger: 'blur' },
          { min: 1, message: '售价必须大于0', trigger: 'blur' }
        ]
      },
      // 商品列表
      goodsList: [],
      // 订单数据
      saleRecord: {
        id: 0,
        goods_id: 0,
        num: 0,
        sales_price: 0
      }
    }
  },
  mounted () {
    this.getSalesOrderList()
    this.getCustomerInfo()
    this.getGoodsInfoList()
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
    // 获取客户列表
    getCustomerInfo () {
      getCustomerInfo().then(res => {
        this.customerData = res.data.info.list
      })
    },
    // 添加订单
    addSalesOrder () {

    },
    // 清空表单
    clearOrderForm () {

    },
    // 商品列表
    getGoodsInfoList () {
      getGoodsInfo().then(res => {
        this.goodsList = res.data.info
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
