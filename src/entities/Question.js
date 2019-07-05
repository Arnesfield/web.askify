import Entity from './Entity'
import Answer from './Answer'
import { makeFormData } from '@/helpers'
import { addArrayToRequest, addFileToRequest } from '@/api'

const props = ['title', 'content']

export default class Question extends Entity {
  constructor() {
    super(...arguments)

    if (this.answers) {
      // format answers
      this.answers = Answer.collection(this.answers)
    }
  }

  toFormData() {
    const data = makeFormData(props, this)
    const { tags, img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    if (tags) {
      const tagIds = tags.map(
        tag => typeof tag === 'string' ? tag : tag.id
      )
      addArrayToRequest(data, 'tags', tagIds)
    }

    return data
  }
}
