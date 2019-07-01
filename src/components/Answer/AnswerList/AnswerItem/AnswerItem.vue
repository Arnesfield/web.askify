<template>
  <no-data-layout
    has-data
    class="pa-0"
    v-bind="{ loading }"
    :container-props="{ fluid: true }"
  >
    <no-data-layout
      slot="overlay"
      class="pa-0 fill-height"
      v-bind="{ loading }"
      :container-props="{ fluid: true }"
      :view-props="{
        loading,
        progress: {
          text: 'Updating answer...',
          textClass: 'lit pa-1 font-weight-bold subheading',
          props: {
            width: 6,
            size: 40,
            color: 'blue'
          }
        }
      }"
    />

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
            v-text="'paid'"
            v-if="isPayable"
            class="px-2 ml-1 caption smooth-corners orange white--text"
          />

          <div
            v-text="'best answer'"
            v-if="item.is_best_at"
            class="px-2 ml-1 caption smooth-corners cyan white--text"
          />
        </v-layout>

        <div
          v-if="isViewable"
          v-html="item.content"
          class="px-3 text-output"
        />

        <div
          v-else
          class="mx-3 mt-3 py-2 subheading text-xs-center error smooth-corners white--text"
        >
          This answer requires a payment of <strong v-text="`$${item.price}`"/>.
        </div>
      </v-card-text>

      <v-card-actions
        v-if="cardActions.length > 0"
        class="pt-0 px-3 justify-center"
      >
        <v-btn
          :key="i"
          v-bind="action.btnProps"
          v-for="(action, i) in cardActions"
          @click="actionClick(action.click, $event)"
        >
          <v-icon
            v-if="action.icon"
            v-bind="action.iconProps"
          >
            {{ action.icon }}
          </v-icon>

          <span
            class="ml-2"
            v-if="action.text"
            v-text="action.text"
          />
        </v-btn>
      </v-card-actions>

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
    </v-card>
  </no-data-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { pluralize } from '@/utils'
import { filterIfList } from '@/utils'
import NoDataLayout from '@/layouts/NoDataLayout'
import * as methods from './methods'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'answer-item',
  components: {
    AvatarView,
    NoDataLayout
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    question: {
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

  data: () => ({
    loading: false
  }),

  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAsker']),

    isViewable() {
      return this.item.is_viewable
    },
    isPayable() {
      return !!this.item.privated_at
    },
    isQuestionByUser() {
      const { user, question } = this
      return question.user.id == user.id
    },

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
    },

    cardActions() {
      if (!this.isAsker) {
        return []
      }

      const { isViewable, isQuestionByUser } = this

      const btnProps = {
        icon: true,
        small: true,
        dark: true
        // outline: true,

      }

      const actions =  [
        {
          icon: 'payment',
          text: 'Pay-to-view',
          if: !isViewable,
          btnProps: {
            ...btnProps,
            icon: false,
            color: 'primary'
          }
        },
        {
          icon: 'keyboard_arrow_up',
          if: isViewable,
          btnProps: {
            ...btnProps,
            color: 'teal lighten-1'
          }
        },
        {
          icon: 'keyboard_arrow_down',
          if: isViewable,
          btnProps: {
            ...btnProps,
            color: 'warning'
          }
        },
        {
          icon: 'star',
          if: isViewable && isQuestionByUser,
          btnProps: {
            ...btnProps,
            color: 'cyan'
          }
        }
      ]

      return actions.filter(filterIfList)
    }
  },

  methods: {
    ...methods,

    actionClick(click, e) {
      typeof click === 'function' ? click(e) : undefined
    }
  }
}
</script>
