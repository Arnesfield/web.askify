<template>
  <v-layout
    row
    v-bind="layoutProps"
    v-if="items.length > 0"
    class="overflow-x-auto"
  >
    <span
      :key="i"
      v-for="(item, i) in items"
      :class="{ [lastItemClass]: i === items.length - 1 }"
    >
      <v-chip v-bind="chipProps">{{ item.name }}</v-chip>
    </span>
  </v-layout>
</template>

<script>
export default {
  name: 'tag-list',
  props: {
    items: {
      type: Array,
      required: true
    },
    lastItemClass: {
      type: String,
      required: false,
      default: 'pr-3'
    },
    layoutProps: {
      type: Object,
      default: null,
      required: false
    },
    chipProps: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>
