<template>
  <v-card
    v-bind="itemProps"
    class="elevation-1"
  >
    <v-card-title
      primary-title
      class="title"
    >
      <v-layout row>
        <v-icon>live_help</v-icon>
        <div
          class="ml-2"
          v-text="item.title"
        />
      </v-layout>
    </v-card-title>

    <v-divider class="mx-2"/>

    <v-card-text>
      <div v-html="item.content"/>

      <v-img
        v-if="imgSrc"
        :src="imgSrc"
      />

      <tag-list
        class="mt-3"
        :items="item.tags"
        last-item-class=""
        :chip-props="{ small: true }"
        :layout-props="{ wrap: true }"
      />

      <div
        v-html="lastUpdatedText"
        class="mt-3 caption text--secondary"
      />
    </v-card-text>

    <v-divider/>

    <v-list
      dense
      two-line
    >
      <v-list-tile>
        <v-list-tile-avatar>
          <avatar-view
            :user="item.user"
            :avatar-props="{ size: 32 }"
          />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-sub-title>asked {{ item.created_at_common }}</v-list-tile-sub-title>
          <v-list-tile-title>{{ item.user.fullname }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { backable } from '@/mixins'
import { questionsPath } from '@/utils/path'
import TagList from '@/components/Tag/TagList'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'question-detailed',
  mixins: [backable],
  components: {
    TagList,
    AvatarView
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    itemProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  computed: {
    imgSrc() {
      const { img } = this.item
      return img ? `${questionsPath}${img}` : null
    },

    lastUpdatedText() {
      const {
        created_at: c,
        updated_at: u,
        updated_at_info: ui
      } = this.item

      return c === u ? null : `last updated at ${ui.common}`
    }
  }
}
</script>
