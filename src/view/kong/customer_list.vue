<template>
  <div>
     <Card>
      <i-button type="primary" @click="showDetail=true">添加</i-button>
      <tables ref="tables" editable searchable search-place="top" v-model="customerData" :columns="customerColumns"/>
    </Card>
    <!-- <Modal
      v-model="showDetail"
      :title="modelTitle"
      @on-ok="showDetail=false">
      <i-form ref="customerForm" :model="addCustomerForm" :rules="addCustomerRule" inline>
        <Form-item prop="phone">
          <i-input type="text" v-model="addCustomerForm.phone" placeholder="请输入名称">
          </i-input>
        </Form-item>
        <Form-item prop="name">
          <i-input type="text" v-model="addCustomerForm.name" placeholder="请输入名称">
          </i-input>
        </Form-item>
        <Form-item prop="comment">
          <i-input type="text" v-model="addCustomerForm.comment" placeholder="备注信息">
          </i-input>
        </Form-item>
        <Form-item>
          <i-button type="primary" @click="AddCustomerSubmit">添加</i-button>
        </Form-item>
      </i-form>
    </Modal> -->
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getCustomerInfo, addCustomerInfo } from '@/api/customer'

export default {
  name: 'customer_list',
  components: {
    Tables
  },
  data () {
    return {
      customerColumns: [
        { title: '编号', key: 'id', sortable: true },
        { title: '类型', key: 'type' },
        { title: '用户姓名', key: 'name' },
        { title: '联系方式', key: 'phone' },
        { title: '微信', key: 'wechat' },
        { title: '通信地址', key: 'address' },
        { title: '车型', key: 'car_type' },
        { title: '车牌号', key: 'car_number' },
        { title: '联系人', key: 'contact_name' },
        { title: '银行账户', key: 'bank_account' },
        { title: '欠款', key: 'debt' },
        { title: '总消费', key: 'total_cost' },
        { title: '还款', key: 'repayment' },
        { title: '备注信息', key: 'comment' },
        {
          title: '操作',
          key: 'handle',
          options: ['修改'],
          button: [
            (h, params, vm) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary'
                  },
                  style: {
                    width: '50%',
                    display: 'flex',
                    'justify-content': 'center'
                  },
                  on: {
                    click: () => {
                      this.showDetail = true
                      this.modelType = 2
                      this.modelTitle = '修改商品类别'
                      this.addCategoryForm.type_name = params.row.type_name
                      this.addCategoryForm.comment = params.row.comment
                      this.addCategoryForm.id = params.row.id
                    }
                  }
                }, '修改')
              ])
            }
          ]
        }
      ],
      // 参数
      customerData: [],
      addcustomerForm: {
        phone: '',
        name: '',
        comment: ''
      },
      addCustomerRule: {
        phone: [
          { required: true, message: '请选择类别' }
        ],
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        comment: [
          { type: 'string', max: 20, message: '长度不能大于20位', trigger: 'blur' }
        ]
      },
      showDetail: false,
      modelTitle: '添加新客户'
    }
  },
  mounted () {
    this.getCustomerListData()
  },
  methods: {
    getCustomerListData () {
      getCustomerInfo().then(res => {
        this.customerData = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    },
    AddCustomerSubmit () {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          addCustomerInfo(this.addCustomerForm).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('添加成功!')
              // 清理form数据
              this.showDetail = false
              this.getCustomerListData()
            } else {
              this.$Message.success('添加失败请重试!')
            }
          }).catch(err => {
            console.log(err)
            this.$Message.success('添加失败请重试!')
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    ModifyCustomerSubmit () {
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
