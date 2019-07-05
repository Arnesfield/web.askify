<template>
  <v-dialog
    lazy
    persistent
    width="290"
    :value="dialog"
    @input="$emit('update:dialog', $event)"
  >
    <template
      v-slot:activator="{ on }"
      v-if="$scopedSlots.activator"
    >
      <slot
        v-bind="{ on }"
        name="activator"
      />
    </template>

    <v-time-picker
      scrollable
      v-model="time"
    >
      <v-spacer/>

      <easy-btn
        :key="i"
        v-bind="action"
        v-for="(action, i) in actions"
      />
    </v-time-picker>
  </v-dialog>
</template>

<script>
import EasyBtn from './EasyBtn'

const currTime = () => new Date().toTimeString().substr(0, 8)

export default {
  name: 'dialog-time-picker',
  components: {
    EasyBtn
  },
  props: {
    dialog: Boolean,
    closeOnOk: Boolean,
    value: {
      required: true,
      validator: prop => prop === null || typeof prop === 'string'
    }
  },

  data: () => ({
    time: null
  }),

  computed: {
    actions() {
      return [
        {
          text: 'Cancel',
          click: () => this.$emit('update:dialog', false),
          btnProps: {
            flat: true
          }
        },
        {
          text: 'Ok',
          click: this.onOk,
          btnProps: {
            outline: true
          }
        }
      ]
    }
  },

  watch: {
    dialog(dialog) {
      // on open, reset time if there is no value
      if (dialog) {
        const { value: v } = this
        this.setTime(v || undefined)
      }
    }
  },

  methods: {
    setTime(t) {
      this.time = t || currTime()
    },

    onOk() {
      this.$emit('input', this.time)
      if (this.closeOnOk) {
        this.$emit('update:dialog', false)
      }
    }
  }
}
</script>
