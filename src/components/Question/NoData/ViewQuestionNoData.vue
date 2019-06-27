<template>
  <no-data-view
    @reload="$emit('reload', $event)"
    :progress="{ text: 'Loading question and answers...' }"
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

    <div class="headline">Question not found</div>
    <div class="my-2 subheading">This question is not available.</div>
  </no-data-view>
</template>

<script>
import { NoDataView } from '@/layouts/NoDataLayout'

export default {
  name: 'view-question-no-data',
  components: {
    NoDataView
  }
}
</script>
