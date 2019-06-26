<template>
  <span>
    <template v-for="(item, i) in mItems">
      <!-- TODO: duplicate code from ListHelper -->
      <template v-if="item.constructor.name === 'String'">
        <v-divider
          v-if="item === '_'"
          :key="`tile-divider-${i}`"
        />
        <v-subheader
          v-else
          :key="`tile-subheader-${i}`"
        >{{ item }}</v-subheader>
      </template>

      <v-list-tile
        v-else
        :to="item.to"
        :key="`tile-${i}`"
        v-bind="{ ...item.tileProps }"
        :ripple="item.ripple || ripple"
        :active-class="item.activeClass || activeClass"
        :class="typeof item.class !== 'undefined' ? item.class : 'nav-item mr-3'"
        @click="onItemClick(item)"
      >
        <v-list-tile-action class="minw-42x">
          <v-icon
            :color="item.iconColor"
            :class="item.tileClass || tileClass"
          >{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content :class="item.tileClass || tileClass">
          <!-- 'subheading': !item.navSubtitle -->
          <v-list-tile-title
            :class="{
              'body-1': item.navSubtitle
            }"
          >{{ item.navTitle || item.title }}</v-list-tile-title>
          <v-list-tile-sub-title
            v-if="item.navSubtitle"
          >{{ item.navSubtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-fade-transition>
          <v-btn
            icon
            small
            style="transform: translateX(8px)"
            class="ma-0 wh-24 caption white--text"
            :color="getAppendColor(item)"
            v-if="isAppendable(item)"
          >{{ item.append.get() }}</v-btn>
        </v-fade-transition>
      </v-list-tile>
    </template>
  </span>
</template>

<script>
import { filterIfList } from '@/utils'

export default {
  name: 'list-tiles',
  props: {
    items: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    activeClass: {
      type: String,
      required: false,
      default: 'primary--text primary-opac-2'
    },
    tileClass: {
      type: [String, Object],
      required: false,
      default: ''
    },
    ripple: {
      type: Object,
      required: false,
      default() {
        return { class: 'primary--text' }
      }
    }
  },

  computed: {
    // ux
    mItems() {
      return this.items.filter(filterIfList)
    }
  },

  methods: {
    // helpers
    getAppendColor(item) {
      const a = item.append
      return a && a.color ? a.color : 'blue'
    },
    isAppendable(item) {
      return (
        item.append &&
        typeof item.append.get === 'function' &&
        item.append.get()
      )
    },
    onItemClick(item) {
      this.$emit('click', item)
      if (typeof item.click === 'function') {
        item.click()
      }
    }
  }
}
</script>
