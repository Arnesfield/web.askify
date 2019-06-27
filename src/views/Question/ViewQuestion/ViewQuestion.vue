<template>
  <no-data-layout
    class="fill-height"
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
  >
    <!-- TODO: show question here -->
    {{ item }}

    <view-question-no-data slot="no-data"/>
  </no-data-layout>
</template>

<script>
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import { ViewQuestionNoData } from '@/components/Question/NoData'

export default {
  name: 'view-question',
  components: {
    NoDataLayout,
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
