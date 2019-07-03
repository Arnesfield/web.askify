<template>
  <list-helper
    v-bind="{ list }"
    class="py-3x mb-5"
    @click="$emit('click', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { askerList, expertList } from './list'
import ListHelper from '@/components/utils/ListHelper'

export default {
  name: 'nav-list',
  components: {
    ListHelper
  },

  data: () => ({
    list: []
  }),

  computed: {
    userList() {
      const { isAsker, isExpert } = this
      return isAsker ? askerList : (isExpert ? expertList : [])
    },

    ...mapGetters('auth', ['isAsker', 'isExpert'])
  },

  created() {
    this.buildList()
  },

  methods: {
    buildList() {
      const list = [
        [
          ...this.userList,
          {
            title: 'All Questions',
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
