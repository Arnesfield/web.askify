<template>
  <v-toolbar
    app
    dark
    height="58"
    clipped-right
    color="primary"
    :clipped-left="clipped"
  >
    <v-toolbar-side-icon
      v-if="!icon"
      @click.stop="toggle"
    />
    <v-btn
      icon
      v-else
      v-bind="icon"
      @click.stop="icon.click"
    >
      <v-icon>{{ icon.text }}</v-icon>
    </v-btn>

    <v-toolbar-title class="title">
      <span v-text="title"/>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { getRouteTitle } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app-toolbar',

  computed: {
    title() {
      return getRouteTitle(this.$route) || 'askify'
    },

    ...mapState('nav', ['clipped']),
    ...mapState('toolbar', ['icon', 'searchable'])
  },

  methods: {
    ...mapMutations('nav', ['toggle'])
  }
}
</script>
