<template>
  <v-navigation-drawer
    ref="nav"
    :app="!nav$shy"
    :fixed="nav$shy"
    v-model="nav$model"
    :clipped="nav$clipped"
    :temporary="nav$temporary"
  >
    <!-- TODO: update content -->
  </v-navigation-drawer>
</template>

<script>
import { NavStoreModel } from '@/store/models'

export default {
  name: 'app-navigation',
  mixins: [NavStoreModel]
}
</script>
