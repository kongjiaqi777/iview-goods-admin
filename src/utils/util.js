/*
 *首先是相互调用，接收的地方用import，输出的地方用export
 *比如这里面需要用到cookie.js中的方法，那么就要先把cookie引用进来，这个思想跟后面的引用是一致的
 */
// import cookie from './cookie'

/*
 *接下来是定义全局函数
 *因为全局函数是要给外部使用的，所以需要将函数用export告知外部即可
 *比如我们在这里定义了日期的格式，供后面组件统一改变
 */
// money*100
export function showPayWay (pay) {
  switch (pay) {
    case 1:
      return '现金'
    case 2:
      return '微信'
    case 3:
      return '支付宝'
    case 4:
      return '银行卡'
  }
}

export function showPayOff (payOff) {
  switch (payOff) {
    case 1:
      return '已付款'
    case 2:
      return '欠款'
    case 3:
      return '部分付款'
    case 4:
      return '还上期欠款'
  }
}
