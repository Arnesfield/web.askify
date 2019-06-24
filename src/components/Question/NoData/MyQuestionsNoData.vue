<template>
  <no-data-view
    @reload="$emit('reload', $event)"
    :progress="{ text: 'Loading your questions...' }"
    :btn-reload-props="{
      outline: true,
      color: 'primary',
      class: 'font-weight-bold'
    }"
  >
    <v-icon
      size="128"
      color="grey lighten-1"
      class="mb-3"
    >
      live_help
    </v-icon>

    <div class="headline">No Questions</div>
    <div class="my-2 subheading">Your questions are shown here.</div>
  </no-data-view>
</template>

<script>
import { NoDataView } from '@/layouts/NoDataLayout'

export default {
  name: 'my-questions-no-data',
  components: {
    NoDataView
  }
}
</script>
