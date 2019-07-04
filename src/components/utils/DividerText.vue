<template>
  <v-layout
    row
    align-center
  >
    <v-divider v-if="center || right"/>
    <slot/>
    <v-divider v-if="!right"/>
  </v-layout>
</template>

<script>
const directions = ['center', 'right']

const props = directions.reduce((props, d) => {
  props[d] = {
    type: Boolean,
    default: false,
    required: false
  }

  return props
}, {})

export default {
  name: 'divider-text',
  props
}
</script>
