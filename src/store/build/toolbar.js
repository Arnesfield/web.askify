import { createState, createModel } from '@/store/builder'

const build = {
  icon: ['changeIcon', null],
  searchable: ['makeSearchable', false]
}

const state = createState(build)
const model = createModel('toolbar', build)

export { state, model }
