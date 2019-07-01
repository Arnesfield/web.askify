<template>
  <v-avatar
    v-if="user"
    v-bind="mAvatarProps"
    :title="title || user.fullname"
  >
    <img
      v-bind="{ alt }"
      :src="imgSrc.text"
      v-if="imgSrc && imgSrc.isImg"
    />
    <span
      v-else
      v-text="imgSrc.text"
      :style="textStyle"
      :class="textClass"
    />
  </v-avatar>
</template>

<script>
import { avatarsPath } from '@/utils/path'

export default {
  name: 'avatar-view',
  props: {
    user: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar'
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    avatarProps: {
      type: Object,
      default: null,
      required: false
    },
    textClass: {
      type: [String, Object],
      default: 'white--text',
      required: false
    }
  },

  computed: {
    textStyle() {
      const { size } = this.mAvatarProps || {}
      return size ? { 'font-size': `${size / 2.25}px !important` } : null
    },

    mAvatarProps() {
      return {
        size: 48,
        color: 'accent',
        ...this.avatarProps
      }
    },

    imgSrc() {
      const { user } = this

      if (typeof user.avatar !== 'string' || user.avatar.trim().length > 0) {
        return {
          isImg: false,
          text: user.fullname.charAt(0).toUpperCase()
        }
      }

      return {
        isImg: true,
        text: `${avatarsPath}${user.avatar}`
      }
    }
  }
}
</script>
