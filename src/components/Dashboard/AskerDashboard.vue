<template>
  <no-data-layout
    :has-data="list.length > 0"
  >
    <!-- TODO: update content -->
    asker dashboard

    <my-questions-no-data
      slot="no-data"
      @reload="fetch"
    />
  </no-data-layout>
</template>

<script>
import request from '@/api'
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
      app.load(true)

      request({
        url: 'questions',
        method: 'get',
        params: {
          where: {
            user_id: this.$store.state.auth.uid
          }
        },
        success: res => {
          this.list = res.data
        },
        error: () => {
          this.list = null
        },
        lastly: () => {
          app.load(false)
        }
      })
    }
  }
}
</script>
