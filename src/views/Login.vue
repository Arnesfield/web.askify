<template>
  <v-card
    style="max-height: 100vh"
    class="y-full transparent elevation-0"
  >
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
              <div class="primary--text text--darken-2 caption mono">&copy; Askify 2019</div>
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
                  class="mt-3"
                  color="primary"
                  @click="submit"
                  :disabled="loading || !valid"
                >
                  <span v-text="loading ? 'Logging in...' : 'Login'"/>
                </v-btn>

                <div class="mt-4 text-xs-left">
                  <router-link to="/">Forgot password?</router-link>
                </div>
              </v-form>
            </v-card-text>
          </v-layout>
        </v-layout>
      </v-flex>

      <v-divider/>
      <div class="white pa-2 text-xs-center caption">
        <span class="text--secondary">Don't have an account? <router-link
          to="/"
          class="font-weight-bold"
        >Sign up</router-link>.</span>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import { getMessage } from '@/api'
import { snackbar } from '@/helpers'
import { imgPath } from '@/utils/path'
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
    logoSrc() {
      return `${imgPath}logo.png`
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
        with: ['roles'],
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
