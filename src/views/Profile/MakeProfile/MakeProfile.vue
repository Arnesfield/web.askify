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
        <v-alert
          color="blue"
          dismissible
          :value="true"
          class="my-0 x-full alert-center"
        >
          <div v-if="isModeCreate">To create your account, start by filling up the required details below.</div>
          <div v-else>Update your profile and keep your preferences up-to-date!</div>
        </v-alert>

        <v-form
          v-model="valid"
          class="pa-3 mb-5"
        >
          <divider-text
            center
            :class="dividerTextClass"
          >
            Name of user
          </divider-text>

          <v-text-field
            v-model="item.fname"
            v-bind="textFieldProps"
            label="First name"
            :rules="[ $vRule('required') ]"
          />

          <v-text-field
            v-model="item.mname"
            v-bind="textFieldProps"
            label="Middle name"
          />

          <v-text-field
            v-model="item.lname"
            v-bind="textFieldProps"
            label="Last name"
            :rules="[ $vRule('required') ]"
          />

          <divider-text
            center
            :class="dividerTextClass"
          >
            More information
          </divider-text>

          <v-text-field
            type="email"
            label="Email"
            v-model="item.email"
            v-bind="textFieldProps"
            prepend-icon="email"
            :rules="[ $vRule('required'), $vRule('email') ]"
          />

          <tags-input
            v-model="item.tags"
            :autocomplete-props="{
              autocompleteProps: {
                label: 'Preferences',
                placeholder: 'Tags / Keywords',
                rules: [ $vRule('required', 'Should have at least 1 tag.') ]
              }
            }"
          />
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
import { User } from '@/entities'
import { backable, makeable } from '@/mixins'
import { formRulesMixin } from '@/utils/formRules'
import { ViewProfileNoData } from '@/components/Profile/NoData'
import DividerText from '@/components/utils/DividerText'
import NoDataLayout from '@/layouts/NoDataLayout'
import TagsInput from '@/components/Tag/TagsInput'

export default {
  name: 'make-profile',
  mixins: [backable, makeable, formRulesMixin],
  components: {
    TagsInput,
    DividerText,
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
      const { id } = this.user || {}
      return id == this.userId
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
          url: `users/${this.userId}`
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
    },

    dividerTextClass() {
      return 'px-3 mb-3 my-2 subheading text--secondary text-xs-center'
    },

    textFieldProps() {
      return {
        color: 'accent',
        clearable: true,
        disabled: this.loading
      }
    }
  },

  created() {
    // do not fetch if updating auth user
    if (this.isMe) {
      this.item = new User({ ...this.user })
    } else {
      this.fetch()
    }
  },

  methods: {
    ...methods,

    goBack() {
      const { userId } = this
      if (userId) {
        this.$router.replace(`/profile/${userId}`)
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>
