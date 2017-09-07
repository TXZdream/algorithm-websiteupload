import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/URLList'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})
