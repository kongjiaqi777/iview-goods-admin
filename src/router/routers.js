import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/home',
    name: '商品管理',
    component: Main,
    redirect: '/home',
    meta: {
      title: '商品列表',
      icon: 'md-apps'
    },
    children: [
      {
        path: '/home',
        name: '销售商品列表',
        meta: {
          title: 'goods',
          icon: 'md-car'
        },
        component: () => import('@/view/kong/goods_info')
      },
      {
        path: '/home',
        name: '旧物商品列表',
        meta: {
          title: 'old',
          icon: 'md-basket'
        },
        component: () => import('@/view/kong/old_goods')
      }
    ]
  },
  {
    path: '/purchase_order',
    name: '订单管理',
    component: Main,
    meta: {
      title: 'asyncOK',
      icon: 'md-lock'
    },
    children: [
      {
        path: '/sales_order',
        name: '销售订单',
        meta: {
          title: 'asyncOK',
          icon: 'md-magnet'
        },
        component: () => import('@/view/kong/sales_order')
      },
      {
        path: '/purchase_order',
        name: '采购订单',
        meta: {
          title: 'asyncOK',
          icon: 'md-list'
        },
        component: () => import('@/view/kong/purchase_order')
      }
    ]
  },
  {
    path: '/customer_list',
    name: '顾客管理',
    component: Main,
    meta: {
      title: 'asyncOK',
      icon: 'md-contacts'
    },
    children: [
      {
        path: '/customer_list',
        name: '顾客管理',
        meta: {
          title: 'asyncOK',
          icon: 'md-contacts'
        },
        component: () => import('@/view/kong/customer_list')
      }
    ]
  },
  {
    path: '/supplier_list',
    name: '供应商管理',
    component: Main,
    meta: {
      title: 'asyncOK',
      icon: 'md-cart'
    },
    children: [
      {
        path: '/supplier_list',
        name: '供应商管理',
        meta: {
          title: 'asyncOK',
          icon: 'md-cart'
        },
        component: () => import('@/view/kong/supplier_list')
      }
    ]
  },
  {
    path: '/payment_list',
    name: '还款记录',
    component: Main,
    meta: {
      title: 'asyncOK',
      icon: 'md-calculator'
    },
    children: [
      {
        path: '/payment_list',
        name: '还款记录',
        meta: {
          title: 'asyncOK',
          icon: 'md-calculator'
        },
        component: () => import('@/view/kong/payment_list')
      }
    ]
  },
  {
    path: '/manage',
    name: '配置管理',
    component: Main,
    meta: {
      title: 'asyncOK',
      icon: 'md-build'
    },
    children: [
      {
        path: '/category_list',
        name: '类别列表',
        meta: {
          title: 'asyncOK',
          icon: 'md-cog'
        },
        component: () => import('@/view/kong/category_list')
      },
      {
        path: '/unitList',
        name: '单位管理',
        meta: {
          title: 'asyncOK',
          icon: 'md-cube'
        },
        component: () => import('@/view/kong/unitList')
      }
    ]
  }
]
