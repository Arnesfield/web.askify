<template>
  <no-data-layout>
    <!-- TODO: update content -->
    asker dashboard

    <my-questions-no-data
      slot="no-data"
    />
  </no-data-layout>
</template>

<script>
import { app } from '@/helpers'
import NoDataLayout from '@/layouts/NoDataLayout'
import MyQuestionsNoData from '@/components/Question/NoData'

export default {
  name: 'asker-dashboard',
  components: {
    NoDataLayout,
    MyQuestionsNoData
  },

  data: () => ({
    list: []
  }),

  beforeCreate() {
    app.title('Ask a question')
  },
  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      // TODO: fetch my questions
    }
  }
}
</script>
