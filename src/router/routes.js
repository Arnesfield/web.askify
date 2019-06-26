import AppLayout from '@/layouts/AppLayout'
import BasicLayout from '@/layouts/BasicLayout'

// basic
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login')

// app
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard')
// question
const MakeQuestion = () => import(/* webpackChunkName: "make-question" */ '@/views/Question/MakeQuestion')

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
        component: Login,
        meta: {
          auth: 0,
          title: 'Login'
        }
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
        component: Dashboard,
        meta: {
          auth: [1, 2, 3, 4],
          title: 'Dashboard'
        }
      },

      // question
      {
        path: '/ask',
        name: 'make-question',
        component: MakeQuestion,
        props: {
          mode: 'create'
        },
        meta: {
          auth: [3],
          title: 'Ask a question'
        }
      }
    ]
  }
]
