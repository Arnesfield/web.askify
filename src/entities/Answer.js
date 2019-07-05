import Entity from './Entity'
import { makeFormData } from '@/helpers'
import { addFileToRequest } from '@/api'

const props = ['content', 'price']

export default class Answer extends Entity {
  toFormData(meta) {
    const data = makeFormData(props, this)
    const { img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    const { isPrivate } = meta || {}
    if (isPrivate) {
      data.append('make_private', 1)
    }

    return data
  }
}
