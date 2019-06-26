import Entity from './Entity'
import { makeFormData } from '@/helpers'
import { addArrayToRequest, addFileToRequest } from '@/api'

const props = ['title', 'content']

export default class Question extends Entity {
  toFormData() {
    const data = makeFormData(props, this)
    const { tags, img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    if (tags) {
      const tagIds = tags.map(tag => tag.id)
      addArrayToRequest(data, 'tag_ids', tagIds)
    }

    return data
  }
}
