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
      <nav-header/>

      <v-flex class="overflow-y-auto">
        <nav-list @click="nav$model = null"/>
      </v-flex>

      <v-divider/>
      <div class="pa-14">
        <span
          v-html="copyright"
          class="primary--text text--darken-2 caption mono"
        />
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { copyright } from '@/helpers'
import * as components from './components'
import { NavStoreModel } from '@/store/models'

export default {
  name: 'app-navigation',
  mixins: [NavStoreModel],
  components: { ...components },

  computed: {
    copyright: () => copyright
  }
}
</script>
