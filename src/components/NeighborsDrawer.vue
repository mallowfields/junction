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
        <div class="caption small white--text">$5,000.00</div>
        <div class="caption x-small yellow--text">available</div>
      </div>
      <v-icon class="ma-3 scale-big-small white--text" size="20">
        mdi-cash-100
      </v-icon>
    </v-toolbar>
    <v-btn-toggle
      dense
      class="ml-2"
    >
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
import PathDrawer from './PathDrawer.vue'
import GigsDrawer from './GigsDrawer.vue'
import JobsDrawer from './JobsDrawer.vue'

export default {
  mixins: [apiClient, entityTypes],
  components: { PathDrawer, GigsDrawer, JobsDrawer },
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
    showPathTab: function () {
      this.showMenuTab.path = true
      this.showMenuTab.gigs = false
      this.showMenuTab.jobs = false
    },
    showGigsTab: function () {
      this.showMenuTab.gigs = true
      this.showMenuTab.jobs = false
      this.showMenuTab.path = false
    },
    showJobsTab: function () {
      this.showMenuTab.jobs = true
      this.showMenuTab.gigs = false
      this.showMenuTab.path = false
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
      path: true,
      gigs: false,
      jobs: false
    },

    connecting: false,
    connected: true,

    currentTime: new Date(),

  })
}
</script>
