<template>
  <v-btn
    class="ml-1"
    icon
    @click="showSettings">
    <v-icon small>mdi-settings</v-icon>
    <v-dialog
      width="500"
      transition="dialog-top-transition"
      v-model="settingsDialog">
      <v-card tile>
        <v-toolbar
          color="primary"
          flat>
          <v-icon small class="white--text">mdi-settings</v-icon>
          <v-spacer></v-spacer>
          <v-btn
            @click="settingsDialog = false"
            icon>
            <v-icon class="white--text">
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-subtitle>
        <v-list three line>
          <v-subheader>Display</v-subheader>
          <v-divider></v-divider>
          <v-list-item>
            <v-switch
              v-model="isDark"
              @click="darkMode"
              color="Villager"
              class="mr-3">
            </v-switch>
            <v-list-item-content>
              <v-list-item-title>Dark Theme</v-list-item-title>
              <v-list-item-subtitle>Dark theme for low light areas</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-subheader>Power Tools</v-subheader>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="Villager--text">Social Justice</v-list-item-title>
              <v-list-item-subtitle class="caption">Community tools for neighborhoods</v-list-item-subtitle>
              <v-btn
                color="Villager"
                class="white--text"
                :outlined="socialJusticePowers"
                @click="toggleSocialJusticePowers">
                <v-icon left class="mr-5">
                  mdi-human-greeting
                </v-icon>
                  {{ socialJusticePowers ? `Disable` : 'Enable'}} Powers
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="Data--text">Administration</v-list-item-title>
              <v-list-item-subtitle class="caption">Administration tools for neighborhoods</v-list-item-subtitle>
              <v-btn
                color="Data"
                class="white--text"
                :outlined="adminPowers"
                @click="toggleAdminPowers">
                <v-icon left class="mr-5">
                  mdi-charity
                </v-icon>
                  {{ adminPowers ? `Disable` : 'Enable'}} Powers
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
    toggleSocialJusticePowers: function () {
      this.$store.commit('socialJusticePowers', !this.socialJusticePowers)
      this.window.location.reload()
    },
    toggleAdminPowers: function () {
      this.$store.commit('adminPowers', !this.adminPowers)
      this.window.location.reload()
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
    adminPowers: false,
    socialJusticePowers: false
  })
}
</script>
