export default {
  computed: {
    isBest() {
      return !!this.item.is_best_at
    },
    isViewable() {
      return this.item.is_viewable
    },
    isPayable() {
      return !!this.item.privated_at
    },
    didVote() {
      return !!this.item.vote
    },
    didUnvote() {
      const { deleted_at } = this.item.vote || {}
      return !!deleted_at
    },
    didUpvote() {
      const { upvoted_at } = this.item.vote || {}
      return !!upvoted_at && !this.didUnvote
    },
    didDownvote() {
      const { downvoted_at } = this.item.vote || {}
      return !!downvoted_at && !this.didUnvote
    }
  }
}
