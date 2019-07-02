export default {
  computed: {
    voteRequestProps() {
      const { didVote } = this
      const { id } = this.item.vote || {}

      const props = {
        create: {
          method: 'post',
          url: 'votes'
        },
        update: {
          method: 'patch',
          url: `votes/${id}`
        }
      }

      return props[didVote ? 'update' : 'create']
    },

    bestRequestProps() {
      const { item, isBest } = this
      const { id } = item || {}
      const bestText = !isBest ? 'best' : 'unbest'

      return {
        url: `answers/${id}/${bestText}`
      }
    }
  }
}
