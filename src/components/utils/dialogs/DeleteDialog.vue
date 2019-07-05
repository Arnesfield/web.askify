<template>
  <easy-dialog
    @input="$emit('input', $event)"
    v-bind="{ value, ...mDialogProps }"
  >
    <v-spacer slot="prepend-actions"/>
  </easy-dialog>
</template>

<script>
import { EasyDialog, props } from '@/components/utils/EasyDialog'

export default {
  name: 'delete-dialog',
  components: {
    EasyDialog
  },
  props: {
    ...props,
    dialogProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  computed: {
    mDialogProps() {
      const vm = this

      return {
        ...this.dialogProps,
        btns: [
          {
            text: 'Delete',
            click() {
              return vm.$emit('click:delete', ...arguments)
            },
            btnProps: {
              outline: true,
              color: 'error'
            }
          }
        ]
      }
    }
  }
}
</script>
