<template>
  <no-data-layout
    class="fill-height"
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
  >
    <v-layout
      column
      fill-height
      v-if="item"
    >
      <question-detailed
        v-bind="{ item }"
      />

      <v-alert
        :value="true"
        color="blue"
        class="x-full my-0"
      >
        {{ item.answers.length }} available {{ answersText }}
      </v-alert>
        

      <v-divider/>

      <answer-list
        :items="item.answers"
        :item-props="{ question: item }"
      />
    </v-layout>

    <view-question-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-tooltip
      left
      slot="append"
      open-delay="50"
      close-delay="50"
      v-if="isExpert"
    >
      <v-btn
        fab
        right
        fixed
        bottom
        slot="activator"
        color="primary"
        :to="`/questions/${questionId}/answer`"
      >
        <v-icon class="wh-auto">send</v-icon>
      </v-btn>
      <span>Answer question</span>
    </v-tooltip>
  </no-data-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { pluralize } from '@/utils'
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import AnswerList from '@/components/Answer/AnswerList'
import { ViewQuestionNoData } from '@/components/Question/NoData'
import QuestionDetailed from '@/components/Question/QuestionDetailed'

export default {
  name: 'view-question',
  components: {
    AnswerList,
    NoDataLayout,
    QuestionDetailed,
    ViewQuestionNoData
  },

  data: () => ({
    item: null
  }),

  computed: {
    questionId() {
      return this.$route.params.id
    },

    hasData() {
      return !!this.item
    },

    answersText() {
      return pluralize(this.item.answers.length, 'answer', 'answers')
    },

    ...mapGetters('auth', ['isExpert'])
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
