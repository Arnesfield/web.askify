<template>
  <basic-layout>
    <template slot="prepend">
      <app-toolbar/>
    </template>
  </basic-layout>
</template>

<script>
import BasicLayout from './BasicLayout'
import AppToolbar from '@/components/app/AppToolbar'

export default {
  name: 'app-layout',
  components: {
    AppToolbar,
    BasicLayout
  }
}
</script>
