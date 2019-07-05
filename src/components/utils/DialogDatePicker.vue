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

    <v-date-picker
      scrollable
      v-model="date"
      :min="minDate"
    >
      <v-spacer/>

      <easy-btn
        :key="i"
        v-bind="action"
        v-for="(action, i) in actions"
      />
    </v-date-picker>
  </v-dialog>
</template>

<script>
import EasyBtn from './EasyBtn'

const currDate = () => new Date().toISOString().substr(0, 10)

export default {
  name: 'dialog-date-picker',
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
    date: null,
    minDate: null
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
      // on open, reset dates if there is no value
      if (dialog) {
        const { value: v } = this
        this.setDates(v || undefined)
      }
    }
  },

  methods: {
    setDates(d) {
      d = d || currDate()
      this.date = d
      this.minDate = currDate()
    },

    onOk() {
      this.$emit('input', this.date)
      if (this.closeOnOk) {
        this.$emit('update:dialog', false)
      }
    }
  }
}
</script>
