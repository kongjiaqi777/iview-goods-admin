<template>
  <div>
    <Card>
      <i-button @click="showDetail=true" type="primary" size="large">添加商品</i-button>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
    </Card>
    <Modal v-model="showDetail" :title="modelTitle" @on-ok="goodsSubmit">
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
          <i-input type="text" v-model="addGoodsForm.num" placeholder="请输入数量">
          </i-input>
        </Form-item>
        <Form-item prop="sale_price" label="建议售价">
          <i-input type="text" v-model="addGoodsForm.sale_price" placeholder="请输入建议售价">
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
        <!-- <Form-item>
          <i-button type="primary" @click="goodsSubmit" v-show="false">确定</i-button>
        </Form-item> -->
        </i-form>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getGoodsInfo, addGoodsInfo, getCategoryList } from '@/api/goods'

export default {
  name: 'goods_info',
  components: {
    Tables
  },
  data () {
    return {
      columns: [ // 商品表显示列
        { title: '货物名称', key: 'name', sortable: true },
        { title: '货物型号', key: 'model' },
        { title: '类别名称', key: 'type_name' },
        { title: '库存数量', key: 'num', editable: true },
        { title: '货物单价', key: 'sale_price' },
        { title: '品牌', key: 'brand' },
        { title: '适用车型', key: 'car_type' },
        { title: '存放位置', key: 'location' },
        { title: '备注信息', key: 'comment' },
        { title: '操作', key: 'id' }
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
        comment: ''
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
      }
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
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          addGoodsInfo(this.addGoodsForm).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('添加成功!')
              // 清理form数据
              this.showDetail = false
              this.getGoodsListData()
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
    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
