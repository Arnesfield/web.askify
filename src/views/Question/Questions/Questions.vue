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
            v-if="user"
            v-text="user.fname"
            class="body-2 underline"
          />!
          
          <template v-if="isAsker">
            You can ask a question by clicking on the <strong
              v-text="'add button'"
              class="body-2 underline"
            /> below.
          </template>
          <template v-else-if="isExpert">Here are questions you can answer!</template>
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
        <div
          class="avoid-fab"
        >
          <template v-if="isAsker">
            Click the <span class="body-2">add</span> icon to ask a question.
          </template>
          <template v-else-if="isExpert">No more questions.</template>
        </div>
      </div>
    </v-layout>

    <questions-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-tooltip
      left
      slot="append"
      open-delay="50"
      close-delay="50"
      v-if="isAsker"
    >
      <v-btn
        fab
        right
        fixed
        bottom
        to="/ask"
        slot="activator"
        color="primary"
      >
        <v-icon class="wh-auto">add</v-icon>
      </v-btn>
      <span>Ask a question</span>
    </v-tooltip>
  </no-data-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { pluralize } from '@/utils'
import { QuestionsNoData } from '@/components/Question/NoData'
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import QuestionList from '@/components/Question/QuestionList'

export default {
  name: 'questions',
  components: {
    NoDataLayout,
    QuestionList,
    QuestionsNoData
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

    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAsker', 'isExpert'])
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
