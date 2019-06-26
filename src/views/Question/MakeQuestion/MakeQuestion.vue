<template>
  <v-container class="pa-0">
    <v-alert
      color="blue"
      type="info"
      :value="isModeCreate"
      class="my-0 x-full alert-center"
    >
      <div>Feel free to ask for professional help from who are experts in their field.</div>
    </v-alert>
    
    <v-form v-model="valid">
      <!-- TODO: update content -->
    </v-form>
  </v-container>
</template>

<script>
import { makeable } from '@/mixins'
import * as methods from './methods'

export default {
  name: 'make-question',
  mixins: [makeable],

  data: () => ({
    item: null,
    valid: false
  }),

  computed: {
    questionId() {
      return this.$route.params.id
    },

    requestProps() {
      const props = {
        create: {
          method: 'post',
          url: 'questions'
        },
        update: {
          method: 'patch',
          url: `questions/${this.questionId}`
        }
      }

      return props[this.mode]
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
