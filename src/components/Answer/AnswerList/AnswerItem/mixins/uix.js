import { pluralize } from '@/utils'

export default {
  computed: {
    voteCountText() {
      const { item } = this
      const t = pluralize(item.votes_total, 'total vote', 'total votes')
      return `${item.votes_total} ${t}`
    },

    voteCountClass() {
      const { votes_total: t } = this.item
      return {
        'grey lighten-2': t === 0,
        'error white--text': t < 0,
        'success white--text': t > 0
      }
    },

    paidCountText() {
      const {
        transactions_approved_count: count,
        transactions_approved: arr
      } = this.item

      const c = count || arr.length
      return `${c} paid`
    },

    datetimeText() {
      const {
        created_at: c,
        updated_at: u,
        created_at_info: ci,
        updated_at_info: ui
      } = this.item

      return c === u ? ci.human : `${ui.human} (updated)`
    }
  }
}
