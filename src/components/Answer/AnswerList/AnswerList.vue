<template>
  <div>
    <template v-for="(item, i) in items">
      <answer-item
        class="mb-3"
        :key="`item-${i}`"
        v-bind="{ item, ...itemProps }"
      />
    </template>
  </div>
</template>

<script>
import AnswerItem from './AnswerItem'

export default {
  name: 'answer-list',
  components: {
    AnswerItem
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
