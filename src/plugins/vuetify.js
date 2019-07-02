import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import { addStyle, opacGenerator } from '@/utils'
import 'vuetify/src/stylus/app.styl'

const theme = {
  primary: '#5E7A87',
  secondary: '#FFD435', // #424242
  accent: '#F5941E', // #FFC107, #FFD435
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: colors.deepOrange.lighten1 // #FFC107
}

//! note that this is fixed on app run
// changes of the theme is not listened
addStyle('primaryStyle', opacGenerator('.primary-opac-', theme.primary))
addStyle('accentStyle', opacGenerator('.accent-opac-', theme.accent))
addStyle('errorStyle', opacGenerator('.error-opac-', theme.error))
addStyle('deepOrangeStyle', opacGenerator('.deep-orange-opac-', colors.deepOrange.base))

Vue.use(Vuetify, {
  theme,
  iconfont: 'md'
})
