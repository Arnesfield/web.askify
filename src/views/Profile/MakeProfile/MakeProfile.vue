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
          <template v-if="isModeCreate">
            <divider-text v-bind="dividerTextProps">Account type</divider-text>

            <v-radio-group
              mandatory
              v-model="accountType"
            >
              <v-radio
                value="3"
                label="Asker"
              />
              <v-radio
                value="4"
                label="Expert"
              />
            </v-radio-group>
          </template>

          <divider-text v-bind="dividerTextProps">Name of user</divider-text>

          <v-text-field
            v-model="item.fname"
            v-bind="textFieldProps"
            label="First name"
            prepend-icon="person"
            :rules="[ $vRule('required') ]"
          />

          <v-text-field
            v-model="item.mname"
            v-bind="textFieldProps"
            label="Middle name"
            prepend-icon="people_outline"
          />

          <v-text-field
            v-model="item.lname"
            v-bind="textFieldProps"
            label="Last name"
            prepend-icon="people"
            :rules="[ $vRule('required') ]"
          />

          <divider-text v-bind="dividerTextProps">More information</divider-text>

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

          <!-- if updating, there is optional password change -->
          <v-switch
            ripple
            v-if="isModeUpdate"
            v-model="changePassword"
            label="Click here to change password"
          />

          <v-slide-y-reverse-transition>
            <div v-if="changePassword">
              <divider-text v-bind="dividerTextProps">Passwords</divider-text>

              <password-field
                v-if="isModeUpdate"
                v-model="item.old_password"
                :text-field-props="{
                  ...passwordProps,
                  prependIcon: 'vpn_key',
                  label: 'Old Password'
                }"
              />

              <password-field
                v-model="item.password"
                :text-field-props="{
                  ...passwordProps,
                  prependIcon: 'lock',
                  label: isModeCreate ? 'Password' : 'New Password'
                }"
              />

              <password-field
                v-model="item.passconf"
                :text-field-props="{
                  ...passwordProps,
                  prependIcon: 'lock_outline',
                  label: 'Confirm Password',
                  rules: [
                    ...passwordProps.rules,
                    $vRule('match', item.password, null)
                  ]
                }"
              />
            </div>
          </v-slide-y-reverse-transition>
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
import PasswordField from '@/components/utils/PasswordField'
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
    PasswordField,
    ViewProfileNoData
  },

  data: () => ({
    item: null,
    valid: false,
    accountType: '3',
    changePassword: false
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

    dividerTextProps() {
      return {
        center: true,
        class: 'mb-3 my-2 subheading primary--text text-xs-center'
      }
    },

    textFieldProps() {
      return {
        color: 'accent',
        clearable: true,
        disabled: this.loading
      }
    },

    passwordProps() {
      const { $vRule: r } = this
      return {
        required: true,
        color: 'accent',
        disabled: this.loading,
        rules: [
          r('required', 'Password is required'),
          r('password')
        ]
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

    // change password if create!
    this.changePassword = this.isModeCreate
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
