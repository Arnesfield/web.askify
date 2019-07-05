import Entity from './Entity'
import { makeFormData } from '@/helpers'
import { addArrayToRequest, addFileToRequest } from '@/api'

const props = ['fname', 'mname', 'lname', 'email']

export default class User extends Entity {
  toFormData(meta) {
    const { props: metaProps } = meta || {}
    const data = makeFormData({ ...props, ...metaProps }, this)

    const { tags, img_src: img, fileImgSrc: fimg } = this
    addFileToRequest(data, fimg || img, 'file_img_src', 'img_src')

    // FIXME: duplicate code
    if (tags) {
      const tagIds = tags.map(
        tag => typeof tag === 'string' ? tag : tag.id
      )
      addArrayToRequest(data, 'tags', tagIds)
    }

    return data
  }
}
