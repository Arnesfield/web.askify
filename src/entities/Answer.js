import Entity from './Entity'
import { makeFormData } from '@/helpers'
import { addArrayToRequest, addFileToRequest } from '@/api'

const props = ['content', 'price']

export default class Answer extends Entity {
  toFormData(meta) {
    const data = makeFormData(props, this)
    const { tags, img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    if (tags) {
      const tagIds = tags.map(tag => tag.id)
      addArrayToRequest(data, 'tag_ids', tagIds)
    }

    const { isPrivate } = meta || {}
    if (isPrivate) {
      data.append('make_private', 1)
    }

    return data
  }
}
