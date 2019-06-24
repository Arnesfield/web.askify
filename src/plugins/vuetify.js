import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#5E7A87',
    secondary: 'FFD435', // #424242
    accent: '#FFC107', // $FFD435
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: colors.deepOrange.lighten1 // #FFC107
  },
  iconfont: 'md'
})
