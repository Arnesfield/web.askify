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
      <question-detailed
        v-if="item"
        v-bind="{ item }"
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
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import { ViewQuestionNoData } from '@/components/Question/NoData'
import QuestionDetailed from '@/components/Question/QuestionDetailed'

export default {
  name: 'view-question',
  components: {
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
