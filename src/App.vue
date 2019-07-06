<template>
  <v-app>
    <!-- use v-content on layouts or components -->
    <router-view/>

    <app-snackbar/>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { app, snackbar } from '@/helpers'
import AppSnackbar from '@/components/app/AppSnackbar'

export default {
  name: 'app',
  components: {
    AppSnackbar
  },

  computed: {
    ...mapGetters('auth', ['isAuth'])
  },

  watch: {
    isAuth(e) {
      if (!e) {
        // goto login
        app.load(false)
        this.$router.push('/login')
        snackbar('Logged out successfully.')
      }
    }
  }
}
</script>
