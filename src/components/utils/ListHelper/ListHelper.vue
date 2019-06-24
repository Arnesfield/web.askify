<template>
  <v-list
    expand
    v-bind="listProps"
  >
    <template v-for="(item, i) in mList">
      <template v-if="isItemSubheader(item)">
        <v-divider
          v-if="item === '_'"
          :key="`divider-${i}`"
        />
        <v-subheader
          v-else
          :key="`subheader-${i}`"
        >
          {{ typeof item === 'string' ? item : item.title }}
        </v-subheader>
      </template>

      <list-tiles
        :key="`tiles-${i}`"
        :items="item"
        v-else-if="item.constructor.name === 'Array'"
        @click="$emit('click', $event)"
      />

      <v-list-group
        v-else
        :key="`group-${i}`"
        v-model="item.value"
        v-bind="{ ...item.tileProps }"
        append-icon="arrow_drop_down"
        @dblclick="item.to ? $router.push(item.to) : null"
      >
        <v-list-tile slot="activator">
          <v-list-tile-action class="minw-42x">
            <v-icon
              :color="item.value ? 'primary' : null"
            >
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              :class="{
                'body-1': item.subtitle,
                'subheading': !item.subtitle,
                'primary--text': item.value
              }"
            >
              {{ item.title }}
            </v-list-tile-title>
            <v-list-tile-sub-title
              v-if="item.subtitle"
            >
              {{ item.subtitle }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <list-tiles
          :items="item.items"
          tile-class="ml-2"
          @click="$emit('click', $event)"
        />
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import { filterIfList } from '@/utils'
import ListTiles from './ListTiles'

export default {
  name: 'list-helper',
  components: {
    ListTiles
  },
  props: {
    list: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    listProps: {
      type: Object,
      required: false,
      default() {
        return null
      }
    }
  },

  computed: {
    mList() {
      return this.list.filter(filterIfList)
    }
  },

  methods: {
    // helpers
    isItemSubheader(item) {
      const isString = typeof item === 'string'
      const isSubheader = typeof item === 'object' && item.subheader
      return isString || isSubheader
    }
  }
}
</script>
