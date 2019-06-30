<template>
  <v-card v-bind="itemProps">
    <v-card-text class="px-0">
      <v-layout
        row
        wrap
        justify-center
        class="px-3 mb-2 overflow-x-auto"
      >
        <div
          v-text="voteCountText"
          :class="voteCountClass"
          class="px-2 caption smooth-corners"
        />

        <div
          v-text="'best answer'"
          v-if="item.is_best_at"
          class="px-2 ml-1 caption smooth-corners cyan white--text"
        />
      </v-layout>

      <div
        v-html="item.content"
        class="px-3 text-output"
      />
    </v-card-text>

    <v-divider class="mx-2"/>

    <v-list
      dense
      two-line
    >
      <v-list-tile>
        <v-list-tile-avatar>
          <avatar-view
            :user="item.user"
            :avatar-props="{ size: 32 }"
            class="elevation-2"
          />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-sub-title>answered {{ item.created_at_common }}</v-list-tile-sub-title>
          <v-list-tile-title class="font-weight-bold">{{ item.user.fullname }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!-- TODO: add actions -->
  </v-card>
</template>

<script>
import { pluralize } from '@/utils'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'answer-item',
  components: {
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
    voteCountText() {
      const { item } = this
      const t = pluralize(item.votes_total, 'vote', 'votes')
      return `${item.votes_total} ${t}`
    },

    voteCountClass() {
      const { votes_total: t } = this.item
      return {
        'grey lighten-2': t === 0,
        'error white--text': t < 0,
        'success white--text': t > 0
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
    }
  }
}
</script>
