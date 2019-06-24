import { createState, createModel } from '@/store/builder'

const build = {
  model: ['setModel', null],
  clipped: ['clip', true],
  temporary: ['makeTemporary', false],
  shy: ['makeShy', false]
}

const state = createState(build)
const model = createModel('nav', build)

export { state, model }
