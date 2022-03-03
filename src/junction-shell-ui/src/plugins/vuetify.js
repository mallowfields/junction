import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  options: {
    customProperties: true
  },
  theme: {
    dark: true,
    themes: {
      light: {
        main: '#ec6500',
        primary: '#333',
        secondary: '#fff',
        Active: '#070',
        Closed: '#333',
        Disabled: '#a80',
        Villager: colors.purple.lighten2,
        Data: colors.deepOrange.base,
        Workflow: colors.indigo.base,
        Site: colors.green.base
      },
      dark: {
        main: '#ff5100',
        primary: '#444',
        secondary: '#fff',
        Active: '#070',
        Closed: '#333',
        Disabled: '#a80',
        Villager: colors.purple.base,
        Data: colors.deepOrange.base,
        Workflow: colors.indigo.base,
        Site: colors.green.base
      },
      ultra: {
        main: '#000',
        primary: '#000',
        secondary: '#fff',
        Active: '#000',
        Closed: '#000',
        Disabled: '#000',
        Villager: '#000',
        Data: '#000',
        Workflow: '#000',
        Site: '#000'
      }
    }
  }
})
