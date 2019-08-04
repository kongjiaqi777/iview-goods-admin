<template>
    <div>
      <Card>
        <header>添加销售订单</header>
        <i-form ref="addSalesOrder" :model="addSalesOrderForm" :rules="addSalesOrderRules" :label-width="100" style="width:713px;padding-top:50px;">
          <Form-item label="客户信息" prop="customer_id">
            <i-select v-model="addSalesOrderForm.customer_id" placeholder="请选择客户">
              <i-option v-for="item in customerData" :key="item.id" :value="item.id" :label="item.name"></i-option>
            </i-select>
          </Form-item>

          <i-table border :columns="saleRecordColumn" :data="saleRecord" style="margin-top:50px;margin-bottom:50px;">
            <!-- <i-select v-model="saleRecord.goods_id" placeholer="请选择商品">
              <i-option v-for="item in goodsList" :key="item.id" :value="item.id" :label="item.name"></i-option>
            </i-select>
            <i-input v-model="saleRecord.num" placeholder="请输入销售数量"></i-input>
            <i-input v-model="saleRecord.sales_price" placeholder="请输入售价"></i-input> -->
          </i-table>

          <Form-item label="总价" prop="total_price_display">
            <i-input type="text" v-model="addSalesOrderForm.total_price_display" disabled></i-input>
          </Form-item>
          <Form-item label="折扣金额" prop="discount">
            <i-input type="text" v-model="addSalesOrderForm.discount"></i-input>
          </Form-item>
          <Form-item label="付款方式" prop="pay_way">
            <RadioGroup v-model="addSalesOrderForm.pay_way">
              <Radio v-for="item in payWay" :label="item.value" :key="item.value">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
            <!-- <Radio-group v-model="addSalesOrderForm.pay_way">

              <Radio value="1">现金</Radio>
              <Radio value="2">微信</Radio>
              <Radio value="3">支付宝</Radio>
              <Radio value="4">银行卡</Radio>
            </Radio-group> -->
          </Form-item>
          <Form-item label="是否付款" prop="is_pay_off">
            <RadioGroup v-model="addSalesOrderForm.is_pay_off">
              <Radio v-for="item in payOff" :label="item.value" :key="item.value">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
            <!-- <Radio-group v-model="addSalesOrderForm.is_pay_off">
              <Radio value="1">已付款</Radio>
              <Radio value="2">欠款</Radio>
              <Radio value="3">部分付款</Radio>
              <Radio value="4">付款结余</Radio>
            </Radio-group> -->
          </Form-item>
          <Form-item label="已付金额" prop="pay_number">
            <i-input type="text" v-model="addSalesOrderForm.pay_number"></i-input>
          </Form-item>
          <Form-item label="凭证" prop="photo">
            <i-input type="text" v-model="addSalesOrderForm.photo"></i-input>
          </Form-item>
          <Form-item label="备注信息" prop="comment">
            <i-input type="text" v-model="addSalesOrderForm.comment"></i-input>
          </Form-item>
          <Form-item>
            <i-button @click="AddOrder" type="primary">确认添加</i-button>
            <i-button style="margin-left: 8px">取消</i-button>
          </Form-item>
        </i-form>
      </Card>
    </div>
</template>

<script>
import { getCustomerInfo } from '@/api/customer'
import { getGoodsInfo } from '@/api/goods'
import { addSalesOrder } from '@/api/order'

export default {
  name: 'add_sales_order',
  data () {
    return {
      // 顾客列表数据
      customerData: [],
      // 增加订单表单
      addSalesOrderForm: {
        customer_id: 0, // 客户ID
        sales_record: [],
        pay_way: 0, // 付款方式
        discount: 0, // 折扣
        is_pay_off: 0, // 是否全部付款
        pay_number: 0, // 付款金额
        total_price: 0,
        photo: '',
        comment: '',
        total_price_display: 0
      },
      // 添加订单验证
      addSalesOrderRules: {
        customer_id: [
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
      // 商品列表
      goodsList: [],
      // 订单数据
      saleRecord: [
        {
          goods_id: 0,
          num: 0,
          sales_price: 0,
          sales_price_display: 0
        }
      ],
      saleRecordColumn: [
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
                  value: this.saleRecord[params.index].goods_id, // 数据的双向绑定 data是定义好的数据
                  transfer: true
                },
                on: {
                  'on-change': (event) => { // select改变事件
                    this.saleRecord[params.index].goods_id = event
                  }
                }
              },
              this.goodsList.map(function (val, key) { // lunch_array是午餐的集合数组
                return h('Option', {
                  props: {
                    value: val.id
                  }
                }, val.name)
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
                value: ''
              },
              on: {
                input: (val) => {
                  this.saleRecord[params.index].num = val
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
          key: 'sales_price_display',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: ''
              },
              on: {
                input: (val) => {
                  this.saleRecord[params.index].sales_price_display = val
                  this.saleRecord[params.index].sales_price = this.moneyFormatterInput(val)
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
                      if (this.saleRecord[params.index].goods_id === 0) {
                        this.$Message.error('请选择商品')
                        return
                      }
                      if (this.saleRecord[params.index].num === 0) {
                        this.$Message.error('请填写商品数量')
                        return
                      }
                      if (this.saleRecord[params.index].sale_price === 0) {
                        this.$Message.error('请填写零售价')
                        return
                      }
                      this.saleRecord.push({
                        goods_id: 0,
                        num: 0,
                        sales_price: 0,
                        sales_price_display: 0
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
      payOff: [
        { value: 1, label: '已付款' },
        { value: 2, label: '欠款' },
        { value: 3, label: '部分付款' },
        { value: 4, label: '付款结余' }
      ]
    }
  },
  mounted () {
    this.getCustomerInfo()
    this.getGoodsInfoList()
  },
  methods: {
    // 获取客户列表
    getCustomerInfo () {
      getCustomerInfo().then(res => {
        this.customerData = res.data.info.list
      })
    },
    // 商品列表
    getGoodsInfoList () {
      getGoodsInfo().then(res => {
        this.goodsList = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加订单
    AddOrder () {
      console.log(this.addSalesOrderForm)
      // 先验证saleRecord
      this.$refs.addSalesOrder.validate((valid) => {
        if (valid) {
          this.validateRecordArray()
          // 价钱格式化
          this.addSalesOrderForm.sales_record = this.saleRecord
          // this.addSalesOrderForm.total_price = this.moneyFormatterInput(this.addSalesOrderForm.total_price)
          // 重新计算总价
          this.calPrice()
          // 请求方法
          addSalesOrder(this.addSalesOrderForm).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('添加成功!')
            } else {
              this.$Message.error('添加失败请重试!')
            }
          })
        }
      })
    },
    // 计算总价
    calPrice () {
      this.addSalesOrderForm.total_price_display = 0
      this.addSalesOrderForm.total_price = 0
      this.saleRecord.forEach((item) => {
        // console.log(parseInt(item.num) * parseInt(item.sales_price))
        this.addSalesOrderForm.total_price_display += parseInt(item.num) * parseInt(item.sales_price_display)
        this.addSalesOrderForm.total_price = this.moneyFormatterInput(this.addSalesOrderForm.total_price_display)
      })
    },
    // 校验商品销售记录完整性
    validateRecordArray () {
      this.saleRecord.forEach((item) => {
        if (item.goods_id === 0) {
          this.$Message.error('请选择商品')
          return
        }
        if (item.num === 0) {
          this.$Message.error('请填写商品数量')
          return
        }
        if (item.sale_price === 0) {
          this.$Message.error('请填写零售价')
        }
      })
    }
  }
}
</script>
