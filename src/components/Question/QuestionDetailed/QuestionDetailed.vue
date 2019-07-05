<template>
  <v-card v-bind="itemProps">
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
      <div
        class="text-output"
        v-html="item.content"
      />

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
        v-if="lastUpdatedText"
        class="mt-3 caption text--secondary font-italic"
      >
        last updated on <strong v-text="lastUpdatedText"/>
      </div>
    </v-card-text>

    <v-card-actions
      v-if="cardActions.length > 0"
      class="pt-0 px-3 justify-center"
    >
      <easy-btn
        :key="i"
        v-bind="action"
        v-for="(action, i) in cardActions"
      />
    </v-card-actions>

    <v-divider class="mx-2"/>

    <v-list
      dense
      two-line
      class="transparent"
    >
      <v-list-tile
        ripple
        :to="{
          path: `/profile/${item.user.id}`,
          query: {
            from: $route.fullPath
          }
        }"
      >
        <v-list-tile-avatar>
          <avatar-view
            :user="item.user"
            :avatar-props="{ size: 32 }"
            class="elevation-2"
          />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-sub-title>asked {{ item.created_at_common }}</v-list-tile-sub-title>
          <v-list-tile-title class="font-weight-bold">{{ item.user.fullname }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <delete-dialog
      v-model="dialog"
      @click:delete="doDelete"
      :dialog-props="{
        title: 'Delete question',
        text: 'This action cannot be undone.'
      }"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { questionsPath } from '@/utils/path'
import * as methods from './methods'
import TagList from '@/components/Tag/TagList'
import EasyBtn from '@/components/utils/EasyBtn'
import AvatarView from '@/components/User/AvatarView'
import DeleteDialog from '@/components/utils/dialogs/DeleteDialog'

export default {
  name: 'question-detailed',
  components: {
    EasyBtn,
    TagList,
    AvatarView,
    DeleteDialog
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

  data: () => ({
    dialog: false
  }),

  computed: {
    ...mapState('auth', ['user']),

    isQuestionByUser() {
      const { user, item } = this
      return item.user.id == user.id
    },

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

      return c === u ? null : ui.common
    },

    cardActions() {
      if (!this.isQuestionByUser) {
        return []
      }

      const btnProps = {
        icon: true,
        small: true,
        dark: true
      }

      const { item } = this

      return [
        {
          icon: 'edit',
          iconProps: {
            small: true
          },
          btnProps: {
            ...btnProps,
            color: 'teal lighten-1',
            to: `/ask/${item.id}`
          }
        },
        {
          icon: 'delete',
          click: this.openDialog,
          iconProps: {
            small: true
          },
          btnProps: {
            ...btnProps,
            color: 'pink accent-2'
          }
        }
      ]
    }
  },

  methods: {
    ...methods,

    openDialog() {
      this.dialog = true
    }
  }
}
</script>
