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
      <!-- TODO: update content -->
      {{ item }}
    </v-layout>

    <view-profile-no-data
      slot="no-data"
      @reload="fetch"
    />
  </no-data-layout>
</template>

<script>
import { backable } from '@/mixins'
import * as methods from './methods'
import NoDataLayout from '@/layouts/NoDataLayout'
import { ViewProfileNoData } from '@/components/Profile/NoData'

export default {
  name: 'view-profile',
  mixins: [backable],
  components: {
    NoDataLayout,
    ViewProfileNoData
  },

  data: () => ({
    item: null
  }),

  computed: {
    userId() {
      return this.$route.params.id
    },
    fromPath() {
      return this.$route.query.from
    },

    hasData() {
      return !!this.item
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods,

    goBack() {
      this.$router.replace(this.fromPath || '/')
    }
  }
}
</script>
