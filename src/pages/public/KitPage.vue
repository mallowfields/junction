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
      <kit-drawer></kit-drawer>
    </v-navigation-drawer>
    <v-card tile flat
    
    :style="$store.state.displayTheme === 'dark' ? 'background: url(/grey-gradient-background.jpg)' : 'background: url(/card-texture.png)'"
    >
      <v-toolbar
        dark
        tile
      >
        <v-btn
          icon
          @click="pathwaysMenu = true"
        >
          <v-icon>mdi-all-inclusive</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Grants</v-list-item-title>
            <v-list-item-subtitle>{{ markerCategory }}</v-list-item-subtitle>
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
      <!-- <v-btn
        fab
        dark
        small
        right
        absolute
        width="120px"
        :style="`border-radius: 0%; top: ${$vuetify.breakpoint.smAndUp ? '70px' : '70px'};`"
        @click="actorIsReady"
      >
        <v-icon size="20" class="mr-2" color="Villager">mdi-human-greeting</v-icon>
        {{ remainingGrantFunds }}
      </v-btn> -->
      <div
        ref="mapContainer"
        width="100%"
        :style="`width: 100vw; z-index:-1; overflow:hidden; height: ${ $vuetify.breakpoint.smAndUp ? 'calc(100vh - 120px)' : 'calc(100vh - 120px)'};`">

        <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          :attributionControl="false"
          :style="`height: ${ $vuetify.breakpoint.smAndUp ? 'calc(100vh - 120px)' : 'calc(100vh - 120px)'}; width: 100vw; background: transparent;`"
        >
          <!-- <l-control-fullscreen position="topleft"
            :options="{ title: { 'false': 'Fullscreen Mode', 'true': 'Normal Mode' } }"
          /> -->
          <l-tile-layer
            ref="tileLayer"
            :url="url"
            :attribution="attribution"
          >
          </l-tile-layer>
          
          <!-- <l-marker
            ref="dragMarker"
            :visible="entityMarkerVisible"
            :lat-lng="markerDragged ? lastMarkerPosition : circleMarker.center"
            :icon="getBlankMarkerIcon()"
            :draggable="true"
            @dragend="markerMoved"
            @click="entityMarkerClicked"
          /> -->

           <l-marker
            v-for="marker in markerSettings"
            :key="marker.row_id + marker.Marker"
            :visible="getMarkerVisibility(marker)"
            ref="marker"
            :icon="getLoadedMarkerIcon(marker)"
            :draggable="true"
            @click="markerClicked(marker)"
            @dragend="playGrantChime"
            @dragstart="playClaimChime"
            :lat-lng="setMarkerLatLng(marker.Lat, marker.Lng)"
          />
          <l-marker
            v-for="provider in markerProviders"
            :key="provider.row_id + provider.Marker"
            :visible="getMarkerVisibility(provider)"
            ref="provider"
            :icon="getProviderMarkerIcon(provider)"
            :draggable="true"
            @click="markerProviderClicked(provider)"
            @dragend="playProviderChime"
            :lat-lng="setMarkerLatLng(provider.Lat, provider.Lng)"
          />
          <l-geo-json v-for="geoData in loadedGeojson" :key="geoData.name"
            :visible="markerCategory === 'housing'"
            :geojson="geoData"
            :options="options"
            :options-style="styleFunction">
          </l-geo-json>

          
        </l-map>
      </div>
      <v-divider></v-divider>

      <v-speed-dial
          id="networkFab"
          v-show="true"
          direction="bottom"
          absolute
          top
          style="top: 12px;"
          transition="slide-y-transition"
          v-model="fab"
        >
        <template v-slot:activator>
          <v-btn
            v-bind="attrs"
            v-on="on"
            :loading="loading"
            color="Villager"
            small
            fab
          >
            <v-icon color="white" v-if="fab">
              mdi-close
            </v-icon>
            <v-icon color="white" v-else>
              {{purposeIcon}}
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-human-greeting', 'all')"
            >
              <v-icon size="40" color="white">mdi-human-greeting</v-icon>
            </v-btn>
          </template>
          All
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-plus', 'other')"
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
              color="Villager"
              @click="setPurpose('mdi-auto-fix', 'tech')"
            >
              <v-icon size="40" color="white">mdi-auto-fix</v-icon>
            </v-btn>
          </template>
          Non-profit Technology
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-school', 'education')"
            >
              <v-icon size="40" color="white">mdi-school</v-icon>
            </v-btn>
          </template>
          Education
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-star', 'women')"
            >
              <v-icon size="40" color="white">mdi-star</v-icon>
            </v-btn>
          </template>
          Women
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-vote', 'voting')"
            >
              <v-icon size="40" color="white">mdi-vote</v-icon>
            </v-btn>
          </template>
          Voting
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-domain', 'work')"
            >
              <v-icon size="40" color="white">mdi-domain</v-icon>
            </v-btn>
          </template>
          Work
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              color="Villager"
              @click="setPurpose('mdi-home-heart', 'housing')"
            >
              <v-icon size="40" color="white">mdi-home-heart</v-icon>
            </v-btn>
          </template>
          Housing
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
      width="400"
      flat
      persistent
      v-model="modelDialog">
      <v-card>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="modelDialog = false">
            <v-icon color="Villager">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-img
          class="ma-1"
          width="50px"
          height="50px"
          contain
          src="custom-marker-villager.png">
        </v-img>
      </v-card>
    </v-dialog>
    <v-dialog
      width="400"
      flat
      persistent
      v-model="appPollDialog">
      <v-card>
        <v-toolbar flat>
            <v-toolbar-title>
              {{ activeMarker.Marker }}
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="appPollDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <app-poll
          v-for="marker in markerSettings"
          v-show="activeMarker.Marker === marker.Marker"
          :key="marker.Marker"
          :questions="marker.questions"
          :story="marker.Story"
          color="Site">
        </app-poll>
        <app-poll
          v-for="provider in markerProviders"
          v-show="activeMarker.Marker === provider.Marker"
          :key="provider.Marker"
          :questions="provider.questions"
          :story="provider.Story">
        </app-poll>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { latLng, icon, marker } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker, LGeoJson, LMarker} from 'vue2-leaflet'
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
import axios from 'axios'

import KitDrawer from '@/components/KitDrawer.vue'
import AppPoll from '@/components/AppPoll.vue'

export default {
  mixins: [apiClient, entityTypes],
  components: { KitDrawer, AppPoll, LMap, LTileLayer, LCircleMarker, LControlFullscreen, LGeoJson, LFreeDraw, Vue2LeafletMarkerCluster, Vue2LeafletLocatecontrol, OpenStreetMapProvider, LMarker },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.redrawMap()
    this.getMarkerSettings()
  },
  computed: {
    getMarkerIcon () {
      return icon({
        iconUrl: 'custom-marker-villager.png',
        iconSize: [120, 120],
        iconAnchor: [60, 60],
        popupAnchor: [0, -28]
      })
    },
    styleFunction () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#ff5722',
          opacity: 0.6,
          fillColor: fillColor,
          fillOpacity: 0.01
        }
      }
    },
    options () {
      return {
        pointToLayer: function (feature, latlng) {
          var customIcon = icon({
            iconUrl: 'custom-marker-blank.png',
            iconSize: [12, 12],
            iconAnchor: [15, 15],
            popupAnchor: [0, -28]
          })
          return marker(latlng, { icon: customIcon })
        },
        onEachFeature: this.onEachFeatureFunction
      }
    }
  },
  async created () {
    // const response = await fetch('/geojson/Demolished_Property_Map.geojson')
    // const geojson = await response.json()
    // this.loadedGeojson.push(geojson)
    const response2 = await fetch('/geojson/MichiganCounties.geojson')
    const geojson2 = await response2.json()
    this.loadedGeojson.push(geojson2)
  },
  methods: {
    async getMarkerSettings () {
      const markers =  await this.getSettingsTab('Markers')
      
      this.markerSettings = await Promise.all(markers.map(async (row) => {
        let result = Object.assign({}, row)
        result.questions = row.Questions ? await await this.getSettingsTab(row.Questions) : null
        if(row.Questions) console.log(`%c (${row.Marker})->(:Questions)->(:Tab ${row.Questions} ${result.questions.length})`, 'background: #000; color: #ba68c8;')
        
        let providers = row.Providers ? await this.getSettingsTab(row.Providers) : null
        if(providers) console.log(`%c (${row.Marker})->(:Providers)->(:Tab ${row.Providers} ${providers.length})`, 'background: #444; color: #ba68c8;')

        if(providers) {
          providers = await Promise.all(providers.map(async (provider) => {
            let updatedProvider = Object.assign({}, provider)
            if(provider.Questions) {
              updatedProvider.questions = await this.getSettingsTab(provider.Questions)
            }
            return updatedProvider
          }))
        }

        if(providers) this.markerProviders.push(...providers)

        return result
      }))
      console.log(this.markerSettings)
      console.log(`%c ${this.markerSettings.length} (:Markers)`, 'background: #000; color: #ba68c8;')
      console.log(this.markerProviders)
      console.log(`%c ${this.markerProviders.length} (:Providers)`, 'background: #444; color: #ba68c8;')
    },
    getSettingsTab (tabId) {
      const url = process.env.VUE_APP_NO_CODE_API_PARTNER_SETTINGS
      return new Promise ((resolve, reject) => {
          axios({
            method: 'get', url, 
            params: {tabId},
          }).then((response) => {
            console.log(response.data.data);
            console.log(`%c (:Public:Source)->(:GoogleSheets)->(:Tab {${tabId}})`, 'background: #000; color: #ba68c8');
            resolve(response.data.data)
          }).catch(reject)
        })
    },
    getMarkerVisibility (marker) {
      return marker.Category.includes(this.markerCategory)
    },
    getLoadedMarkerIcon (marker) {
      return icon({
        iconUrl: marker.Icon,
        iconSize: [120, 120],
        iconAnchor: [60, 60],
        popupAnchor: [0, -28]
      })
    },
    getProviderMarkerIcon (partner) {
      return icon({
        iconUrl: partner.Icon,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -28]
      })
    },
    setMarkerLatLng (lat, lng) {
      return latLng(lat, lng)
    },
    getPartnerVisibility (provider) {
      return provider.Category.includes(this.markerCategory)
    },
    getPartnerMarkerIcon (partner) {
      return icon({
        iconUrl: partner.icon,
        iconSize: [120, 120],
        iconAnchor: [60, 60],
        popupAnchor: [0, -28]
      })
    },
    getBlankMarkerIcon () {
      return icon({
        iconUrl: 'custom-marker-blank.png',
        iconSize: [120, 120],
        iconAnchor: [60, 60],
        popupAnchor: [0, -28]
      })
    },
    playGrantChime: function () {
      var audio = new Audio('grant.mp3')
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    },
    playProviderChime: function () {
      var audio = new Audio('beacon_provider.mp3')
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    },
    playBeaconChime: function () {
      var audio = new Audio('beacon.mp3')
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    },
    playClaimChime: function () {
      var audio = new Audio('claim.mp3')
      audio.volume = 0.15
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    },
    entityMarkerClicked: function () {
      this.modelDialog = true
    },
    markerClicked: function (marker) {
      console.log('%c marker clicked', 'color: #f00')
      this.appPollDialog = true
      this.activeMarker = marker
      this.playBeaconChime()
    },
    markerProviderClicked: function (provider) {
      console.log('%c provider clicked', 'color: #f00')
      this.appPollDialog = true
      this.activeMarker = provider
      this.playBeaconChime()
    },
    markerMoved: function () {
      this.markerDragged = true
      this.lastMarkerPosition = this.$refs.dragMarker.mapObject['_latlng']
    },
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
    setPurpose: function (icon, markerCategory) {
      this.purposeIcon = icon
      this.markerCategory = markerCategory
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
        this.entityMarkerVisible = !this.entityMarkerVisible
        this.markerDragged = false
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
    remainingGrantFunds: '$5,000.00',
    geosearchOptions: { // Important part Here
      provider: new OpenStreetMapProvider()
    },
    loadedGeojson: [],
    entityMarkerVisible: false,
    dragStartMarkerVisible: false,
    businesses: [],
    loadingBusinesses: false,
    pathwaysMenu: false,
    shareViewDialog: false,
    gigsDialog: false,
    gigs: [
      {
        moniker: 'Promotion',
        description: 'Language services subsidy',
        pay: '$5000 yearly',
        icon: 'mdi-tag-outline',
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
        moniker: 'Mentorship Program',
        description: 'K-12',
        icon: 'mdi-school',
        chips: [
          'face coverings', 'children'
        ]
      }, {
        moniker: 'Transportation Gig',
        description: null,
        icon: 'mdi-train-car',
        pay: '$33.00 hourly',
        chips: [
          'face coverings', 'fuel included', 'drivers license'
        ]
      }, {
        moniker: 'Indoor Job',
        description: 'tax assistance',
        icon: 'mdi-domain',
        pay: '$52.27 hourly',
        chips: [
          'face coverings', 'transportation'
        ]
      }
    ],
    claimDescription: 'Claim this?',
    snackbar: true,
    purposeIcon: 'mdi-human-greeting',
    zoom: 11,
    markerDragged: false,
    lastMarkerPosition: latLng(42.9634, -85.6681),
    firstMarkerPosition: latLng(42.9634, -85.6681),
    mapCenter: latLng(42.9634, -85.6681),
    circleMarker: {
      center: latLng(42.9634, -85.6681),
      radius: 150,
      color: 'white',
      fillColor: 'purple'
    },
    markerCategory: 'all',
    activeMarker: {},
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
    connected: true,
    statusSnackbar: false,
    modelDialog: false,
    appPollDialog: false,
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
    dialog: true,

    markerSettings: [],
    markerProviders:[],
    stripeSettings: [],
    mapBoxSettings: [],
    partnerQuestions: []
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
