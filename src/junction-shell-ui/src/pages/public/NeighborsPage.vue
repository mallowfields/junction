<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-navigation-drawer
      v-model="pathwaysMenu"
      app
      temporary
      :bottom="$vuetify.breakpoint.smAndUp ? false : true"
      elevation="0"
      width="400px"
      :src="$store.state.displayTheme === 'dark' ? '/grey-gradient-background.jpg' : '/card-texture.png'"
      @transitionend="checkFab"
    >
      <v-toolbar
        width="100%"
        dense
        color="Villager"
        class="mb-2">
        <v-icon left>
          mdi-all-inclusive
        </v-icon>
        <div class="caption small">Junction</div>
        <v-spacer></v-spacer>
        <v-divider vertical class="mx-5"></v-divider>
        <div>
          <div class="caption small white--text">$0.00</div>
          <div class="caption x-small yellow--text">usd</div>
        </div>
        <v-icon class="ma-3 scale-big-small white--text" size="20">
          mdi-cash-100
        </v-icon>
      </v-toolbar>
      <v-btn-toggle
        dense
        class="ml-2"
      >
        <v-btn small @click="goToJobs">
          <v-icon color="Villager" left>
            mdi-domain
          </v-icon>
          <span>Jobs</span>
        </v-btn>

        <v-btn small @click="goToGigs">
          <v-icon color="Villager" left>
            mdi-star-circle-outline
          </v-icon>
          <span>Gigs</span>
        </v-btn>

        <v-btn  disabled small>
          <v-icon color="Villager" left>
            mdi-tune
          </v-icon>
          <span>filters</span>
        </v-btn>
        <v-btn disabled color="Villager" small class="px-7">
          <v-icon  class="white--text" small>
            mdi-settings
          </v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-card class="ma-2 pa-0" tile>
          <v-list dense>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="text-wrap"
                >
                  Adjust your profile to see different path options
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }"
              v-for="gig in gigs"
              :key="gig.moniker"
              >
              <v-list-item-content
                @click="acceptPathwayItem()">
                <v-list-item-title>
                  <h1 class="ma-1">
                    <v-icon color="Villager" left>
                      {{ gig.icon }}
                    </v-icon>
                  {{ gig.moniker }}
                  </h1>
                </v-list-item-title>
                <v-list-item-subtitle
                  v-show="gig.pay"
                  class="mx-1">
                  <v-spacer></v-spacer>
                  <v-icon class="Site--text mb-1" right>
                    mdi-cash-100
                  </v-icon>
                  {{ gig.pay }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  class="pa-2">
                  {{ gig.description }}
                </v-list-item-subtitle>
                <v-chip-group
                  v-show="gig.chips"
                  column
                  v-for="chip in gig.chips"
                  :key="chip"
                >
                  <v-chip small color="Villager lighten-1">{{ chip }}</v-chip>
                 </v-chip-group>
                <v-divider class="my-2"></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-card tile flat>
      <v-toolbar
        dark
        tile
      >
        <v-btn
          icon
          @click="goHome"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{enterContext}}</v-list-item-title>
            <v-list-item-subtitle>Find {{mapContext}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-menu
          transition="slide-y-transition"
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :loading="loading"
              small
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="shareViewDialog = true">
              <v-list-item-title class="caption">
                <v-icon left>
                  mdi-eye
                </v-icon>
                share my view
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-btn
        fab
        dark
        small
        left
        absolute
        width="100px"
        style="border-radius: 0%; top: calc(100vh - 76px);"
        @click="actorIsReady"
      >
        <v-icon size="20" class="mr-2" color="Villager">mdi-all-inclusive</v-icon>
        $0.00
      </v-btn>
      <div
        ref="mapContainer"
        width="100%"
        :style="`width: 100vw; z-index:-1; overflow:hidden; height: calc(100vh - ${ $vuetify.breakpoint.smAndUp ? '75px' : '66px'});`">

        <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          :attributionControl="false"
          :style="`height: calc(100vh - ${ $vuetify.breakpoint.smAndUp ? '67px' : '66px'}); width: 100vw;`"
        >
          <l-control-fullscreen position="topleft"
            :options="{ title: { 'false': 'Fullscreen Mode', 'true': 'Normal Mode' } }"
          />
          <l-tile-layer
            ref="tileLayer"
            :url="url"
            :attribution="attribution"
          >
          </l-tile-layer>
          <l-circle-marker
            :lat-lng="circleMarker.center"
            :radius="circleMarker.radius"
            :color="circleMarker.color"
            :fillColor="circleMarker.fillColor"
          />

          <l-circle-marker
            v-for="marker in marker.partners"
            :key="marker.moniker"
            :lat-lng="marker.center"
            :radius="marker.radius"
            :color="marker.color"
            :fillColor="marker.fillColor"
          />
        </l-map>
      </div>
      <v-progress-linear
        color="Villager"
        buffer-value="30"
        value="25"
        height="10"
        striped
        stream
        absolute
      ></v-progress-linear>
      <v-spacer></v-spacer>
      <v-speed-dial
          v-show="showFab"
          id="networkFab"
          top
          left
          direction="top"
          transition="slide-y-reverse-transition"
          class="my-5"
          :style="$vuetify.breakpoint.smAndUp ? '' : ''"
          v-model="fab"
        >
        <template v-slot:activator>
          <v-tooltip
            top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                :loading="loading"
                fab
                color="white"
                x-large
              >
                <v-icon color="Villager" v-if="fab">
                  mdi-close
                </v-icon>
                <v-icon size="50" color="Villager" v-else>
                  {{purposeIcon}}
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </template>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              large
              color="Villager"
              @click="setPurpose('mdi-plus', 'Other', 'Something Else')"
            >
              <v-icon size="40" color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          Other
        </v-tooltip>
        <v-tooltip
            left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                fab
                dark
                large
                color="Villager"
                @click="setPurpose('mdi-chart-bubble', 'Models', 'Data and Information')"
              >
              <v-icon size="40" color="white">mdi-chart-bubble</v-icon>
            </v-btn>
          </template>
          Models
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              large
              color="Villager"
              @click="setPurpose('mdi-earth', 'Neighbors', 'Gigs')"
            >
              <v-icon size="40" color="white">mdi-earth</v-icon>
            </v-btn>
          </template>
          Neighbors
        </v-tooltip>
      </v-speed-dial>
    </v-card>
    <v-dialog
      v-model="shareViewDialog"
      width="500">
      <v-card>
        <v-toolbar flat>
          <v-icon left size="40" class="Villager--text">
            mdi-camera
          </v-icon>
          <v-card-title
            class="caption">
            Scan with a phone camera
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="shareViewDialog = false" icon>
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider class="mb-2"></v-divider>
        <v-img src="/qr-demo.png"></v-img>
      </v-card>
    </v-dialog>
    <v-dialog
      width="400"
      flat
      persistent
      v-model="gigsDialog">
      <v-card>
        <v-toolbar flat>
          <v-icon color="Villager">{{purposeIcon}}</v-icon>
          <v-card-title>{{claimDescription}}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="gigsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="caption">
          Do you want this?
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            rounded
            class="px-8 white--text"
            x-large
            color="Villager"
            @click="gigsDialog = false; actorIsReady();">
            <v-icon left>mdi-human-greeting</v-icon>
            yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      width="600"
      flat
      persistent
      v-model="hereDialog">
      <v-card>
        <v-toolbar
          class="mb-2"
          flat>
          <v-spacer></v-spacer>
          <v-btn
            :loading="connecting"
            icon
            @click="hereDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-text-field
          rounded
          class="px-5"
          label="name"
          value="Anonymous"
          :disabled="connecting"
          outlined>
        </v-text-field>
        <v-text-field
          rounded
          dense
          class="px-5"
          type="date"
          label="birthday"
          :disabled="connecting"
          outlined>
        </v-text-field>
        <v-text-field
          rounded
          dense
          class="px-5"
          label="phone number"
          value="555-456-4254"
          :disabled="connecting"
          outlined>
        </v-text-field>
        <v-card-actions>
          <v-btn
            x-small
            text
            outlined
            color="Villager"
            class="pa-3"
            :loading="connecting"
            @click="startConnection">
            <v-icon left>
              mdi-human
            </v-icon>
            Guest
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            color="Villager"
            class="px-8"
            :loading="connecting"
            @click="startConnection">
            <v-icon left>
              mdi-human
            </v-icon>
            Start
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-btn
          v-if="showDevMessage"
          color="amber darken-4"
          :small="$vuetify.breakpoint.smAndUp ? true : true"
          outlined
          @click="showDevMessage = false"
          >
          <v-icon
            small
            left>
            mdi-settings
          </v-icon>
          {{$vuetify.breakpoint.smAndUp ? "contact kendell@mallowfields.com" : "contact kendell@mallowfields.com"}}
        </v-btn>
        <v-card-title class="caption">
          Login using a Service
        </v-card-title>
        <v-card-actions>
          <v-btn
            :disabled="connecting"
            text>
            <v-icon left>
              mdi-google
            </v-icon>
            google
          </v-btn>
          <v-btn
            :disabled="connecting"
            text>
            <v-icon left>
              mdi-facebook
            </v-icon>
            facebook
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      width="600"
      flat
      persistent
      v-model="networkOptionsDialog">
      <v-card>
        <v-toolbar color="Villager" flat>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="networkOptionsDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Villager" class="ml-2 mt-2">mdi-assistant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Leave Feedback</v-list-item-title>
                <v-list-item-subtitle>Your thoughts and ideas</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Villager" class="ml-2 mt-2">mdi-human-handsup</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Volunteer</v-list-item-title>
                <v-list-item-subtitle>Share ways you can help</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
      absolute
      centered
      top
      class="pt-14"
      color="Villager accent-4"
      rounded="pill"
      elevation="24"
      v-touch="{
        right: () => {snackbar = false; gigsDialog = true}
      }"
    >
      <v-icon left class="mb-1">{{purposeIcon}}</v-icon>
      <span>
        (3) {{mapContext}}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="Villager lighten-4"
          v-bind="attrs"
          text
          class="claim-bounce"
          @click="snackbar = false; gigsDialog = true"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Claim
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="statusSnackbar"
      top
      class="pt-16"
      color="Villager"
      elevation="10"
    >
      <v-icon>
        mdi-bell
      </v-icon>
      <v-spacer>

      </v-spacer>
      success
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          v-bind="attrs"
          icon
          class="px-5"
          x-large
          @click="statusSnackbar = false;"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker, LGeoJson } from 'vue2-leaflet'
import LControlFullscreen from 'vue2-leaflet-fullscreen'
import LFreeDraw from 'vue2-leaflet-freedraw'
// https://github.com/Esurnir/vue2-leaflet-freedraw

import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
// https://github.com/jperelli/vue2-leaflet-markercluster

import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
// https://github.com/vUdav/vue2-leaflet-locatecontrol

// https://github.com/fega/vue2-leaflet-geosearch
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import VGeosearch from 'vue2-leaflet-geosearch'

import 'leaflet/dist/leaflet.css'
import entityTypes from '@/mixin/entity-types'
import apiClient from '@/mixin/api-client'
import moment from 'moment'

export default {
  mixins: [apiClient, entityTypes],
  components: { LMap, LTileLayer, LCircleMarker, LControlFullscreen, LGeoJson, LFreeDraw, Vue2LeafletMarkerCluster, Vue2LeafletLocatecontrol, OpenStreetMapProvider },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.redrawMap()
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    },
    startConnection: function () {
      this.connecting = true
      setTimeout(() => {
        this.hereDialog = false
      }, 1000)

      setTimeout(() => {
        this.connecting = false
        this.connected = true
        this.statusSnackbar = true
        this.pathwaysMenu = true
      }, 1300)
    },
    setPurpose: function (icon, enterContext, mapContext) {
      this.purposeIcon = icon
      this.enterContext = enterContext
      this.mapContext = mapContext
      this.statusSnackbar = true
    },
    acceptPathwayItem: function () {
      this.pathwaysMenu = false
      this.gigsDialog = true
    },
    redrawMap: async function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.$refs.map) {
            const map = this.$refs.map.mapObject
            map.invalidateSize(true)
            this.addMapListeners(map)
          }
        }, 100)
      })
    },
    addMapListeners: function (map) {
      map.on('contextmenu', (event) => {
        this.networkOptionsDialog = true
      })
      map.on('moveend', (event) => {
        this.mapCenter = map.getCenter()
        this.circleMarker.center = this.mapCenter
        this.snackbar = true
      })
    },
    actorIsReady: function () {
      if (this.connected) {
        this.hereDialog = false
        this.showFab = false
        this.pathwaysMenu = true
        this.statusSnackbar = true
        return
      }

      this.hereDialog = true
    },
    checkFab: function () {
      if (this.connected && !this.pathwaysMenu) {
        this.showFab = true
      }
    },
    formatTime: function (value) {
      return moment(new Date(this.currentTime || value)).format('LTS')
    },
    close: function () {
      this.$emit('close')
    },

    saveEntity: async function (entity) {
      this.loading = true
      this.editDialog = false
      this.showNodeDetails = false
      this.nodeModificationDialog = false
      await this.api('map')[this.selectedNode.type.toLowerCase()].save(entity)
      this.selectedNode = {}
      this.reloadGraph()
    },
    purgeTargetEntity: async function () {
      this.loading = true
      this.editDialog = false
      this.showNodeDetails = false
      this.nodeModificationDialog = false
      await this.api('map')[this.selectedNode.type.toLowerCase()].delete(this.selectedNode)
      this.selectedNode = {}
      this.reloadGraph()
    },
    goToSite: function ({ code, publicId }) {
      let site = `/site/${code}/${publicId}`
      this.$router.push(site, () => this.$router.go(0))
      this.close()
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
    }
  },
  data: () => ({
    geosearchOptions: { // Important part Here
      provider: new OpenStreetMapProvider()
    },
    businesses: [],
    loadingBusinesses: false,
    pathwaysMenu: false,
    shareViewDialog: false,
    gigsDialog: false,
    gigs: [
      {
        moniker: 'Gig',
        description: 'unclaimed gig',
        pay: '$18.20',
        icon: 'mdi-star-circle',
        chips: [
          'face coverings', 'gloves', 'food'
        ]
      }, {
        moniker: 'Job',
        description: 'unclaimed job',
        icon: 'mdi-domain',
        chips: [
          'outside', 'gloves', 'food'
        ]
      }, {
        moniker: 'Gig',
        description: 'unclaimed entrepreneurship gig',
        icon: 'mdi-star-circle',
        chips: [
          'face coverings', 'co-working', 'food'
        ]
      }, {
        moniker: 'Gig',
        description: 'unclaimed mentorship gig',
        icon: 'mdi-star-circle',
        chips: [
          'face coverings', 'children'
        ]
      }, {
        moniker: 'Job',
        description: 'unclaimed',
        icon: 'mdi-domain',
        pay: '$33.00/hr',
        chips: [
          'face coverings', 'fuel included'
        ]
      }, {
        moniker: 'Job',
        description: 'unclaimed healthcare job',
        icon: 'mdi-domain',
        pay: '$52.27/hr',
        chips: [
          'face coverings', 'transportation'
        ]
      }
    ],
    claimDescription: 'Claim this?',
    snackbar: true,
    enterContext: 'Neighbors',
    mapContext: 'Gigs',
    purposeIcon: 'mdi-earth',
    zoom: 11,
    mapCenter: latLng(42.9634, -85.6681),
    circleMarker: {
      center: latLng(42.9634, -85.6681),
      radius: 150,
      color: 'white',
      fillColor: 'purple'
    },
    marker: {
      partners: [
        {
          moniker: 'Community Housing Connect',
          center: latLng(42.97252947254143, -85.67439693255552),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'EuzenConnect',
          center: latLng(42.97043760898049, -85.67471522173447),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'NAACP',
          center: latLng(42.93593381097306, -85.65786251021242),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Treetops Collective',
          center: latLng(42.946505929857985, -85.66705535806263),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Mallowfields',
          center: latLng(42.94260261726618, -85.67807064326311),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Lions & Rabbits',
          center: latLng(42.986355109074836, -85.66620189814095),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Grand Valley State University',
          center: latLng(42.9633899227588, -85.88859055639922),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Fort Valley State University',
          center: latLng(32.534688671924854, -83.89550132508403),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }, {
          moniker: 'Georgia Gwinnette College',
          center: latLng(33.97973044216388, -84.00389373600575),
          radius: 20,
          color: 'white',
          fillColor: 'pink'
        }
      ]
    },
    center: latLng(42.9634, -85.6681),
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VuZGVsbGpvc2VwaCIsImEiOiJja3IxZ252YWkxYm00MnBvNzhudWpvZGhvIn0.10YRNB3jfk6CedUpgXfPBA',
    attribution: '',
    withTooltip: latLng(47.41422, -1.250482),
    mapOptions: {
      zoomSnap: 0.5,
      zoomControl: false
    },
    showDevMessage: false,
    showMap: true,

    fab: false,
    organizationName: null,
    firstLoad: true,
    loading: false,

    hereDialog: false,
    connecting: false,
    connected: false,
    statusSnackbar: false,
    networkOptionsDialog: false,
    showFab: true,
    currentTime: new Date(),

    siteModificationDialog: false,
    nodeModificationDialog: false,
    editDialog: false,
    automationDialog: false,
    siteDialog: false,
    toolDialog: false,
    isTool: false,
    labelIcon: 'mdi-help',
    dialog: true
  })
}
</script>

<style>
#networkFab {
  position: fixed;
  z-index: 99999;
  top: calc(100vh - 120px);
  left: calc(100vw - 120px);
}
.claim-bounce {
    -webkit-animation:claim 1s ease-in-out infinite;
    -moz-animation:claim 1s ease-in-out infinite;
    animation:claim 1s ease-in-out infinite;
}

@-moz-keyframes claim {
  0% {
    -moz-transform: translateX(0); transform: translateX(0)
  }
  50% {
    -moz-transform: translateX(10px); transform: translateX(10px)
  }
  100% {
    -moz-transform: translateX(0); transform: translateX(0)
  }
}
@-webkit-keyframes claim {
  0% {
    -webkit-transform: translateX(0); transform: translateX(0)
  }
  50% {
    -webkit-transform: translateX(10px); transform: translateX(10px)
  }
  100% {
    -webkit-transform: translateX(0); transform: translateX(0)
  }
}
@keyframes claim {
  0% {
    -webkit-transform: translateX(0); transform: translateX(0)
  }
  50% {
    -webkit-transform: translateX(10px); transform: translateX(10px)
  }
  100% {
    -webkit-transform: translateX(0); transform: translateX(0)
  }
}
</style>
