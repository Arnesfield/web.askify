import Entity from './Entity'
import { addFileToRequest } from '@/api'
import { makeFormData } from '@/helpers'

const props = ['title', 'content']

export default class Question extends Entity {
  toFormData() {
    const data = makeFormData(props, this)
    const { img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    return data
  }
}
