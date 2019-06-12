<template>
  <div>
     <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getGoodsInfo } from '@/api/goods'

export default {
  name: 'goods_info',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '货物名称', key: 'name', sortable: true },
        { title: '货物型号', key: 'model' },
        { title: '类别名称', key: 'type_name' },
        { title: '库存数量', key: 'num', editable: true },
        { title: '货物单价', key: 'sale_price' },
        { title: '品牌', key: 'brand' },
        { title: '适用车型', key: 'car_type' },
        { title: '存放位置', key: 'location' },
        { title: '备注信息', key: 'comment' }
      ],
      tableData: []
    }
  },
  mounted () {
    getGoodsInfo().then(res => {
      this.tableData = res.data.info
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
