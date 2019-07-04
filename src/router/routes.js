import AppLayout from '@/layouts/AppLayout'
import BasicLayout from '@/layouts/BasicLayout'

// basic
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login')

// app
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard')
// question
const Questions = () => import(/* webpackChunkName: "questions" */ '@/views/Question/Questions')
const MakeQuestion = () => import(/* webpackChunkName: "make-question" */ '@/views/Question/MakeQuestion')
const ViewQuestion = () => import(/* webpackChunkName: "view-question" */ '@/views/Question/ViewQuestion')
// answer
const MakeAnswer = () => import(/* webpackChunkName: "make-answer" */ '@/views/Answer/MakeAnswer')

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

      //! question

      // make question
      {
        path: '/ask',
        name: 'create-question',
        component: MakeQuestion,
        props: {
          mode: 'create'
        },
        meta: {
          auth: [3],
          title: 'Ask a question'
        }
      },
      {
        path: '/ask/:id',
        name: 'update-question',
        component: MakeQuestion,
        props: {
          mode: 'update'
        },
        meta: {
          auth: [3],
          title: 'Update question'
        }
      },

      // view question
      {
        path: '/questions',
        name: 'Questions',
        component: Questions,
        meta: {
          auth: [1, 2, 3, 4],
          title: 'All Questions'
        }
      },
      {
        path: '/questions/:id',
        name: 'view-question',
        component: ViewQuestion,
        meta: {
          auth: [1, 2, 3, 4],
          title: 'View question'
        }
      },

      //! answer

      // make answer
      {
        path: '/questions/:qid/answer',
        name: 'create-answer',
        component: MakeAnswer,
        props: {
          mode: 'create'
        },
        meta: {
          auth: [4],
          title: 'Answer question'
        }
      },
      {
        path: '/questions/:qid/answer/:aid',
        name: 'update-answer',
        component: MakeAnswer,
        props: {
          mode: 'update'
        },
        meta: {
          auth: [4],
          title: 'Update answer'
        }
      }
    ]
  }

]
