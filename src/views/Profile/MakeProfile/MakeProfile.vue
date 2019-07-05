<template>
  <no-data-layout
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
    class="fill-height max-h no-toolbar"
  >
    <view-profile-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-layout
      column
      v-if="item"
    > 
      <v-flex class="overflow-y-auto">
        <v-form
          v-model="valid"
          class="pa-3 mb-5"
        >
          <!-- TODO: update content -->
          {{ item }}
        </v-form>
      </v-flex>

      <v-divider/>
      <div class="py-2 px-2 white">
        <v-btn
          block
          large
          class="ma-0"
          color="primary"
          :disabled="loading || !valid"
          @click="save"
        >
          <span v-text="btnSaveText"/>
        </v-btn>
      </div>
    </v-layout>
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import * as methods from './methods'
import { backable, makeable } from '@/mixins'
import { formRulesMixin } from '@/utils/formRules'
import { ViewProfileNoData } from '@/components/Profile/NoData'
import NoDataLayout from '@/layouts/NoDataLayout'

export default {
  name: 'make-profile',
  mixins: [backable, makeable, formRulesMixin],
  components: {
    NoDataLayout,
    ViewProfileNoData
  },

  data: () => ({
    item: null,
    valid: false
  }),

  computed: {
    ...mapState(['loading']),
    ...mapState('auth', ['user']),

    userId() {
      return this.isModeUpdate ? this.user.id : undefined
    },

    hasData() {
      return !!this.item
    },

    isMe() {
      return this.user.id == this.userId
    },

    requestProps() {
      const props = {
        create: {
          //! NOTE: register if create!!
          method: 'post',
          url: 'auth/register'
        },
        update: {
          method: 'patch',
          url: `users/${this.answerId}`
        }
      }

      return props[this.mode]
    },

    btnSaveText() {
      const props = {
        create: {
          true: 'Creating account...',
          false: 'Create account'
        },
        update: {
          true: 'Updating...',
          false: 'Update profile'
        }
      }

      return props[this.mode][this.loading] || 'Save profile'
    }
  },

  created() {
    // do not fetch if updating auth user
    if (this.isMe) {
      this.item = this.user
    } else {
      this.fetch()
    }
  },

  methods: {
    ...methods
  }
}
</script>
