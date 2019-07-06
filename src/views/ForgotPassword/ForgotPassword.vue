<template>
  <no-data-layout
    has-data
    class="pa-0 fill-height max-h no-toolbar"
  >
    <v-layout column>
      <v-flex class="overflow-y-auto">
        <v-alert
          color="blue"
          dismissible
          :value="true"
          class="my-0 x-full alert-center"
        >
          Enter your email to reset your account.
        </v-alert>

        <v-form
          v-model="valid"
          class="pa-3 mb-5"
        >
          <v-text-field
            clearable
            type="email"
            label="Email"
            color="accent"
            v-model="email"
            :disabled="loading"
            prepend-icon="email"
            :rules="[ $vRule('required'), $vRule('email') ]"
            @keydown.enter.prevent="send"
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
          @click="send"
        >
          Reset account
        </v-btn>
      </div>
    </v-layout>
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import { backable } from '@/mixins'
import * as methods from './methods'
import { formRulesMixin } from '@/utils/formRules'
import NoDataLayout from '@/layouts/NoDataLayout'

export default {
  name: 'forgot-password',
  mixins: [backable, formRulesMixin],
  components: {
    NoDataLayout
  },

  data: () => ({
    email: '',
    valid: false
  }),

  computed: {
    ...mapState(['loading'])
  },

  methods: {
    ...methods
  }
}
</script>
