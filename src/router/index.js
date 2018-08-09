import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import singlecustomer from '@/components/singlecustomer'
import addappointment from '@/components/addappointment'
import addpet from '@/components/addpet'
import addcustomer from '@/components/addcustomer'
import editcustomers from '@/components/editcustomers'
import editpet from '@/components/editpet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/customer/:clientId',
      name: 'singlecustomer',
      component: singlecustomer
    },
    {
      path: '/customer/create',
      name: 'addcustomer',
      component: addcustomer
    },
    {
      path: '/customer/edit/:clientId',
      name: 'editcustomers',
      component: editcustomers
    },
    {
      path: '/appointment/create',
      name: 'addappointment',
      component: addappointment
    },
    {
      path: '/pet/create',
      name: 'addpet',
      component: addpet
    },
    {
      path: '/pet/edit/:clientId',
      name: 'editpet',
      component: editpet
    }
  ],
  mode: 'history'
})
