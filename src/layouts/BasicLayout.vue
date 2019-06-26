<template>
  <v-content>
    <slot name="prepend"/>

    <slot v-if="$slots.default"/>
    <v-slide-y-transition v-else>
      <router-view/>
    </v-slide-y-transition>

    <slot name="append"/>

    <v-progress-linear
      indeterminate
      height="4"
      color="accent"
      style="top: 0; z-index: 5;"
      class="ma-0 fixed"
      :active="loading"
    />
  </v-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'basic-layout',

  computed: {
    ...mapState(['loading'])
  }
}
</script>
