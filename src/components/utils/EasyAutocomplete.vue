<template>
  <v-combobox
    ref="select"
    hide-no-data
    return-object
    :search-input.sync="search"
    :append-icon="isEmpty ? 'refresh' : undefined"
    @input="$emit('input', $event)"
    @focus="$emit('focus', openSelect)"
    @click:append="$emit('refresh', openSelect)"
    v-bind="{ ...autocompleteProps, value, items, filter, loading }"
  >
    <template
      v-slot:item="{ item }"
      v-if="$scopedSlots.item"
    >
      <slot
        name="item"
        v-bind="{ item }"
      />
    </template>

    <template
      v-slot:selection="{ item }"
      v-if="$scopedSlots.selection"
    >
      <slot
        name="selection"
        v-bind="{ item }"
      />
    </template>
  </v-combobox>
</template>

<script>
import { searchComparator } from '@/utils'

const props = {
  value: {
    required: false,
    default: undefined
  }
}

const EasyAutocomplete = {
  name: 'easy-autocomplete',
  props: {
    ...props,
    items: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    filterProps: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    autocompleteProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  data: () => ({
    search: null,
    loading: false
  }),

  computed: {
    isEmpty() {
      return !this.loading && this.items.length === 0
    }
  },

  methods: {
    openSelect() {
      const ref = this.$refs.select
      if (ref && typeof ref.onClick === 'function') {
        ref.onClick()
      }
    },

    // ux
    filter(e, search) {
      search = search.toString().toLowerCase()
      const fn = e => searchComparator(e, search)
      return this.filterProps.some(prop => fn(e[prop]))
    }
  }
}

export default EasyAutocomplete
export { EasyAutocomplete, props }
</script>
