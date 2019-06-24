const year = process.env.VUE_APP_YEAR
const now = (new Date()).getFullYear()

export default year >= now ? year : `${year}-${now}`
