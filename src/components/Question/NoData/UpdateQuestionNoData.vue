<template>
  <no-data-view
    @reload="$emit('reload', $event)"
    :progress="{ text: 'Loading question...' }"
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
      block
    </v-icon>

    <div class="headline">Unable to load question</div>
    <div class="my-2 subheading">This question is not available.</div>
  </no-data-view>
</template>

<script>
import { NoDataView } from '@/layouts/NoDataLayout'

export default {
  name: 'update-question-no-data',
  components: {
    NoDataView
  }
}
</script>
