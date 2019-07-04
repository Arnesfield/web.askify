<template>
  <no-data-view
    @reload="$emit('reload', $event)"
    :progress="{ text: 'Loading question and answer...' }"
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
      {{ msg.icon || 'block' }}
    </v-icon>

    <div
      class="headline"
      v-text="msg.title"
    />
    <div
      v-text="msg.subtitle"
      class="my-2 subheading"
    />
  </no-data-view>
</template>

<script>
import { NoDataView } from '@/layouts/NoDataLayout'

const msgs = {
  hasNoQuestion: {
    title: 'Question not found',
    subtitle: 'This question is not available.'
  },
  hasNoAnswer: {
    title: 'Answer not found',
    subtitle: 'This answer is not available.'
  },
  other: {
    // TODO: change this icon
    icon: 'block',
    title: 'An error occurred.',
    subtitle: 'Something went wrong.'
  }
}

export default {
  name: 'make-answer-no-data',
  components: {
    NoDataView
  },
  props: {
    hasNoQuestion: {
      type: Boolean,
      default: false,
      required: false
    },
    hasNoAnswer: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  computed: {
    msg() {
      const { hasNoQuestion: q, hasNoAnswer: a } = this
      return msgs[q ? 'hasNoQuestion' : (a ? 'hasNoAnswer' : 'other')]
    }
  }
}
</script>
