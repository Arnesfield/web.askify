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
      :to="icon.to"
      @click.stop="icon.click"
    >
      <v-icon>{{ icon.text }}</v-icon>
    </v-btn>

    <v-toolbar-title class="headline">
      <span>askify</span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app-toolbar',

  computed: {
    ...mapState('nav', ['clipped']),
    ...mapState('toolbar', ['icon', 'searchable'])
  },

  methods: {
    ...mapMutations('nav', ['toggle'])
  }
}
</script>
