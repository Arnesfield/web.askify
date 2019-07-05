<template>
  <easy-autocomplete
    @focus="fetch"
    @input="$emit('input', $event)"
    v-bind="{ ...mAutocompleteProps, value, items }"
    :filter-props="['name']"
  >
    <v-chip
      slot="selection"
      slot-scope="{ item }"
    >
      {{ item.name }}
    </v-chip>
  </easy-autocomplete>
</template>

<script>
import * as methods from './methods'
import { EasyAutocomplete, props } from '@/components/utils/EasyAutocomplete'

export default {
  name: 'tags-input',
  components: {
    EasyAutocomplete
  },
  props: {
    ...props,
    // not the same as actual props
    autocompleteProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  data: () => ({
    items: []
  }),

  computed: {
    mAutocompleteProps() {
      const { autocompleteProps: props } = this.autocompleteProps || {}
      const newProps = {
        itemValue: 'id',
        itemText: 'name',
        color: 'accent',
        label: 'Tags / Keywords',
        prependIcon: 'local_offer', // label
        multiple: true,
        // chips: true,
        ...props
      }

      return {
        ...this.autocompleteProps,
        autocompleteProps: newProps
      }
    }
  },

  methods: {
    ...methods
  }
}
</script>
