<template>
  <v-card
    ripple
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
          v-html="item.created_at_info.human"
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

      <div
        v-if="!hideUser"
        v-text="item.user.fullname"
        class="px-3 font-weight-bold"
      />

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

export default {
  name: 'question-item',
  components: {
    TagList
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
    }
  }
}
</script>