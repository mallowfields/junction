<template>
  <v-card tile flat>
    <v-toolbar
      width="100%"
      dense
      color="Villager"
      class="mb-2">
      <v-icon left>
        mdi-all-inclusive
      </v-icon>
      <v-spacer></v-spacer>
      <v-divider vertical class="mx-5"></v-divider>
      <div>
        <div class="caption small white--text">Grant Kit</div>
        <div class="caption x-small yellow--text">0 viewers</div>
      </div>
      <v-icon class="ml-4 white--text" size="40">
        mdi-send
      </v-icon>
    </v-toolbar>
    <v-btn-toggle
      dense
      class="ml-2"
    >
      <v-btn small  @click="showGrantsTab">
        <v-icon color="Villager" left>
          mdi-license
        </v-icon>
        <span>grants</span>
      </v-btn>
      <v-btn small  @click="showPathTab">
        <v-icon color="Villager" left>
          mdi-navigation mdi-rotate-90
        </v-icon>
        <span>path</span>
      </v-btn>
      <v-btn small @click="showGigsTab">
        <v-icon color="Villager" left>
          mdi-star-circle-outline
        </v-icon>
        <span>Gigs</span>
      </v-btn>

      <v-btn small @click="showJobsTab">
        <v-icon color="Villager" left>
          mdi-domain
        </v-icon>
        <span>Jobs</span>
      </v-btn>
    </v-btn-toggle>
    <grants-drawer v-show="showMenuTab.grants"></grants-drawer>
    <path-drawer v-show="showMenuTab.path"></path-drawer>
    <jobs-drawer v-show="showMenuTab.jobs"></jobs-drawer>
    <gigs-drawer
      v-show="showMenuTab.gigs"></gigs-drawer>
  </v-card>
</template>

<script>
import entityTypes from '@/mixin/entity-types'
import apiClient from '@/mixin/api-client'
import moment from 'moment'
import GrantsDrawer from './GrantsDrawer.vue'
import PathDrawer from './PathDrawer.vue'
import GigsDrawer from './GigsDrawer.vue'
import JobsDrawer from './JobsDrawer.vue'

export default {
  mixins: [apiClient, entityTypes],
  components: { GrantsDrawer, PathDrawer, GigsDrawer, JobsDrawer },
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
