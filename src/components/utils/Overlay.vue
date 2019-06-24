<template>
  <v-fade-transition>
    <div
      :class="mode"
      class="overlay"
      v-if="mLoading"
    >
      <slot/>
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'overlay',
  props: {
    value: {
      validator: prop =>
        typeof prop === 'undefined' || typeof prop === 'boolean',
      default: undefined,
      required: false
    },
    mode: {
      type: String,
      default: 'lit',
      required: false
    }
  },

  computed: {
    appLoading() {
      return this.$store.state.loading
    },

    mLoading() {
      const { value: l, appLoading: al } = this
      return typeof l === 'boolean' ? l : al
    }
  }
}
</script>
