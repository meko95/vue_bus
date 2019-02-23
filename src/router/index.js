import Vue from 'vue'
import Router from 'vue-router'
import ContractList from '@/components/ContractList'
import getContract from '@/components/getContract'
import addContract from '@/components/addContract'
import delContract from '@/components/delContract'
import editContract from '@/components/editContract'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'bus/contract/getContract'
    },
    {
      path:'/bus/contract/',
      name:'ContractList',
      component:ContractList,
      children:[
        {
          path:'getContract',
          component: getContract
        },{
          path:'addContract',
          component:addContract
        },
        {
          path:'delContract',
          component:delContract
        },
        {
          path:'editContract',
          component:editContract
        }
      ]
    }
  ]
})
