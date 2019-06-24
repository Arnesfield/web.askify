<template>
  <div>
    <template v-for="(item, i) in items">
      <question-item
        :key="`item-${i}`"
        v-bind="{ item, ...itemProps }"
      />

      <v-divider
        :key="`divider-${i}`"
        v-if="i < items.length - 1"
      />
    </template>
  </div>
</template>

<script>
import QuestionItem from './QuestionItem'

export default {
  name: 'question-list',
  components: {
    QuestionItem
  },
  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    itemProps: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>
