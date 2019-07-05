<template>
  <v-dialog
    :persistent="loading"
    transition="dialog-transition"
    v-bind="{ value, ...dialogProps }"
    @input="$emit('input', $event)"
  >
    <slot>
      <v-card>
        <v-layout column>
          <v-progress-linear
            height="4"
            class="ma-0"
            color="accent"
            indeterminate
            :active="loading"
          />

          <v-card-title class="title pb-0">
            <v-layout row>
              <slot name="prepend-title"/>
              <slot name="title">{{ title }}</slot>
              <slot name="append-title"/>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <slot name="prepend-text"/>
            <slot name="text">{{ text }}</slot>
            <slot name="append-text"/>
          </v-card-text>

          <v-card-actions v-if="mBtns.length > 0">
            <slot name="prepend-actions"/>

            <!-- ! btnProps is not the actual props but for the EasyBtn -->
            <easy-btn
              :key="i"
              v-for="(btn, i) in mfBtns"
              v-bind="{
                ...btn,
                ...btnProps,
                clickProps,
              }"
            />

            <slot name="append-actions"/>
          </v-card-actions>
        </v-layout>
      </v-card>
    </slot>
  </v-dialog>
</template>

<script>
import EasyBtn from './EasyBtn'

const props = {
  value: {
    type: Boolean,
    default: false,
    required: false
  }
}

const EasyDialog = {
  name: 'easy-dialog',
  components: {
    EasyBtn
  },
  props: {
    ...props,
    title: {
      type: String,
      default: null,
      required: false
    },
    text: {
      type: String,
      default: null,
      required: false
    },
    btns: {
      type: [Object, Array],
      required: false,
      default() {
        return []
      }
    },
    dialogProps: {
      type: Object,
      default: null,
      required: false
    },
    btnProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  data: () => ({
    loading: false
  }),

  computed: {
    mBtns() {
      const { btns } = this
      const isArray = btns ? btns.constructor.name === 'Array' : false
      return isArray ? btns : (btns ? [btns] : [])
    },

    mfBtns() {
      return this.mBtns.map(btn => {
        // actual props
        const { btnProps: props } = btn || {}
        const newProps = { disabled: this.loading, ...props }

        return {
          ...btn,
          btnProps: newProps
        }
      })
    },

    clickProps() {
      return [this.open, this.load]
    }
  },

  methods: {
    // getBtnActualProps(ebp) {
    //   const props = ebp ? ebp.btnProps : null
    //   return { disabled: this.loading, ...props }
    // },

    open(b) {
      this.$emit('input', this.getBool(b))
    },
    load(b) {
      this.loading = this.getBool(b)
    },
    getBool(b, def = true) {
      return typeof b === 'boolean' ? b : def
    }
  }
}

export default EasyDialog
export { EasyDialog, props }
</script>
