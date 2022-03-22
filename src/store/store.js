import Vuex from 'vuex'

const parse = function (item) {
  try {
    return JSON.parse(item)
  } catch (err) {
    return null
  }
}

const store = new Vuex.Store({
  state: {
    userName: localStorage.getItem('userName') || 'Anonymous',
    profile: localStorage.getItem('profile') || 'No Profile',
    organizationName: localStorage.getItem('organizationName') || 'No Organization',
    viewMode: localStorage.getItem('viewMode') || 'Admin',
    displayTheme: localStorage.getItem('displayTheme') || 'light',
    relatedTo: parse(localStorage.getItem('relatedTo')) || null,
    activePage: localStorage.getItem('activePage') || null,
    socialJusticePowers: localStorage.getItem('socialJusticePowers') || false,
    adminPowers: localStorage.getItem('adminPowers') || false,
    casualPowers: localStorage.getItem('casualPowers') || false,
    grants: parse(localStorage.getItem('grants')) || null,
    providers: parse(localStorage.getItem('providers')) || null
  },
  mutations: {
    viewMode (state, mode) {
      state.viewMode = mode
      localStorage.setItem('viewMode', mode)
    },
    socialJusticePowers (state, value) {
      state.socialJusticePowers = value
      localStorage.setItem('socialJusticePowers', value)
    },
    adminPowers (state, value) {
      state.adminPowers = value
      localStorage.setItem('adminPowers', value)
    },
    casualPowers (state, value) {
      state.casualPowers = value
      localStorage.setItem('casualPowers', value)
    },
    grants (state, item) {
      state.grants = item
      localStorage.setItem('grants', JSON.stringify(item))
    },
    providers (state, item) {
      state.providers = item
      localStorage.setItem('providers', JSON.stringify(item))
    },
    userName (state, mode) {
      state.userName = mode
      localStorage.setItem('userName', mode)
    },
    profile (state, profile) {
      state.profile = profile
      localStorage.setItem('profile', profile)
    },
    organizationName (state, name) {
      state.organizationName = name
      localStorage.setItem('organizationName', name)
    },
    displayTheme (state, theme) {
      state.displayTheme = theme
      localStorage.setItem('displayTheme', theme)
    },
    clearRelated (state) {
      state.relatedTo = null
      localStorage.removeItem('relatedTo')
    },
    relatedTo (state, item) {
      state.relatedTo = item
      localStorage.setItem('relatedTo', JSON.stringify(item))
    },
    activePage (state, page) {
      state.activePage = page
      localStorage.setItem('activePage', page)
    }
  }
})

export default store
