<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card tile flat>
      <v-toolbar
      >
        <v-btn
          icon
          @click="goBack"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{enterContext}}</v-list-item-title>
            <v-list-item-subtitle>Command Center</v-list-item-subtitle>
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
            <v-list-item>
              <v-list-item-title class="caption">
                <v-icon left>
                  mdi-crosshairs-gps
                </v-icon>
                enable gps
              </v-list-item-title>
            </v-list-item>
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
      <!-- gps, share -->
      <v-progress-linear
        v-if="loading"
        indeterminate
      ></v-progress-linear>

      <div
        ref="mapContainer"
        width="100%"
        style="width: 100vw; z-index:-1; height: calc(100vh - 170px);">
        <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          :attributionControl="false"
          style="height: calc(100vh - 170px); width: 100vw;"
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
          <l-geo-json v-for="geoData in loadedGeojson" :key="geoData.name"
            :geojson="geoData"
            :options="options"
            :options-style="styleFunction">
          </l-geo-json>
        </l-map>
      </div>
     <v-btn
      class="ma-5"
      color="Data"
      x-large
      @click="actorIsReady">
       <v-icon left>
         mdi-power-plug
       </v-icon>
       connect
     </v-btn>
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
                  <v-icon color="Data" v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon size="50" color="Data" v-else>
                    {{purposeIcon}}
                  </v-icon>
                </v-btn>
              </template>
              Service
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
                color="Data"
                @click="setPurpose('mdi-plus', 'Other')"
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
                color="Data"
                @click="setPurpose('mdi-chart-bubble', 'Models')"
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
              color="Data"
              @click="setPurpose('mdi-earth', 'Neighbors')"
            >
              <v-icon size="40" color="white">mdi-earth</v-icon>
            </v-btn>
          </template>
          Homes
        </v-tooltip>
      </v-speed-dial>
    </v-card>
    <v-dialog
      v-model="geoJsonDialog"
      width="500">
      <v-card>
        <v-toolbar flat>
          <v-icon left size="40" class="Data--text">
            mdi-chart-timeline-variant
          </v-icon>
          <v-card-title
            class="caption">
            Visualize GeoJSON file
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="geoJsonDialog = false" icon>
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider class="mb-2"></v-divider>
        <v-text-field
          v-model="geoJsonUrl"
          color="Data"
          class="mx-4"
          :loading="loadingGeoJson"
          label="paste a link to a .geojson file"
          hint="http://example.com/data.geojson"
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Data"
            :loading="loadingGeoJson"
            @click="visualizeGeoJson">
            <v-icon left>
              mdi-upload
            </v-icon>
            visualize data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="shareViewDialog"
      width="500">
      <v-card>
        <v-toolbar flat>
          <v-icon left size="40" class="Data--text">
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
            icon
            @click="hereDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-text-field
          rounded
          class="px-5"
          label="username"
          outlined>
        </v-text-field>
        <v-text-field
          rounded
          class="px-5"
          type="password"
          label="password"
          outlined>
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="main"
            small
            text>
            Sign Up
          </v-btn>
          <v-btn
            x-large
            color="Data">
            <v-icon left>
              mdi-account-circle
            </v-icon>
            Start
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>

        <v-card-title class="caption">
          Login using a Service
        </v-card-title>
        <v-card-actions>
          <v-btn
            text>
            <v-icon left>
              mdi-google
            </v-icon>
            google
          </v-btn>
          <v-btn
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
        <v-toolbar flat color="Data">
          <v-icon color="white" left>mdi-shield-check</v-icon>
          <v-toolbar-title class="white--text">Command Center</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="networkOptionsDialog = false">
            <v-icon class="white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-crosshairs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Set Boundary</v-list-item-title>
                <v-list-item-subtitle>Set geospatial bounds</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-crosshairs-question</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Request Information</v-list-item-title>
                <v-list-item-subtitle>Ask for information or feedback</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-checkbox-marked-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Load Records</v-list-item-title>
                <v-list-item-subtitle>Load information or feedback</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-human-handsup</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Rally Volunteers</v-list-item-title>
                <v-list-item-subtitle>Engage and coordinate volunteers</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-5"></v-divider>
            <v-list-item
              @click="geoJsonDialog = true">
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-chart-timeline-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>GeoJSON</v-list-item-title>
                <v-list-item-subtitle>Show geographic data by neighbors</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Photos</v-list-item-title>
                <v-list-item-subtitle>Show photos by neighbors</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-video</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Video</v-list-item-title>
                <v-list-item-subtitle>Show videos by neighbors</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-microphone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Audio</v-list-item-title>
                <v-list-item-subtitle>Show audio by neighbors</v-list-item-subtitle>
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
      bottom
      color="Data accent-4"
      rounded="pill"
      elevation="24"
    >
      3 Claims in this area!

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="goToProcessCenter"
        >
          open
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
import apiClient from '@/mixin/api-client'
import entityTypes from '@/mixin/entity-types'
import moment from 'moment'
export default {
  mixins: [apiClient, entityTypes],
  components: { LMap, LTileLayer, LControlFullscreen, LCircleMarker, LGeoJson },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.redrawMap()
  },
  async created () {
    const response = await fetch('/geojson/GRHealth_ChildrenInPoverty.geojson')
    const geojson = await response.json()
    const response2 = await fetch('/geojson/Grand_Rapids_Race_And_Ethnicity.geojson')
    const geojson2 = await response2.json()
    // const response3 = await fetch('/geojson/Demolished_Property_Map.geojson')
    // const geojson3 = await response3.json()
    const response3 = await fetch('/geojson/City_of_Grand_Rapids_Wards.geojson')
    const geojson3 = await response3.json()
    this.loadedGeojson.push(geojson)
    // this.loadedGeojson.push(geojson2)
    this.loadedGeojson.push(geojson3)
  },
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#ff5722',
          opacity: 0.25,
          fillColor: fillColor,
          fillOpacity: 0.25
        }
      }
    },
    styleFunction2 () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 4,
          color: '#ff5722',
          opacity: 0.15,
          fillColor: fillColor,
          fillOpacity: 0.015
        }
      }
    },
    styleFunction3 () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 4,
          color: '#ff5722',
          opacity: 0.15,
          fillColor: fillColor,
          fillOpacity: 0.015
        }
      }
    }
  },
  methods: {
    goBack: function () {
      this.$router.push('/')
    },
    goToProcessCenter: function () {
      this.$router.push('/process-center')
    },
    setPurpose: function (icon, enterContext) {
      this.purposeIcon = icon
      this.enterContext = enterContext
    },
    addGeoJson: async function () {
      const response = await fetch(this.geoJsonUrl)
      const geojson = await response.json()
      this.loadedGeojson.push(geojson)
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
      this.hereDialog = true
      console.log('show dialog..')
    },
    close: function () {
      this.$emit('close')
    },
    visualizeGeoJson: async function () {
      this.loadingGeoJson = true
      await this.addGeoJson()
      this.geoJsonDialog = false
      this.networkOptionsDialog = false
      this.loadingGeoJson = false
    }
  },
  data: () => ({
    geosearchOptions: {
      provider: new OpenStreetMapProvider()
    },
    loadingGeoJson: false,
    geoJsonUrl: null,
    geoJsonDialog: false,
    shareViewDialog: false,
    enterContext: 'Neighbors',
    snackbar: true,
    purposeIcon: 'mdi-earth',
    zoom: 11,
    mapCenter: latLng(42.9634, -85.6681),
    circleMarker: {
      center: latLng(42.9634, -85.6681),
      radius: 150,
      color: 'white',
      fillColor: 'white'
    },
    center: latLng(42.9634, -85.6681),
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VuZGVsbGpvc2VwaCIsImEiOiJja3IxZ252YWkxYm00MnBvNzhudWpvZGhvIn0.10YRNB3jfk6CedUpgXfPBA',
    attribution: '',
    withTooltip: latLng(47.41422, -1.250482),
    mapOptions: {
      zoomSnap: 0.5
    },
    showDevMessage: false,
    showMap: true,

    fab: false,
    organizationName: null,
    firstLoad: true,
    loading: false,

    hereDialog: false,
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
    isSite: false,
    labelIcon: 'mdi-help',
    siteLabelicon: 'mdi-web',
    dialog: true,

    geojson: null,
    geojson2: null,
    geojson3: null,
    loadedGeojson: []
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
</style>
