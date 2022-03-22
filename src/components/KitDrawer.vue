<template>
  <v-card tile flat>
    <v-toolbar
      width="100%"
      dense
      color="Villager"
      class="mb-2">
      <v-spacer></v-spacer>
      <v-divider vertical class="mx-2"></v-divider>
      <v-icon class="ml-2 white--text" size="40">
        mdi-all-inclusive
      </v-icon>
    </v-toolbar>
    <v-btn-toggle
      dense
      class="ml-2"
    >
      <v-btn small  @click="showGrantsTab">
        <v-icon color="Villager" left>
          mdi-human-greeting
        </v-icon>
        <span>requests</span>
      </v-btn>
      <v-btn small @click="showGigsTab">
        <v-icon color="Villager" left>
          mdi-gift
        </v-icon>
        <span>gift receipts</span>
      </v-btn>
    </v-btn-toggle>
    <requests-drawer
      v-show="showMenuTab.grants">
    </requests-drawer>
    <gifts-drawer
      v-show="showMenuTab.gigs">
    </gifts-drawer>
  </v-card>
</template>

<script>
import entityTypes from '@/mixin/entity-types'
import apiClient from '@/mixin/api-client'
import moment from 'moment'
import RequestsDrawer from './RequestsDrawer.vue'
import PathDrawer from './PathDrawer.vue'
import GiftsDrawer from './GiftsDrawer.vue'
import JobsDrawer from './JobsDrawer.vue'

export default {
  mixins: [apiClient, entityTypes],
  components: { RequestsDrawer, PathDrawer, GiftsDrawer, JobsDrawer },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.startConnection()
  },
  methods: {
    showGrantsTab: function () {
      this.showMenuTab.grants = true
      this.showMenuTab.path = false
      this.showMenuTab.gigs = false
      this.showMenuTab.jobs = false
    },
    showPathTab: function () {
      this.showMenuTab.path = true
      this.showMenuTab.gigs = false
      this.showMenuTab.jobs = false
      this.showMenuTab.grants = false
    },
    showGigsTab: function () {
      this.showMenuTab.gigs = true
      this.showMenuTab.jobs = false
      this.showMenuTab.path = false
      this.showMenuTab.grants = false
    },
    showJobsTab: function () {
      this.showMenuTab.jobs = true
      this.showMenuTab.gigs = false
      this.showMenuTab.path = false
      this.showMenuTab.grants = false
    },
    goHome: function () {
      this.$router.push('/')
    },
    goToJobs: function () {
      let site = `/jobs`
      this.$router.push(site)
      this.close()
    },
    goToGigs: function () {
      let site = `/gigs`
      this.$router.push(site)
      this.close()
    },
    startConnection: function () {
      this.connecting = true

      setTimeout(() => {
        this.connecting = false
        this.connected = true
      }, 1300)
    },
    listInteraction: () => {
      console.log('----- LIST INTERACTION -----')
    },
    formatTime: function (value) {
      return moment(new Date(this.currentTime || value)).format('LTS')
    },
    close: function () {
      this.$emit('close')
    }
  },
  data: () => ({
    businesses: [],
    loadingBusinesses: false,
    showMenuTab: {
      grants: true,
      path: false,
      gigs: false,
      jobs: false
    },

    connecting: false,
    connected: true,

    currentTime: new Date(),

  })
}
</script>
