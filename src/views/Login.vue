<template>
  <v-card class="y-full transparent elevation-0 max-h">
    <v-layout
      column
      class="y-full"
    >
      <v-progress-linear
        class="ma-0"
        height="4"
        indeterminate
        :active="loading"
      />

      <v-flex class="pt-4 overflow-y-auto">
        <v-layout
          row
          align-center
          justify-center
        >
          <v-layout column>
            <div class="mx-auto">
              <v-img
                width="144"
                :src="logoSrc"
              />
            </div>

            <div class="text-xs-center mb-5">
              <h1 class="display-1 primary--text text--darken-1 text-uppercase font-weight-bold">Askify</h1>
              <div
                v-html="copyright"
                class="primary--text text--darken-2 caption mono"
              />
            </div>

            <v-card-text
              style="max-width: 520px"
              class="pt-0 pb-3 px-3 mx-auto"
            >
              <v-form v-model="valid">
                <v-text-field
                  required
                  ref="email"
                  type="email"
                  label="Email"
                  prepend-icon="email"
                  autocomplete="email"
                  v-model="email"
                  :disabled="loading"
                  :rules="[ $vRule('required', 'ID Number is required') ]"
                  @keypress.enter="submit"
                />

                <password-field
                  v-model="password"
                  v-bind="{ textFieldProps }"
                  @enter="submit"
                />

                <v-btn
                  block
                  large
                  class="mt-3"
                  color="primary"
                  @click="submit"
                  :disabled="loading || !valid"
                >
                  <span v-text="loading ? 'Logging in...' : 'Login'"/>
                </v-btn>

                <div class="mt-4 text-xs-left">
                  <router-link to="/reset">Forgot password?</router-link>
                </div>
              </v-form>
            </v-card-text>
          </v-layout>
        </v-layout>
      </v-flex>

      <v-divider/>
      <div class="white pa-2 text-xs-center caption">
        <span class="text--secondary">Don't have an account? <router-link
          to="/register"
          class="font-weight-bold"
        >Sign up</router-link>.</span>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import { getMessage } from '@/api'
import { imgPath } from '@/utils/path'
import { copyright, snackbar } from '@/helpers'
import { formRulesMixin } from '@/utils/formRules'
import PasswordField from '@/components/utils/PasswordField'

export default {
  name: 'login',
  mixins: [formRulesMixin],
  components: {
    PasswordField
  },

  data: () => ({
    email: '',
    password: '',

    loading: false,
    valid: false
  }),

  computed: {
    copyright: () => copyright,

    logoSrc() {
      return `${imgPath}/icons/144x144.png`
    },

    textFieldProps() {
      return {
        required: true,
        disabled: this.loading,
        label: 'Password',
        prependIcon: 'lock',
        rules: [this.$vRule('required', 'Password is required')]
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.focusOnInput()
    }, 100)
  },

  methods: {
    submit() {
      if (!this.valid) {
        return
      }

      const data = {
        with: ['roles', 'tags'],
        email: this.email,
        password: this.password
      }

      this.loading = true
      this.$store.dispatch('auth/login', {
        data,
        success: res => {
          const text = getMessage(res, 'Logged in successfully.')
          snackbar(text)

          // goto dashboard
          this.$router.replace(this.$route.query.to || '/dashboard')
        },
        error: e => {
          const text = getMessage(e.response, 'Unable to login.')
          snackbar(text)
          this.focusOnInput()
        },
        lastly: () => {
          this.loading = false
        }
      })
    },

    focusOnInput() {
      this.$nextTick(() => {
        if (this.$refs.email) {
          this.$refs.email.focus()
        }
      })
    }
  }
}
</script>
