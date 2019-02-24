import Vue from 'vue'
import Router from 'vue-router'
import ContractList from '@/components/ContractList'
import Login from '@/components/Login'
// import axios from "axios"
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/bus/login'
        },
        {
            path:'/bus/contract',
            redirect: '/bus/contract/getContract'
        },
        {
            path: '/bus/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/bus/contract/getContract',
            name: 'ContractList',
            component: ContractList
        }
    ]
})

