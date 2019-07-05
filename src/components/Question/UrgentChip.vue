<template>
  <v-layout
    row
    class="my-3"
    justify-center
    v-if="text"
  >
    <v-chip
      dark
      outline
      color="deep-orange"
    >
      <v-icon>new_releases</v-icon>
      <span
        class="ml-1"
        v-text="`urgent for ${text}`"
      />
    </v-chip>
  </v-layout>
</template>

<script>
export default {
  name: 'urgent-chip',
  props: {
    text: {
      default: null,
      required: false,
      validator: prop =>
        prop === null ||
        typeof prop === 'string' ||
        typeof prop === 'undefined'
    }
  }
}
</script>
