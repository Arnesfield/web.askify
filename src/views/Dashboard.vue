<template>
  <asker-dashboard v-if="isAsker"/>
  <expert-dashboard v-else-if="isExpert"/>

  <v-container
    v-else
    fill-height
  >
    <v-layout
      fill-height
      align-center
      justify-center
    >
      <div class="body-1 text--secondary">It seems that you are not a normal user ;)</div>
    </v-layout>
  </v-container>
</template>

<script>
import * as Dashboards from '@/components/Dashboard'

export default {
  name: 'dashboard',
  components: {
    ...Dashboards
  },

  computed: {
    isAsker() {
      return this.$store.getters['auth/isAsker']
    },
    isExpert() {
      return this.$store.getters['auth/isExpert']
    }
  }
}
</script>
