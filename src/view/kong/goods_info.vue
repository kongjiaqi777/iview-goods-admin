<template>
  <div>
    <Card>
      <i-button @click="showDetail=true, this.modelType=1, this.modelTitle='添加商品'" type="primary" size="large">添加商品</i-button>
      <i-table :columns="columns" :data="tableData"></i-table>
    </Card>
    <Modal v-model="showDetail" :title="modelTitle" @on-ok="goodsSubmit" @on-cancel="clearFormData">
      <i-form ref="goodsForm" :model="addGoodsForm" :rules="addGoodsRule" :label-width="80">
        <Form-item prop="name" label="商品名称">
          <i-input type="text" v-model="addGoodsForm.name" placeholder="请输入商品名称">
          </i-input>
        </Form-item>
        <Form-item prop="model" label="商品型号">
          <i-input type="text" v-model="addGoodsForm.model" placeholder="请输入商品型号">
          </i-input>
        </Form-item>
        <Form-item prop="category_id" label="商品类别">
          <i-select v-model="addGoodsForm.category_id" placeholder="请选择商品类别">
            <i-option v-for="item in categoryItem" :key="item.id" :label="item.type_name" :value="item.id"></i-option>
          </i-select>
        </Form-item>
        <Form-item prop="num" label="商品库存">
          <i-input type="number" v-model="addGoodsForm.num" placeholder="请输入数量">
          </i-input>
        </Form-item>
        <Form-item prop="sale_price" label="建议售价">
          <i-input type="number" v-model="addGoodsForm.sale_price" placeholder="请输入建议售价">
          </i-input>
        </Form-item>
        <Form-item prop="brand" label="品牌">
          <i-input type="text" v-model="addGoodsForm.brand" placeholder="请输入品牌">
          </i-input>
        </Form-item>
        <Form-item prop="car_type" label="适用车型">
          <i-input type="text" v-model="addGoodsForm.car_type" placeholder="请输入适用车型">
          </i-input>
        </Form-item>
        <Form-item prop="location" label="存放位置">
          <i-input type="text" v-model="addGoodsForm.location" placeholder="请输入位置">
          </i-input>
        </Form-item>
        <Form-item prop="comment" label="备注信息">
          <i-input type="text" v-model="addGoodsForm.comment" placeholder="请输入备注信息">
          </i-input>
        </Form-item>
        </i-form>
    </Modal>
  </div>
</template>

<script>
// import Tables from '_c/tables'
import { getGoodsInfo, addGoodsInfo, getCategoryList, modifyGoodsInfo } from '@/api/goods'
// import * as util from '@/utils/util'
// import { uptime } from 'os';
export default {
  name: 'goods_info',
  // components: {
  //   Tables
  // },
  data () {
    return {
      columns: [ // 商品表显示列
        { title: '货物名称', key: 'name', sortable: true },
        { title: '货物型号', key: 'model' },
        { title: '类别名称', key: 'type_name' },
        { title: '库存数量', key: 'num', editable: true },
        {
          title: '货物单价',
          key: 'sale_price',
          render: (h, params) => {
            return h('div',
              this.montyFormatterOutput(params.row.sale_price)
              // util.montyFormatterOutpot(params.row.sale_price)
              // (parseInt(params.row.sale_price) / 100).toFixed(2)
            )
          }
        },
        { title: '品牌', key: 'brand' },
        { title: '适用车型', key: 'car_type' },
        { title: '存放位置', key: 'location' },
        { title: '备注信息', key: 'comment' },
        {
          title: '操作',
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
                      this.showDetail = true
                      this.modelType = 2
                      this.modelTitle = '修改商品信息'
                      this.addGoodsForm.name = params.row.name
                      this.addGoodsForm.model = params.row.model
                      this.addGoodsForm.category_id = params.row.category_id
                      this.addGoodsForm.num = String(params.row.num)
                      this.addGoodsForm.sale_price = String(params.row.sale_price)
                      this.addGoodsForm.brand = params.row.brand
                      this.addGoodsForm.car_type = params.row.car_type
                      this.addGoodsForm.location = params.row.location
                      this.addGoodsForm.comment = params.row.comment
                      this.addGoodsForm.id = params.row.id
                    }
                  }
                }, '修改')
              ]
            )
          }
        }
      ],
      tableData: [], // 商品表数据
      modelTitle: '添加商品', // 标题
      showDetail: false, // 是否显示模态框
      addGoodsForm: { // 添加商品数据
        name: '',
        model: '',
        category_id: 0,
        num: 0,
        sale_price: 0,
        brand: '',
        car_type: '',
        location: '',
        comment: '',
        id: 0
      },
      addGoodsRule: { // 添加validate
        name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        category_id: [
          { required: true, message: '请选择类别' }
        ],
        num: [
          { required: true, message: '请填写库存数量', trigger: 'blur' }
        ],
        sale_price: [
          { required: true, message: '请填写建议零售价', trigger: 'blur' }
        ]
      },
      categoryItem: { // 类别列表
      },
      modelType: 1 // 对话框类别 1添加 2更新
    }
  },
  mounted () {
    this.getGoodsListData()
    this.getCategoryListData()
  },
  methods: {
    getGoodsListData () { // 获取商品列表
      getGoodsInfo().then(res => {
        this.tableData = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    },
    getCategoryListData () { // 获取类别列表
      getCategoryList().then(res => {
        this.categoryItem = res.data.info
      }).catch(err => {
        console.log(err)
      })
    },
    goodsSubmit () { // 添加商品
      console.log(this.addGoodsForm)
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          this.addGoodsForm.sale_price = this.moneyFormatterInput(this.addGoodsForm.sale_price)
          if (this.modelType === 1) {
            addGoodsInfo(this.addGoodsForm).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('添加成功!')
                // 清理form数据
                this.showDetail = false
                this.getGoodsListData()
                this.clearFormData()
              } else {
                this.$Message.error('添加失败请重试!')
                this.clearFormData()
              }
            }).catch(err => {
              console.log(err)
              this.$Message.error('添加失败请重试!')
              this.clearFormData()
            })
          } else if (this.modelType === 2) {
            modifyGoodsInfo(this.addGoodsForm).then(res => {
              if (res.data.code === 0) {
                this.$Message.success('修改成功!')
                // 清理form数据
                this.showDetail = false
                this.getGoodsListData()
                this.clearFormData()
              } else {
                this.$Message.error('修改失败请重试!')
                this.clearFormData()
              }
            })
          }
        } else {
          this.$Message.error('表单验证失败!')
          this.clearFormData()
        }
      })
    },
    clearFormData () {
      this.addGoodsForm.name = ''
      this.addGoodsForm.model = ''
      this.addGoodsForm.category_id = 0
      this.addGoodsForm.num = ''
      this.addGoodsForm.sale_price = ''
      this.addGoodsForm.brand = ''
      this.addGoodsForm.car_type = ''
      this.addGoodsForm.location = ''
      this.addGoodsForm.comment = ''
      this.addGoodsForm.id = 0
    },
    clickEditRow (params) {
      this.showDetail = true
      this.modelType = 2
      this.modelTitle = '修改商品信息'
      this.addGoodsForm.name = params.row.name
      this.addGoodsForm.model = params.row.model
      this.addGoodsForm.category_id = params.row.category_id
      this.addGoodsForm.num = String(params.row.num)
      this.addGoodsForm.sale_price = String(params.row.sale_price)
      this.addGoodsForm.brand = params.row.brand
      this.addGoodsForm.car_type = params.row.car_type
      this.addGoodsForm.location = params.row.location
      this.addGoodsForm.comment = params.row.comment
      this.addGoodsForm.id = params.row.id
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
