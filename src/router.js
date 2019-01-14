import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Order from './views/Order.vue'
import Detail from './views/Detail.vue'
import Scan from './views/Scan.vue'
import Foodstock from './views/Foodstock.vue'
import Foodstatus from './views/Foodstatus.vue'
import Manager from './views/Manager.vue'
import Billing from './views/Billing.vue'
import Waiter from './views/Waiter.vue'
import Image from './views/Image.vue'
import ImageLink from './views/ImageLink.vue'
import ImageUser from './views/ImageUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'scan',
      component: Scan
    },
    {
      path: '/book',
      name: 'book',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/foodstock',
      name: 'foodstock',
      component: Foodstock
    },
    {
      path: '/foodstatus',
      name: 'foodstatus',
      component: Foodstatus
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager
    },
    {
      path: '/billing',
      name: 'billing',
      component: Billing
    },
    {
      path: '/waiter',
      name: 'waiter',
      component: Waiter
    },
    {
      path: '/image',
      name: 'image',
      component: Image
    },
    {
      path: '/image-link',
      name: 'imageLink',
      component: ImageLink
    },
    {
      path: '/image-user',
      name: 'imageUser',
      component: ImageUser
    }
  ]
})
