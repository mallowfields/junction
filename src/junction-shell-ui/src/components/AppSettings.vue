<template>
  <v-btn icon @click="showSettings">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-dialog
      fullscreen
      transition="dialog-bottom-transition"
      v-model="settingsDialog">
      <v-card>
        <v-toolbar
          flat
          class="mb-3">
          <v-icon>
            mdi-settings
          </v-icon>
          <v-card-title>
            Settings
          </v-card-title>
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
          <v-divider></v-divider>
          <v-subheader>Display Theme</v-subheader>
          <v-list-item>
            <v-switch
              v-model="isDark"
              @click="darkMode"
              color="green"
              class="mr-3">
            </v-switch>
            <v-list-item-content>
              <v-list-item-title>Dark Theme</v-list-item-title>
              <v-list-item-subtitle>Dark theme for low light areas</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-subheader>Models and Information</v-subheader>
          <v-list-item one-line>
            <v-list-item-action>
              <v-switch v-model="vendorMode" color="Villager"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Vendor Mode</v-list-item-title>
              <v-list-item-subtitle>Enable features for vendors</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-action>
              <v-switch v-model="allowLocationRequests" color="Villager"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Location Information</v-list-item-title>
              <v-list-item-subtitle>Enable features for navigation</v-list-item-subtitle>
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
    this.setCurrentMode()
    this.setCurrentAccount()
    this.setCurrentUserName()
    this.setCurrentOrganizationName()
  },
  watch: {
    settingsDialog: function () {
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
    isDark: true
  })
}
</script>
