<template>
  <v-card>
    <v-toolbar
      dark
    >
      <v-btn
        icon
        dark
        @click="closeDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>
        Account
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-toolbar>
    <v-btn
      v-if="showDevMessage"
      color="amber darken-4"
      :small="$vuetify.breakpoint.smAndUp ? false : true"
      outlined
      @click="showDevMessage = false"
      >
      <v-icon
        small
        left>
        mdi-settings
      </v-icon>
      {{$vuetify.breakpoint.smAndUp ? "not working, use settings" : "use settings"}}
    </v-btn>
    <v-list-item>
      <v-list-item-content class="d-flex">
        <span class="text-truncate">{{userName}}</span>
        <span class="text-caption text-truncate red--text">{{userRole}}</span>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="qrImage"></v-img>
      <v-row col="12" md="12" class="ma-5 caption">
        <v-col>
          <v-row>
            browser: {{ device.agent.browser }}
          </v-row>
          <v-row>
            platform: {{ device.agent.platform }}
          </v-row>
          <v-row>
            mobile: {{ device.agent.isMobile }}
          </v-row>
        </v-col>
      </v-row>
    <v-divider class="my-5"></v-divider>
  </v-card>
</template>

<script>
import apiClient from '@/mixin/api-client'
export default {
  mixins: [apiClient],
  mounted: async function () {
    this.device = await this.api().device.mine()
    this.setUserRole()
    this.setUserName()
  },
  methods: {
    setUserRole: function () {
      const viewMode = this.$store.state.viewMode
      this.userRole = viewMode
    },
    setUserName: function () {
      const userName = this.$store.state.userName
      this.userName = userName
    },
    closeDialog: function () {
      this.$emit('close')
    }
  },
  data: () => ({
    showDevMessage: true,
    device: { agent: {} },
    userName: null,
    userRole: null,
    qrImage: '/qr-heroku.png',
    userImage: `https://randomuser.me/api/portraits/women/${Math.ceil(Math.random() * 10)}.jpg`
  })
}
</script>
