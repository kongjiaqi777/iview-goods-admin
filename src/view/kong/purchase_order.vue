<template>
  <div>
     <Card>
      <i-button type="primary" @click="showUpdateDetail=true, this.modelType=1, this.modelTitle='添加采购订单'">添加采购订单</i-button>
      <!-- <tables ref="purchaseTables" v-model="purchaseData" :columns="purchaseOrderColumns"/> -->
      <i-table :columns="purchaseOrderColumns" :data="purchaseData" style="margin-top: 30px;"></i-table>
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

          <i-table borderd :columns="purchaseRecordColumn" :data="purchaseRecord" style="margin-top:50px;margin-bottom:50px;">
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
// import Tables from '_c/tables'
import { getPurchaseOrder, getPurchaseRecord, addPurchaseOrder } from '@/api/order'
import { getSupplierList } from '@/api/supplier'
import * as util from '@/utils/util'

export default {
  name: 'purchase_order',
  // components: {
  //   Tables
  // },
  data () {
    return {
      // 采购订单列表列
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
                      this.getPurchaseRecordItem(params.row.order_code)
                      this.showDetail = true
                    }
                  }
                }, '查看详情')
              ])
            }
          ]
        }
      ],
      // 采购丁订单数据
      purchaseData: [],
      // 采购记录详情列
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
      // 采购记录详情数据
      purchaseRecordData: [],
      // 是否显示订单详情模态框
      showDetail: false,
      // 是否显示添加订单模态框
      showUpdateDetail: false,
      // 模态框类型 1添加 2修改
      modelType: 1,
      // 模态框标题
      modelTitle: '添加采购订单',
      // 添加采购订单FormData
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
      // 添加采购订单Form Validate
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
      },
      // 采购记录详情数据
      purchaseRecord: [
        {
          goods_id: 0,
          num: 0,
          charge_price: 0,
          charge_price_display: 0
        }
      ],
      // 采购记录详情列
      purchaseRecordColumn: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'goods_id',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('Select',
              {
                props: {
                  value: this.purchaseRecord[params.index].goods_id, // 数据的双向绑定 data是定义好的数据
                  transfer: true
                },
                on: {
                  'on-change': (event) => { // select改变事件
                    this.purchaseRecord[params.index].goods_id = event
                  }
                }
              },
              this.goodsList.map(function (val, key) { // lunch_array是午餐的集合数组
                return h('Option', {
                  props: {
                    value: val.id
                  }
                }, val.name + '-' + val.model)
              })
            )
          }
        },
        {
          title: '数量',
          key: 'num',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.purchaseRecord[params.index].num
              },
              on: {
                input: (val) => {
                  this.purchaseRecord[params.index].num = val
                },
                'on-blur': () => {
                  this.calPrice()
                }
              }
            })
          }
        },
        {
          title: '售价',
          key: 'charge_price_display',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.purchaseRecord[params.index].charge_price_display
              },
              on: {
                input: (val) => {
                  this.purchaseRecord[params.index].charge_price_display = val
                  this.purchaseRecord[params.index].charge_price = util.moneyFormatterInput(val)
                },
                'on-blur': () => {
                  this.calPrice()
                }
              }
            })
          }
        },
        {
          title: '操作',
          width: 150,
          align: 'center',
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
                      if (this.purchaseRecord[params.index].goods_id === 0) {
                        this.$Message.error('请选择商品')
                        return
                      }
                      if (this.purchaseRecord[params.index].num === 0) {
                        this.$Message.error('请填写商品数量')
                        return
                      }
                      if (this.purchaseRecord[params.index].charge_price === 0) {
                        this.$Message.error('请填写进货价格')
                        return
                      }
                      this.purchaseRecord.push({
                        goods_id: 0,
                        num: 0,
                        charge_price: 0,
                        charge_price_display: 0
                      })
                    }
                  }
                }, '添加新数据')
              ]
            )
          }
        }
      ],
      // 付款方式
      payWay: [
        { value: 1, label: '现金' },
        { value: 2, label: '微信' },
        { value: 3, label: '支付宝' },
        { value: 4, label: '银行卡' }
      ],
      // 付款额度
      payOff: [
        { value: 1, label: '已付款' },
        { value: 2, label: '欠款' },
        { value: 3, label: '部分付款' },
        { value: 4, label: '付款结余' }
      ],
      // 供应商列表数据
      supplierData: []
    }
  },
  mounted () {
    this.getPurchaseOrderData()
    this.getSupplierListData()
  },
  methods: {
    // 获取采购订单列表
    getPurchaseOrderData: function () {
      getPurchaseOrder().then(res => {
        this.purchaseData = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取采购订单中的商品记录
    getPurchaseRecordItem: function (order_code) {
      getPurchaseRecord({ 'purchase_order_code': order_code }).then(res => {
        console.log(order_code)
        this.purchaseRecordData = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加采购订单
    AddOrder: function () {
      this.$refs.addPurshaseOrder.validate((valid) => {
        if (valid) {
          this.validateRecordArray()
          // 价钱格式化
          this.addPurchaseOrderForm.purchase_record = this.purchaseRecord
          this.addPurchaseOrderForm.total_price = util.moneyFormatterInput(this.addSalesOrderForm.total_price)
          // 重新计算总价
          this.calPrice()
          // 请求方法
          addPurchaseOrder(this.addPurchaseOrderForm).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('添加成功!')
              this.getPurchaseOrder()
            } else {
              this.$Message.error('添加失败请重试!')
            }
          })
        }
      })
    },
    // 清理表单数据
    clearFormData: function () {
      this.addPurchaseOrderForm.supplier_id = 0
      this.addPurchaseOrderForm.purchase_record = []
      this.addPurchaseOrderForm.pay_way = 0
      this.addPurchaseOrderForm.discount = 0
      this.addPurchaseOrderForm.is_pay_off = 0
      this.addPurchaseOrderForm.pay_number = 0
      this.addPurchaseOrderForm.total_price = 0
      this.addPurchaseOrderForm.photo = ''
      this.addPurchaseOrderForm.comment = ''
      this.addPurchaseOrderForm.total_price_display = 0
      this.purchaseRecord = [
        {
          goods_id: 0,
          num: 0,
          charge_price: 0,
          charge_price_display: 0
        }
      ]
    },
    // 验证商品记录
    validateRecordArray: function () {
      this.purchaseRecord.forEach((item) => {
        if (item.goods_id === 0) {
          this.$Message.error('请选择商品')
          return
        }
        if (item.num === 0) {
          this.$Message.error('请填写商品数量')
          return
        }
        if (item.charge_price_display === 0) {
          this.$Message.error('请填写进货价格')
        }
      })
    },
    // 计算总价
    calPrice () {
      this.addPurchaseOrderForm.total_price_display = 0
      this.addPurchaseOrderForm.total_price = 0
      this.purchaseRecord.forEach((item) => {
        this.addPurchaseOrderForm.total_price_display += parseInt(item.num) * parseInt(item.charge_price_display)
        this.addPurchaseOrderForm.total_price = util.moneyFormatterInput(this.addPurchaseOrderForm.total_price_display)
      })
    },
    // 获取供应商列表
    getSupplierListData () {
      getSupplierList().then(res => {
        this.supplierData = res.data.info.list
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
