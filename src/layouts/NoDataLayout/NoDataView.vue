<template>
  <div class="text-xs-center pa-3">
    <template v-if="noDataLoading">
      <span
        v-if="!mProgress"
        v-html="loadingText"
        class="body-1 text--secondary"
      />
      <template v-else>
        <v-progress-circular
          indeterminate
          :color="mProgress.color"
        />
        <div
          v-if="mProgress.text"
          v-html="mProgress.text"
          :class="mProgress.textClass"
        />
      </template>
    </template>

    <template v-else>
      <slot
        name="prepend"
        v-bind="{ hasData }"
      />

      <slot
        v-bind="{ hasData }"
        v-if="$scopedSlots.default"
      />
      <div
        v-else
        v-html="msg"
        :class="msgClass"
      />

      <slot
        name="append"
        v-bind="{ hasData }"
      />
      <v-btn
        v-if="!noReload"
        v-bind="mBtnReloadProps"
        @click="$emit('reload', $event)"
      >
        Reload
      </v-btn>

      <slot
        name="append-last"
        v-bind="{ hasData }"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'no-data-view',
  props: {
    hasData: {
      type: Boolean,
      default: false,
      required: false
    },
    msg: {
      type: String,
      required: false,
      default: 'No items to show :('
    },
    msgClass: {
      type: [String, Object],
      required: false,
      default: 'caption mb-2'
    },
    btnReloadProps: {
      type: Object,
      default: null,
      required: false
    },
    progress: {
      type: [Boolean, Object],
      default: false,
      required: false
    },
    noReload: {
      type: Boolean,
      default: false,
      required: false
    },
    loadingText: {
      type: String,
      required: false,
      default: 'Loading...'
    },
    loading: {
      type: Boolean,
      validator: prop =>
        typeof prop === 'undefined' || typeof prop === 'boolean',
      default: undefined,
      required: false
    }
  },

  computed: {
    appLoading() {
      return this.$store.state.loading
    },

    noDataLoading() {
      const { loading: l, appLoading: al } = this
      return typeof l === 'boolean' ? l : al
    },

    mBtnReloadProps() {
      return {
        class: 'white primary--text font-weight-bold',
        ...this.btnReloadProps
      }
    },

    mProgress() {
      const { progress } = this
      if (!progress) {
        return progress
      }

      const props = {
        color: 'primary',
        text: '',
        textClass: 'text--secondary mt-3'
      }

      const isTrue = typeof progress === 'boolean' && progress
      return isTrue ? props : {
        ...props,
        ...progress
      }
    }
  }
}
</script>
