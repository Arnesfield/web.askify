<template>
  <v-card
    ripple
    :to="mTo"
    v-bind="itemProps"
    class="elevation-0"
  >
    <v-card-text class="px-0">
      <v-layout
        row
        wrap
        justify-center
        class="px-3 mb-2 overflow-x-auto"
      >
        <div
          v-html="`asked ${datetimeText}`"
          class="text--secondary caption"
        />

        <v-spacer/>

        <div
          v-text="answerCountText"
          :class="answerCountClass"
          class="px-2 caption smooth-corners"
        />
      </v-layout>

      <div
        class="px-3 mb-2"
        v-html="item.title"
      />

      <v-layout
        row
        align-center
        class="px-3"
      >
        <avatar-view
          :user="item.user"
          :avatar-props="{ size: 32 }"
        />

        <div
          v-if="!hideUser"
          v-text="item.user.fullname"
          class="pl-2 font-weight-bold"
        />
      </v-layout>

      <tag-list
        class="pl-3 mt-2"
        :items="visibleTags"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { pluralize } from '@/utils'
import TagList from '@/components/Tag/TagList'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'question-item',
  components: {
    TagList,
    AvatarView
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    hideUser: {
      type: Boolean,
      default: false,
      required: false
    },
    tagsCount: {
      type: Number,
      default: 0,
      required: false
    },
    to: {
      type: [String, Function],
      required: false,
      default: undefined
    },
    itemProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  computed: {
    visibleTags() {
      // if tagsCount is 0, show all
      const { tagsCount: c, item } = this
      return c === 0 ? item.tags : item.tags.slice(0, c)
    },

    answerCountText() {
      const { item } = this
      const t = pluralize(item.answers_count, 'answer', 'answers')
      return `${item.answers_count} ${t}`
    },

    answerCountClass() {
      const { answers_count: c } = this.item
      return {
        'error white--text': c <= 0,
        'success white--text': c > 0
      }
    },

    datetimeText() {
      const {
        created_at: c,
        updated_at: u,
        created_at_info: ci,
        updated_at_info: ui
      } = this.item

      return c === u ? ci.human : `${ui.human} (updated)`
    },

    mTo() {
      const { to, item } = this
      return typeof to === 'function' ? to(item) : to
    }
  }
}
</script>
