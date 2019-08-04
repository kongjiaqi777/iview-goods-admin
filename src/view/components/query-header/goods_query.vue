<template>
    <div>
        <Form-item prop="query-header.goods_id" label="商品名称">
            <i-select v-model="query_header.goods_id" placeholder="请选择商品">
                <i-option v-for="item in goodsList" :key="item.id" :value="item.name" :label="item.name"></i-option>
            </i-select>
        </Form-item>
    </div>
</template>

<script>
import { getGoodsInfo } from '@/api/goods'

export default {
  name: 'query-header',
  data () {
    return {
      // 商品列表返回数据
      goodsList: [],
      // 商品列表查询参数
      goods_query: [],
      // query参数列
      query_header: {
        goods_id: 0
      }
    }
  },
  methods: {
    getGoodList () {
      getGoodsInfo().then(res => {
        this.goodsList = res.data.info.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
