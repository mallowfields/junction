<template>
  <v-btn
    rounded
    outlined
    :color="$vuetify.theme.dark ? 'Villager' : 'grey'"
    @click="showSettings">
    <v-icon color="Villager" left>mdi-all-inclusive</v-icon>
      powers
    <v-dialog
      width="500"
      fullscreen
      transition="dialog-top-transition"
      v-model="settingsDialog">
      <v-card tile>
        <v-toolbar
          flat>
          <v-icon
            :color="$vuetify.theme.dark ? 'Villager' : 'primary'"
            left>mdi-all-inclusive</v-icon>
          Powers
          <v-spacer></v-spacer>
          <v-btn
            @click="settingsDialog = false"
            icon>
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-subtitle>
        <v-list three line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="Villager--text">Social Justice</v-list-item-title>
              <v-list-item-subtitle class="caption mb-2">Community powers for neighborhoods</v-list-item-subtitle>
              <v-btn
                color="Villager"
                x-large
                rounded
                style="max-width: 320px;"
                :loading="togglingSocialJusticePower"
                class="white--text"
                :outlined="socialJusticePowers"
                @click="toggleSocialJusticePowers">
                  {{ socialJusticePowers ? `Release` : 'Enable'}} Powers
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="Data--text">Administration</v-list-item-title>
              <v-list-item-subtitle class="caption mb-2">Community powers for administration</v-list-item-subtitle>
              <v-btn
                color="Data"
                x-large
                style="max-width: 320px;"
                rounded
                :loading="togglingAdminPower"
                class="white--text"
                :outlined="adminPowers"
                @click="toggleAdminPowers">
                  {{ adminPowers ? `Release` : 'Enable'}} Powers
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="blue--text">
                Casual
              </v-list-item-title>
              <v-list-item-subtitle class="caption mb-2">Community powers for casual content</v-list-item-subtitle>
              <v-btn
                color="blue"
                x-large
                style="max-width: 320px;"
                rounded
                :loading="togglingCasualPower"
                class="white--text"
                :outlined="casualPowers"
                @click="toggleCasualPowers">
                  {{ casualPowers ? `Release` : 'Enable'}} Powers
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  mounted: function () {
    this.setCurrentTheme()
    this.setCurrentPowers()
    this.setCurrentMode()
    this.setCurrentAccount()
    this.setCurrentUserName()
    this.setCurrentOrganizationName()
  },
  watch: {
    settingsDialog: function () {
      this.setCurrentPowers()
      this.setCurrentMode()
      this.setCurrentAccount()
      this.setCurrentUserName()
      this.setCurrentOrganizationName()
    }
  },
  methods: {
    showSettings: function () {
      this.settingsDialog = true
    },
    setCurrentMode: function () {
      this.viewMode = this.$store.state.viewMode
    },
    setCurrentPowers: function () {
      this.socialJusticePowers = JSON.parse(this.$store.state.socialJusticePowers)
      this.adminPowers = JSON.parse(this.$store.state.adminPowers)
      this.casualPowers = JSON.parse(this.$store.state.casualPowers)
    },
    setCurrentAccount: function () {
      this.profile = this.$store.state.profile
    },
    setCurrentUserName: function () {
      this.userName = this.$store.state.userName
    },
    setCurrentOrganizationName: function () {
      this.organizationName = this.$store.state.organizationName
    },
    setCurrentTheme: function () {
      this.currentTheme = this.$store.state.displayTheme
      if (this.currentTheme === 'dark') {
        this.isDark = true
      } else {
        this.isDark = false
      }
    },
    darkMode: function () {
      if (this.$store.state.displayTheme === 'dark') {
        this.$store.commit('displayTheme', 'light')
        this.$vuetify.theme.dark = false
      } else {
        this.$store.commit('displayTheme', 'dark')
        this.$vuetify.theme.dark = true
      }
      this.settingsDialog = true
    },
    setViewMode: function () {
      this.$store.commit('activePage', null)
      this.$store.commit('viewMode', this.viewMode)
      this.$router.push('/')
      this.$router.go()
    },
    setProfile: function () {
      this.$store.commit('profile', this.profile)
    },
    setUserName: function () {
      this.$store.commit('userName', this.userName)
    },
    setOrganizationName: function () {
      this.$store.commit('organizationName', this.organizationName)
    },
    reloadWindow: function () {
      setTimeout(() => {
        this.window.location.reload()
      }, 1000)
    },
    toggleSocialJusticePowers: function () {
      this.togglingSocialJusticePower = true
      this.$store.commit('socialJusticePowers', !this.socialJusticePowers)
      this.reloadWindow()
    },
    toggleAdminPowers: function () {
      this.togglingAdminPower = true
      this.$store.commit('adminPowers', !this.adminPowers)
      this.reloadWindow()
    },
    toggleCasualPowers: function () {
      this.togglingCasualPower = true
      this.$store.commit('casualPowers', !this.casualPowers)
      this.reloadWindow()
    }
  },
  data: () => ({
    profile: 'Junction',
    profiles: ['Junction'],
    vendorMode: true,
    allowLocationRequests: true,
    viewMode: null,
    userName: null,
    organizationName: null,
    viewModes: ['Admin', 'Member', 'Public'],
    settingsDialog: false,
    currentTheme: null,
    isDark: true,
    soundEffects: false,
    adminPowers: false,
    socialJusticePowers: false,
    casualPowers: false,
    togglingSocialJusticePower: false,
    togglingAdminPower: false,
    togglingCasualPower: false
  })
}
</script>
