<template>
  <div
    class="primary-raw bg-img"
    :style="{ 'background-image': `url(${imgHeader})` }"
  >
    <v-container
      fluid
      fill-height
      class="px-0 pb-0 pt-3 white--text"
    >
      <v-layout
        align-end
        class="lightbox-4"
      >
        <v-layout column>
          <div class="px-3 py-2 x-full">
            <avatar-view
              v-if="user"
              v-bind="{ user }"
            />
          </div>

          <v-list
            dark
            v-if="user"
            class="x-full"
          >
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.fullname }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { imgPath } from '@/utils/path'
import AvatarView from '@/components/User/AvatarView'

export default {
  name: 'nav-header',
  components: {
    AvatarView
  },

  computed: {
    imgHeader: () => `${imgPath}header.png`,

    ...mapState('auth', ['user'])
  }
}
</script>
