<template>
  <div>
     <Card>
      <i-button type="primary" @click="showDetail=true">添加</i-button>
      <tables ref="tables" editable searchable search-place="top" v-model="categoryData" :columns="categoryColumns"/>
    </Card>
    <Modal
        v-model="showDetail"
        :title="modelTitle"
        @on-ok="showDetail=false">
        <i-form ref="categoryForm" :model="addCategoryForm" :rules="addCategoryRule">
            <Form-item prop="type_name" label="类别">
                <i-input type="text" v-model="addCategoryForm.type_name" placeholder="请输入类别名称">
                </i-input>
            </Form-item>
            <Form-item prop="comment" label="备注信息">
                <i-input type="text" v-model="addCategoryForm.comment" placeholder="备注信息">
                </i-input>
            </Form-item>
            <Form-item>
                <i-button type="primary" @click="AddCategorySubmit">添加</i-button>
            </Form-item>
        </i-form>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getCategoryList, addCategory } from '@/api/goods'

export default {
  name: 'category_list',
  components: {
    Tables
  },
  data () {
    return {
      categoryColumns: [
        { title: '编号', key: 'id', sortable: true },
        { title: '类别名称', key: 'type_name' },
        { title: '备注信息', key: 'comment' },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render (row, column, index) {
            return `<i-button type="primary" size="small" @click="exit(${row.id})">编辑</i-button>`
          }
        }
      ],
      // 参数
      categoryData: [],
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
    this.getCategoryListData()
  },
  methods: {
    getCategoryListData () {
      getCategoryList().then(res => {
        this.categoryData = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    AddCategorySubmit () {
      console.log(this.addCategoryForm)
      this.$refs.categoryForm.validate((valid) => {
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

    },
    exit (index) {
      this.modelTitle = '修改商品类别'
      this.showDetail = true
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
