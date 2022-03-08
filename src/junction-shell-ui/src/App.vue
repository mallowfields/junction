<template>
  <v-app>
    <v-app-bar
      app
      dark
      elevation="2">
      <v-app-bar-nav-icon
        @click.stop="bottomMenu = !bottomMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-icon color="Villager" left>mdi-all-inclusive</v-icon>
      Junction
      <app-settings></app-settings>
    </v-app-bar>

    <v-navigation-drawer
      v-model="bottomMenu"
      app
      temporary
      :bottom="$vuetify.breakpoint.smAndUp ? false : true"
      :src="$store.state.displayTheme === 'dark' ? '/grey-gradient-background.jpg' : '/card-texture.png'"
    >
      <page-list></page-list>
    </v-navigation-drawer>
    <loading v-if="!user" class="loading-container"></loading>
    <v-main v-else fluid>
      <v-container class="pa-3" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer class="py-3"> </v-footer>
  </v-app>
</template>

<script>
import PageList from '@/components/PageList.vue'
import AppSettings from '@/components/AppSettings.vue'
import Loading from '@/components/Loading'
import router from '@/routing/router'
import store from '@/store/store'
import apiClient from '@/mixin/api-client'

export default {
  name: 'Junction',
  mixins: [apiClient],
  components: { Loading, PageList, AppSettings },
  router,
  store,
  mounted: function () {
    this.setDisplayTheme()
    this.setSideBarMode()
    setTimeout(() => {
      this.user = true
    }, 1300)
  },
  methods: {
    setDisplayTheme: function () {
      if (this.$store.state.displayTheme === 'dark') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    },
    setSideBarMode: function () {
      if (this.$vuetify.breakpoint.smAndUp) {
        this.bottomMenu = false
      } else {
        this.bottomMenu = false
      }
    }
  },
  data: () => ({
    appInstalled: false,
    connectionProgressColor: 'Villager',
    snackbar: true,
    validated: false,
    user: false,
    organizationName: null,
    bottomMenu: false
  })
}
</script>
