<template>
  <v-btn
    v-bind="btnProps"
    @click="actionClick"
  >
    <slot>
      <v-icon
        v-if="icon"
        v-bind="iconProps"
      >
        {{ icon }}
      </v-icon>

      <span
        class="ml-2"
        v-if="text"
        v-text="text"
      />
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'easy-btn',
  props: {
    icon: {
      type: String,
      default: null,
      required: false
    },
    text: {
      type: String,
      default: null,
      required: false
    },
    click: {
      type: Function,
      required: false,
      default: undefined,
      validator: prop => typeof prop === 'undefined' || typeof prop === 'function'
    },
    clickProps: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    btnProps: {
      type: Object,
      default: null,
      required: false
    },
    iconProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  methods: {
    actionClick(e) {
      this.$emit('click', e, ...this.clickProps)

      // emit other click
      if (typeof this.click === 'function') {
        this.click(e, ...this.clickProps)
      }
    }
  }
}
</script>
