import AppLayout from '@/layouts/AppLayout'
import BasicLayout from '@/layouts/BasicLayout'

// basic
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login')

// app
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard')

export default [
  {
    path: '/',
    redirect: '/login'
  },
  // basic
  {
    path: '',
    component: BasicLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  },

  // app
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  }
]
