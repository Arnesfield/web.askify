<template>
  <list-helper
    v-bind="{ list }"
    class="py-3x mb-5"
    @click="$emit('click', $event)"
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
            title: 'My Questions',
            icon: 'dashboard',
            to: '/dashboard',
            class: ''
          },
          {
            title: 'Ask a question',
            icon: 'live_help',
            to: '/ask',
            class: ''
          },
          {
            title: 'Questions Feed',
            icon: 'question_answer',
            to: '/questions',
            class: ''
          },
          {
            title: 'Profile',
            icon: 'account_circle',
            to: '/test',
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
