import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import home from '@/components/home'
import login from '@/components/login'
import newtopic from '@/components/newTopic'
import topic from '@/components/topic'
import { store } from '../store/store.js'



Vue.use(Router)

export default new Router({
  routes: [
    { 
      name: 'login',
      path: '/login', 
      component: login 
    },
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/newTopic',
      name: 'newtopic',
      component: newtopic,
      beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token')){
                next()
          }
          else{
             next('/login')
          }
      }
    },
    {
      path: '/topic',
      name: 'topic',
      component: topic,
      beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token')){
                next()
          }
          else{
             next('/login')
          }
      }
    },
  ],

  
})