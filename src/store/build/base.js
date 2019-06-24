import { createState, createModel } from '@/store/builder'

const build = {
  title: ['setTitle', null],
  loading: ['loadApp', false]
}

const state = createState(build)
const model = createModel('app', build, true)

export { state, model }
