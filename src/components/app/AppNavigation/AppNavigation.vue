<template>
  <v-navigation-drawer
    ref="nav"
    :app="!nav$shy"
    :fixed="nav$shy"
    v-model="nav$model"
    :clipped="nav$clipped"
    :temporary="nav$temporary"
  >
    <v-layout
      column
      fill-height
    >
      <v-flex class="overflow-y-auto">
        <nav-list @click="nav$model = null"/>
      </v-flex>

      <v-divider/>
      <div class="pa-3">
        <span class="primary--text text--darken-2 caption mono">&copy; Askify 2019</span>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { NavList } from './components'
import { NavStoreModel } from '@/store/models'

export default {
  name: 'app-navigation',
  mixins: [NavStoreModel],
  components: {
    NavList
  }
}
</script>
