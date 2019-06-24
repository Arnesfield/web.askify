<template>
  <basic-layout>
    <template slot="prepend">
      <app-toolbar v-if="!clipped"/>
      <app-navigation/>
      <app-toolbar v-if="clipped"/>
    </template>
  </basic-layout>
</template>

<script>
import { mapState } from 'vuex'
import BasicLayout from './BasicLayout'
import AppToolbar from '@/components/app/AppToolbar'
import AppNavigation from '@/components/app/AppNavigation'

export default {
  name: 'app-layout',
  components: {
    AppToolbar,
    AppNavigation,
    BasicLayout
  },

  computed: {
    ...mapState('nav', ['clipped'])
  }
}
</script>
