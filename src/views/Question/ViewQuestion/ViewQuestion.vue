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

    <view-question-no-data slot="no-data"/>
  </no-data-layout>
</template>

<script>
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
