<template>
  <v-container
    v-bind="containerProps"
    :fill-height="!noAutoFillHeight && !hasData"
  >
    <slot name="prepend-extra"/>

    <slot v-if="hasData"/>
    <v-layout
      align-center
      justify-center
      v-else-if="!hideNoData"
    >
      <slot
        name="no-data"
        v-if="$slots['no-data']"
      />
      <no-data-view
        v-else
        @reload="$emit('reload', $event)"
        v-bind="{ hasData, loading, ...viewProps }"
      />
    </v-layout>

    <overlay :value="loading"/>

    <slot name="append-extra"/>
  </v-container>
</template>

<script>
import NoDataView from './NoDataView'
import Overlay from '@/components/utils/Overlay'

export default {
  name: 'no-data-layout',
  components: {
    Overlay,
    NoDataView
  },
  props: {
    hasData: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: {
      type: Boolean,
      validator: prop =>
        typeof prop === 'undefined' || typeof prop === 'boolean',
      default: undefined,
      required: false
    },
    hideNoData: {
      type: Boolean,
      default: false,
      required: false
    },
    noAutoFillHeight: {
      type: Boolean,
      default: false,
      required: false
    },
    containerProps: {
      type: Object,
      default: null,
      required: false
    },
    viewProps: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>
