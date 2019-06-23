<template>
  <v-text-field
    :type="fieldProp.type"
    v-bind="{ value, ...mTextFieldProps }"
    @click:append="toggleType"
    @input="$emit('input', $event)"
    @keypress.enter="$emit('enter', $event)"
  />
</template>

<script>
export default {
  name: 'password-field',
  props: {
    value: {
      type: String,
      default: '',
      required: false
    },
    textFieldProps: {
      type: Object,
      default: null,
      required: false
    }
  },

  data: () => ({
    propIndex: 0,
    fieldProps: [
      {
        type: 'password',
        icon: 'visibility_off'
      },
      {
        type: 'text',
        icon: 'visibility'
      }
    ]
  }),

  computed: {
    fieldProp() {
      return this.fieldProps[this.propIndex]
    },

    mTextFieldProps() {
      const props = {
        autocomplete: 'password',
        appendIcon: this.fieldProp.icon
      }

      return { ...props, ...this.textFieldProps }
    }
  },

  methods: {
    toggleType() {
      this.propIndex = this.propIndex === 0 ? 1 : 0
    }
  }
}
</script>
