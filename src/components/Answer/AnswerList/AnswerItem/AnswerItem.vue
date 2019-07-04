<template>
  <no-data-layout
    has-data
    class="pa-0 white"
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

    <v-card
      v-bind="itemProps"
      :class="{
        'deep-orange-opac-3': !isViewable,
        'mb-4 accent-opac-4 elevation-4': isBest
      }"
    >
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
            v-if="isPayable"
            v-text="paidCountText"
            class="px-2 ml-1 caption smooth-corners orange white--text"
          />

          <div
            v-text="'best answer'"
            v-if="isBest"
            class="px-2 ml-1 caption smooth-corners cyan white--text"
          />
        </v-layout>

        <v-layout
          row
          wrap
          justify-center
          class="px-3 mb-2"
        >
          <div class="text-xs-center">
            <div
              class="text--secondary caption"
              v-html="`answered ${datetimeText}`"
            />

            <div
              v-if="isPayable && isViewable"
              v-text="`${item.price} ${item.currency}`"
              class="mt-1 orange--text text--darken-3 font-weight-bold"
            />
          </div>
        </v-layout>

        <div
          v-if="isViewable"
          v-html="item.content"
          class="px-3 text-output"
        />

        <v-alert
          v-else
          outline
          :value="true"
          color="deep-orange"
          class="mx-3 mt-3 py-2 subheading text-xs-center smooth-corners"
        >
          <div>This answer requires a payment of</div>
          <strong v-text="`${item.price} ${item.currency}`"/>.
        </v-alert>
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
        class="transparent"
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
import { filterIfList } from '@/utils'
import { app, gotoPayment } from '@/helpers'
import NoDataLayout from '@/layouts/NoDataLayout'
import mixins from './mixins'
import * as methods from './methods'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'answer-item',
  mixins: [...mixins],
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

    isQuestionByUser() {
      const { user, question } = this
      return question.user.id == user.id
    },
    isAnswerByUser() {
      const { user, item } = this
      return item.user.id == user.id
    },

    cardActions() {
      const btnProps = {
        icon: true,
        small: true,
        dark: true
      }

      if (this.isAnswerByUser) {
        const { question, item } = this

        return [
          {
            icon: 'edit',
            iconProps: {
              small: true
            },
            btnProps: {
              ...btnProps,
              color: 'teal lighten-1',
              to: `/questions/${question.id}/answer/${item.id}`
            }
          },
          {
            icon: 'delete',
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

      if (!this.isAsker) {
        return []
      }

      const {
        didUpvote,
        didDownvote,
        isBest,
        isViewable,
        isQuestionByUser
      } = this

      const actions =  [
        {
          icon: 'payment',
          text: 'Pay-to-view',
          if: !isViewable,
          click: this.pay,
          btnProps: {
            ...btnProps,
            small: false,
            icon: false,
            depressed: true,
            color: 'primary',
            class: 'smooth-corners'
          }
        },
        // vote
        {
          icon: 'keyboard_arrow_up',
          if: isViewable,
          click: () => this.vote(didUpvote ? 'unvote' : 'upvote'),
          btnProps: {
            ...btnProps,
            outline: !didUpvote,
            color: 'teal lighten-1'
          }
        },
        {
          icon: 'keyboard_arrow_down',
          if: isViewable,
          click: () => this.vote(didDownvote ? 'unvote' : 'downvote'),
          btnProps: {
            ...btnProps,
            outline: !didDownvote,
            color: 'warning'
          }
        },
        {
          icon: 'star',
          if: isViewable && isQuestionByUser,
          click: () => this.best(),
          btnProps: {
            ...btnProps,
            outline: !isBest,
            color: 'cyan'
          }
        }
      ]

      return actions.filter(filterIfList)
    }
  },

  methods: {
    ...methods,

    pay() {
      app.load()
      this.loading = true

      const { item, user } = this
      this.$nextTick(() => {
        gotoPayment(item, user, this.$route.fullPath)
      })
    },

    fetchAll() {
      this.$emit('fetch-all')
    },

    actionClick(click, e) {
      typeof click === 'function' ? click(e) : undefined
    }
  }
}
</script>
