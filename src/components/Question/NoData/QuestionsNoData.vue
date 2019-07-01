<template>
  <no-data-view
    @reload="$emit('reload', $event)"
    :progress="{ text: 'Loading all questions...' }"
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
      question_answer
    </v-icon>

    <div class="headline">No Questions yet</div>
    <div class="my-2 subheading">All questions are shown here.</div>
  </no-data-view>
</template>

<script>
import { NoDataView } from '@/layouts/NoDataLayout'

export default {
  name: 'questions-no-data',
  components: {
    NoDataView
  }
}
</script>
