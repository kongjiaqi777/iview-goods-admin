<template>
  <div>
     <Card>
      <i-button type="primary" @click="showDetail=true">添加</i-button>
      <tables ref="tables" editable searchable search-place="top" v-model="supplierData" :columns="supplierColumns"/>
    </Card>
    <!-- <Modal
        v-model="showDetail"
        :title="modelTitle"
        @on-ok="showDetail=false">
        <i-form ref="customerForm" :model="addCustomerForm" :rules="addCustomerRule" inline>
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
import { getSupplierList } from '@/api/supplier'

export default {
  name: 'supplier_list',
  components: {
    Tables
  },
  data () {
    return {
      supplierColumns: [
        { title: '编号', key: 'id', sortable: true },
        { title: '类型', key: 'type' },
        { title: '用户姓名', key: 'name' },
        { title: '联系方式', key: 'phone' },
        { title: '微信', key: 'wechat' },
        { title: '通信地址', key: 'address' },
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
                    }
                  }
                }, '修改')
              ])
            }
          ]
        }
      ],
      // 参数
      supplierData: [],
      addCategoryForm: {
        type_name: '',
        comment: ''
      },
      addCategoryRule: {
        type_name: [
          { required: true, message: '请填写类别名称', trigger: 'blur' }
        ],
        comment: [
          { type: 'string', max: 20, message: '长度不能大于20位', trigger: 'blur' }
        ]
      },
      showDetail: false,
      modelTitle: '添加新商品类别'
    }
  },
  mounted () {
    this.getCustomerListData()
  },
  methods: {
    getCustomerListData () {
      getSupplierList().then(res => {
        this.supplierData = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    },
    AddCustomerSubmit () {
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          addCategory(this.addCategoryForm).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('添加成功!')
              // 清理form数据
              this.showDetail = false
              this.getCategoryListData()
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
    ModifyCategorySubmit () {

    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
