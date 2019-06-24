<template>
  <list-helper
    v-bind="{ list }"
    class="py-3x mb-5"
  />
</template>

<script>
import ListHelper from '@/components/utils/ListHelper'

export default {
  name: 'nav-list',
  components: {
    ListHelper
  },

  data: () => ({
    list: []
  }),

  created() {
    this.buildList()
  },

  methods: {
    buildList() {
      const list = [
        [
          {
            title: 'Dashboard',
            icon: 'dashboard',
            to: '/dashboard',
            class: ''
          },
          {
            title: 'Profile',
            icon: 'account_circle',
            to: '/profile',
            class: ''
          },
          '_',
          {
            title: 'Logout',
            icon: 'exit_to_app',
            class: '',
            click: () => {
              this.$store.dispatch('auth/logout')
            }
          }
        ]
      ]

      this.list = list
    }
  }
}
</script>
