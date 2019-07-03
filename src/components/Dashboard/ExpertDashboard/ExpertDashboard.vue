<!-- TODO: same with AskerDashboard huh? -->
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
          />! Here are questions catered for you. We are glad you are enjoying our platform!
        </div>
      </v-alert>

      <v-flex class="overflow-y-auto">
        <v-divider/>
        <question-list
          v-bind="{ items }"
          :item-props="{
            to: item => `/questions/${item.id}`
          }"
        />
        <v-divider/>
      </v-flex>

      <v-divider/>
      <div class="pa-14 grey lighten-3">
        <div class="avoid-fab">No more questions.</div>
      </div>
    </v-layout>

    <my-questions-no-data
      slot="no-data"
      @reload="fetch"
    />
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import { app } from '@/helpers'
import { pluralize } from '@/utils'
import { MyQuestionsNoData } from '@/components/Question/NoData'
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import QuestionList from '@/components/Question/QuestionList'

export default {
  name: 'expert-dashboard',
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

    ...mapState('auth', ['uid', 'user'])
  },

  beforeCreate() {
    app.title('Questions for you')
  },
  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
