<template>
  <no-data-layout
    class="fill-height"
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
  >
    <v-layout
      column
      fill-height
      v-if="item"
    >
      <div class="pa-3 mt-3 mb-2 mx-auto">
        <avatar-view
          :user="item"
          :avatar-props="{ size: 128 }"
          class="elevation-4"
        />
      </div>

      <div
        v-text="item.fullname"
        class="px-3 display-1 text-xs-center"
      />

      <div class="px-3 mt-2 mx-auto">
        <v-chip
          dark
          color="primary lighten-1"
        >
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ userTypeText }}
        </v-chip>
      </div>

      <v-list
        two-line
        class="mt-3 py-0 elevation-1"
      >
        <template v-for="(info, i) in infoList">
          <v-list-tile
            :key="`list-${i}`"
          >
            <v-list-tile-avatar v-if="info.icon">
              <v-icon>{{ info.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title
                v-if="info.title"
              >
                {{ info.title }}
              </v-list-tile-title>

              <v-list-tile-sub-title
                v-if="info.subtitle"
              >
                {{ info.subtitle }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
            :key="`divider-${i}`"
            v-if="i < infoList.length - 1"
          />
        </template>
      </v-list>

      <tag-list
        class="pl-3 mt-4"
        :items="item.tags"
        last-item-class=""
        :layout-props="{ wrap: true }"
      />
    </v-layout>

    <view-profile-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-tooltip
      left
      slot="append"
      open-delay="50"
      close-delay="50"
      v-if="isMe"
    >
      <v-btn
        fab
        right
        fixed
        bottom
        to="/profile/edit"
        slot="activator"
        color="primary"
      >
        <v-icon class="wh-auto">edit</v-icon>
      </v-btn>
      <span>Edit profile</span>
    </v-tooltip>
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import { backable } from '@/mixins'
import * as methods from './methods'
import TagList from '@/components/Tag/TagList'
import NoDataLayout from '@/layouts/NoDataLayout'
import AvatarView from '@/components/User/AvatarView'
import { ViewProfileNoData } from '@/components/Profile/NoData'

export default {
  name: 'view-profile',
  mixins: [backable],
  components: {
    TagList,
    AvatarView,
    NoDataLayout,
    ViewProfileNoData
  },

  data: () => ({
    item: null
  }),

  computed: {
    ...mapState('auth', ['user']),

    userId() {
      return this.$route.params.id
    },
    fromPath() {
      return this.$route.query.from
    },

    hasData() {
      return !!this.item
    },

    isMe() {
      const { id } = this.item || {}
      return this.user.id == id
    },

    isAdmin() {
      const { auth } = this.item || {}
      return auth ? auth.includes(1) || auth.includes(2) : false
    },
    isAsker() {
      const { auth } = this.item || {}
      return auth ? auth.includes(3) : false
    },
    isExpert() {
      const { auth } = this.item || {}
      return auth ? auth.includes(4) : false
    },

    userTypeText() {
      const { isAdmin, isAsker, isExpert } = this
      return isAdmin
        ? 'Administrator'
        : (
          isAsker ? 'Asker' : (
            isExpert ? 'Expert' : 'Other'
          )
        )
    },

    infoList() {
      const { item } = this
      return !item ? [] : [
        {
          icon: 'person',
          title: item.fullname,
          subtitle: 'Full name'
        },
        {
          icon: 'email',
          title: item.email,
          subtitle: 'Email'
        }
      ]
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods,

    goBack() {
      this.$router.replace(this.fromPath || '/')
    }
  }
}
</script>
