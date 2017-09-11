import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Mall from '@/pages/Mall'
import MainPage from '@/pages/MainPage'
import Classify from '@/pages/Classify'
import Me from '@/pages/Me'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/',
      name:'MainPage',
      component:MainPage,
      children:[
        {
          path:'',
          name:'Mall',
          component:Mall
        },
        {
          path:'classify',
          name:'Classify',
          component:Classify
        },
        {
          path:'me',
          name:'Me',
          component:Me
        }
      ]
    }

  ]
})
