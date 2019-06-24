<template>
  <no-data-layout
    class="fill-height"
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
  >
    <v-layout
      column
      fill-height
    >
      <v-alert
        color="blue"
        dismissible
        :value="true"
        class="my-0 x-full alert-center"
      >
        <div>
          Hey <span
            v-text="user.fname"
            class="body-2 underline"
          />! You have asked <span
            v-text="items.length"
            class="body-2 underline"
          /> {{ pluralQuestion }}. We are glad you are enjoying our platform!
        </div>
      </v-alert>

      <v-flex class="overflow-y-auto">
        <v-divider/>
        <question-list
          v-bind="{ items }"
        />
        <v-divider/>
      </v-flex>

      <v-divider/>
      <div class="pa-14 grey lighten-3">
        <div
          class="avoid-fab"
        >
          Click the <span class="body-2">add</span> icon to ask a question.
        </div>
      </div>
    </v-layout>

    <my-questions-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-tooltip
      left
      slot="append"
      open-delay="50"
      close-delay="50"
    >
      <v-btn
        fab
        right
        fixed
        bottom
        slot="activator"
        color="primary"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>Ask a question</span>
    </v-tooltip>
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import { app } from '@/helpers'
import { pluralize } from '@/utils'
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import MyQuestionsNoData from '@/components/Question/NoData'
import QuestionList from '@/components/Question/QuestionList'

export default {
  name: 'asker-dashboard',
  components: {
    NoDataLayout,
    QuestionList,
    MyQuestionsNoData
  },

  data: () => ({
    items: []
  }),

  computed: {
    hasData() {
      return this.items.length > 0
    },

    pluralQuestion() {
      return pluralize(this.items, 'question', 'questions')
    },

    ...mapState('auth', ['user'])
  },

  beforeCreate() {
    app.title('Ask a question')
  },
  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
