<template>
  <v-app>
    <!-- use v-content on layouts or components -->
    <router-view/>

    <app-snackbar/>
  </v-app>
</template>

<script>
import AppSnackbar from '@/components/app/AppSnackbar'

export default {
  name: 'app',
  components: {
    AppSnackbar
  }
}
</script>
