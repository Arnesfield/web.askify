const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home')
const About = () => import(/* webpackChunkName: "about" */ '@/views/About')

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
