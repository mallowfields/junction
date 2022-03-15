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
      <neighbors-drawer></neighbors-drawer>
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
            <v-list-item-title>Neighbors </v-list-item-title>
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
        {{ remainingGrantFunds }}
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
          
          <!-- <l-marker
            ref="dragMarker"
            :visible="entityMarkerVisible"
            :lat-lng="markerDragged ? lastMarkerPosition : circleMarker.center"
            :icon="getBlankMarkerIcon()"
            :draggable="true"
            @dragend="markerMoved"
            @click="entityMarkerClicked"
          /> -->
          <!-- <l-marker
            v-for="partner in marker.partners"
            :key="partner.moniker"
            ref="partner"
            :visible="getPartnerVisibility(marker)"
            :icon="getPartnerMarkerIcon(partner)"
            :draggable="true"
            @click="markerClicked(partner)"
            :lat-lng="partner.center"
          /> -->

           <l-marker
            v-for="marker in markerSettings"
            :key="marker.row_id"
            :visible="getMarkerVisibility(marker)"
            ref="marker"
            :icon="getLoadedMarkerIcon(marker)"
            :draggable="true"
            @click="markerClicked(marker)"
            :lat-lng="setMarkerLatLng(marker.Lat, marker.Lng)"
          />
          <!-- <l-geo-json v-for="geoData in loadedGeojson" :key="geoData.name"
            :geojson="geoData"
            :options="options"
            :options-style="styleFunction">
          </l-geo-json> -->

          
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
              color="Villager"
              @click="setPurpose('mdi-charity', 'all')"
            >
              <v-icon size="40" color="white">mdi-charity</v-icon>
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
            <v-toolbar-title class="Villager--text">
              {{ activeMarker.Marker }}
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="appPollDialog = false">
            <v-icon color="Villager">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <app-poll
          v-for="marker in markerSettings"
          v-show="activeMarker.Marker === marker.Marker"
          :key="marker.Marker"
          :questions="marker.questions"
          :story="marker.Story">
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

import NeighborsDrawer from '@/components/NeighborsDrawer.vue'
import AppPoll from '@/components/AppPoll.vue'

export default {
  mixins: [apiClient, entityTypes],
  components: { NeighborsDrawer, AppPoll, LMap, LTileLayer, LCircleMarker, LControlFullscreen, LGeoJson, LFreeDraw, Vue2LeafletMarkerCluster, Vue2LeafletLocatecontrol, OpenStreetMapProvider, LMarker },
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
          fillOpacity: 0.10
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
    const response = await fetch('/geojson/Demolished_Property_Map.geojson')
    const geojson = await response.json()
    this.loadedGeojson.push(geojson)
    console.log(geojson)
  },
  methods: {
    async getMarkerSettings () {
      const markers =  await this.getSettingsTab('Markers')
      let settings = markers.map(async (row) => {
        let result = Object.assign({}, row)
        result.questions = await this.getSettingsTab(row.Questions)
        console.log(`%c (${row.Marker})->(:Questions)->(:Tab ${row.Questions} ${result.questions.length})`, 'background: #000; color: #ba68c8;')
        return result
      })

      this.markerSettings = await Promise.all(settings)
      console.log(this.markerSettings)
      console.log(`%c ${this.markerSettings.length} (:Markers)`, 'background: #000; color: #ba68c8;')
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
    setMarkerLatLng (lat, lng) {
      return latLng(lat, lng)
    },
    getPartnerVisibility (partner) {
      return partner.category.includes(this.markerCategory)
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
    entityMarkerClicked: function () {
      this.modelDialog = true
    },
    markerClicked: function (marker) {
      console.log('clicked')
      this.appPollDialog = true
      this.activeMarker = marker
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
    remainingGrantFunds: '$5,000',
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
    purposeIcon: 'mdi-charity',
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
    marker: {
      partners: [
        {
          moniker: 'Community Housing Connect',
          story: 'Community Housing Connect is a free service to residents of Kent County, MI',
          center: latLng(42.97252947254143, -85.67439693255552),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-chc.png',
          category: ['all', 'housing'],
          questions: [
            {
              question: 'Do you need housing assistance?',
              detail: ''
            }, {
              question: 'Do you have minor dependent children in the household?',
              detail: 'This includes persons who are pregnant.'
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'EuzenConnect',
          story: 'Building equity into the employment ecosystem one connection at a time',
          center: latLng(42.97043760898049, -85.67471522173447),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-euzen.png',
          category: ['all', 'work'],
          questions: [
            {
              question: 'Do you need a gig or a job?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'NAACP',
          story: 'Step up with a gift that reflects your commitment to defending our democracy. Help eliminate the racial disparities that keep us from reaching equality for all',
          center: latLng(42.93593381097306, -85.65786251021242),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-naacp.png',
          category: ['all', 'voting', 'other'],
          questions: [
            {
              question: 'Are you registered to vote?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }, {
              question: 'Do you need transportation to your polling station?',
              detail: ''
            }
          ]
        }, {
          moniker: 'Treetops Collective',
          story: 'We started by asking questions. How can the world do a better job of welcoming refugees? How can we answer that question in our own community? How can we be a city where refugee women can sink their roots down and flourish with their families for generations to come?',
          center: latLng(42.946505929857985, -85.66705535806263),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-treetops.png',
          category: ['all', 'women', 'education'],
          questions: [
            {
              question: 'Are you a New American?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Affinity Mentoring',
          story: 'Our mission is to facilitate equitable growth in academics, social emotional skills, and self-esteem through mutually beneficial mentoring relationships. We believe in cultivating a brave space that amplifies the voices of young agents of change in a diverse and inclusive community.',
          center: latLng(42.95896873122738, -85.68815920379656),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-affinity.png',
          category: ['all', 'education'],
          questions: [
            {
              question: 'Are you a student seeking a mentor?',
              detail: ''
            }, {
              question: 'Are you a mentor seeking a student?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Mallowfields',
          story: 'Open Source Software',
          center: latLng(42.94260261726618, -85.67807064326311),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-mallowfields.png',
          category: ['all', 'tech', 'other'],
          questions: [
            {
              question: 'Are you a non-profit business?',
              detail: ''
            }, {
              question: 'Do you need modern software technology?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Lions & Rabbits',
          story: 'By meeting artists where they are, we drive and strengthen creative independence.',
          center: latLng(42.986355109074836, -85.66620189814095),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-lions.png',
          category: ['all', 'other'],
          questions: [
            {
              question: 'Do you need co-working space?',
              detail: ''
            }, {
              question: 'Do you need childcare?',
              detail: ''
            }, {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Grand Valley State University',
          center: latLng(42.9633899227588, -85.88859055639922),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-school.png',
          category: ['all', 'education'],
          questions: [
            {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Fort Valley State University',
          center: latLng(32.534688671924854, -83.89550132508403),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-school.png',
          category: ['all', 'education'],
          questions: [
            {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
        }, {
          moniker: 'Georgia Gwinnette College',
          center: latLng(33.97973044216388, -84.00389373600575),
          radius: 20,
          color: 'white',
          fillColor: 'pink',
          icon: 'custom-marker-school.png',
          category: ['all', 'education'],
          questions: [
            {
              question: 'Is this your neighborhood?',
              detail: 'The current map view'
            }
          ]
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
