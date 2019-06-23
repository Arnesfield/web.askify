<template>
  <v-content>
    <app-toolbar/>

    <slot v-if="$slots.default"/>
    <router-view v-else/>
  </v-content>
</template>

<script>
import AppToolbar from '@/components/app/AppToolbar'

export default {
  name: 'app-layout',
  components: {
    AppToolbar
  }
}
</script>
