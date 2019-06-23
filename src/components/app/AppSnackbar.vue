<template>
  <v-snackbar
    left
    bottom
    auto-height
    class="snack"
    v-model="model"
    v-bind="{ timeout }"
    :vertical="mode === 'vertical'"
    :multi-line="mode === 'multi-line'"
  >
    <span
      v-html="text"
      class="px-4"
      style="padding-top: 14px; padding-bottom: 14px; max-width: 420px"
    />

    <v-layout class="pr-3">
      <v-spacer/>
      <v-btn
        flat
        :key="i"
        v-for="(btn, i) in btns"
        :to="btn.to"
        :icon="!!btn.icon"
        :color="btn.color"
        :class="btn.class"
        :style="i > 0 ? 'margin-left: 8px' : undefined"
        @click.native="callback(btn, $event)"
      >
        <v-icon v-if="btn.icon">{{ btn.text }}</v-icon>
        <template v-else>{{ btn.text }}</template>
      </v-btn>
    </v-layout>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-snackbar',
  computed: {
    model: {
      get() {
        return this.$store.state.snackbar.model
      },
      set(e) {
        this.$store.commit('snackbar/setModel', e)
      }
    },

    ...mapState('snackbar', ['text', 'mode', 'timeout', 'btns'])
  },

  methods: {
    callback(btn, e) {
      if (typeof btn.click === 'function') {
        btn.click(() => {
          this.model = false
        }, e)
      }
    }
  }
}
</script>
