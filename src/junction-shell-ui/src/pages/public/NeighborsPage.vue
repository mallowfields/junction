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
      bottom
      mini-variant
      elevation="24"
      src="/grey-gradient-background.jpg"
      @transitionend="checkFab"
    >
      <v-toolbar
        width="100%"
        dense
        color="Villager"
        class="mb-5">
        <v-icon left>
          mdi-format-list-numbered
        </v-icon>
        <div class="caption small">(8) connections in your path</div>
        <v-spacer></v-spacer>
        <v-divider vertical class="mx-5"></v-divider>
        <div>
          <div class="caption small white--text">$282.00</div>
          <div class="caption x-small yellow--text">usd</div>
        </div>
        <v-icon class="ma-3 scale-big-small white--text" size="20">
          mdi-cash-100
        </v-icon>
      </v-toolbar>
      <v-btn-toggle
        dense
        dark
        class="ml-5"
      >
        <v-btn color="Villager" @click="goToProfiles">
          <v-icon left>
            mdi-human
          </v-icon>
          <span>Profiles</span>
        </v-btn>

        <v-btn color="Villager" @click="goToClaims">
          <v-icon left >
            mdi-room-service-outline
          </v-icon>
          <span>Claims</span>
        </v-btn>
      </v-btn-toggle>
      <v-card class="ma-2 pa-0">
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
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Site--text" x-large left>
                      mdi-cash-100
                  </v-icon>
                  #sanitization, $45.50
                  </h3>
                  <v-list-item-subtitle class="ma-5">12:00PM (in 19 minutes)</v-list-item-subtitle>
                </v-list-item-title>
                <v-checkbox
                  label="I can clean and sanitize this space">
                </v-checkbox>
                <v-checkbox
                  label="I can work alongside other people">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager lighten-3">face coverings</v-chip>
                  <v-chip small color="Villager lighten-3">gloves</v-chip>
                  <v-chip small color="Villager lighten-3">food</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Site--text" x-large left>
                      mdi-cash-100
                    </v-icon>
                    #petcare, $15.50
                  </h3>
                  <v-list-item-subtitle class="ma-5">3:00PM (in 3 hours 19 minutes))</v-list-item-subtitle>
                </v-list-item-title>
                <v-checkbox
                  label="I can walk medium sized dogs">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager lighten-3">animals</v-chip>
                  <v-chip small color="Villager lighten-3">gloves</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Villager--text" x-large left>
                      mdi-human-pregnant
                    </v-icon>
                    #healthcare
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="I will need a ride to the hospital">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager lighten-3">children</v-chip>
                  <v-chip small color="Villager lighten-3">face coverings</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Villager--text" x-large left>
                      mdi-vote
                    </v-icon>
                    #vote
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="I am already registered to vote in my district">
                </v-checkbox>
                <v-checkbox
                  label="I will need a ride">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager lighten-3">friend</v-chip>
                  <v-chip small color="Villager lighten-3">face coverings provided</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Villager--text" x-large left>
                      mdi-human-female
                    </v-icon>
                    #healthcare
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="I can wait in a short line">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager lighten-3">children welcome</v-chip>
                  <v-chip small color="Villager lighten-3">face coverings provided</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-2"></v-divider>
            <v-list-item
              two-line
              v-touch="{
                right: () => acceptPathwayItem()
              }">
              <v-list-item-content>
                <v-list-item-title>
                  <h3>
                    <v-icon class="Data--text" x-large left>
                      mdi-human-greeting
                    </v-icon>
                    #volunteering
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="I can lift 20 pounds">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip color="Villager lighten-3">children welcome</v-chip>
                  <v-chip color="Villager lighten-3">face coverings provided</v-chip>
                </v-chip-group>
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
     <v-btn
      class="ma-5"
      :color="!connected ? 'Villager' : 'Villager'"
      x-large
      :disabled="connecting"
      @click="actorIsReady">
       <v-icon left>
         {{ !connected ? 'mdi-power-plug mdi-rotate-90' : 'mdi-format-list-numbered' }}
       </v-icon>
       {{ !connected ? 'Login' : 'My Path' }}
     </v-btn>
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
              @click="setPurpose('mdi-plus', 'Other', 'Something else')"
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
              @click="setPurpose('mdi-earth', 'Neighbors', 'Services')"
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
      width="600"
      flat
      persistent
      v-model="claimsDialog">
      <v-card>
        <v-toolbar flat>
          <v-icon color="Villager">{{purposeIcon}}</v-icon>
          <v-card-title>{{mapContext}}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="claimsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="caption">
          {{claimDescription}}
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            rounded
            class="px-8 white--text"
            x-large
            color="Villager"
            @click="claimsDialog = false; actorIsReady();">
            <v-icon left>mdi-human-greeting</v-icon>
            yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="siteModificationDialog"
      width="78">
      <v-card class="pb-3">
        <v-divider></v-divider>
        <v-card-actions>
          <v-tooltip
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="mt-3"
                icon
                x-large
                outlined
                @click="goToSite(selectedNode)">
                <v-icon
                  size="70">mdi-rocket</v-icon>
              </v-btn>
            </template>
                Launch
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="nodeModificationDialog"
      :width="200">
      <v-card class="pb-3">
        <v-divider></v-divider>
        <v-card-actions>
          <v-tooltip
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="mt-3"
                icon
                large
                @click="editDialog = true">
                <v-icon>mdi-tune</v-icon>
              </v-btn>
            </template>
                Edit
          </v-tooltip>
          <!-- <v-tooltip
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="amber"
                icon
                large
                class="mt-3 ml-4"
                @click="automationDialog = true">
                <v-icon>mdi-auto-fix</v-icon>
              </v-btn>
            </template>
            Automation
          </v-tooltip> -->
          <v-tooltip
            v-if="isTool"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="isTool"
                color="blue"
                icon
                large
                class="mt-3 ml-4"
                @click="toolDialog = true">
                <v-icon>mdi-hammer-wrench</v-icon>
              </v-btn>
            </template>
            Tool
          </v-tooltip>
          <v-tooltip
            v-if="!isTool"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="Site"
                icon
                large
                class="mt-3 ml-4"
                @click="siteDialog = true">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>
            Sites
          </v-tooltip>
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
        <v-toolbar flat>
          <v-icon color="Villager">mdi-chart-bubble</v-icon>
          <v-card-subtitle>Add Information</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="networkOptionsDialog = false">
            <v-icon>mdi-close</v-icon>
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
            <v-divider class="my-5"></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Villager" class="ml-2 mt-2">mdi-image</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Image</v-list-item-title>
                <v-list-item-subtitle>Add an image</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Villager" class="ml-2 mt-2">mdi-video</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Video</v-list-item-title>
                <v-list-item-subtitle>Add a video</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Villager" class="ml-2 mt-2">mdi-microphone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Audio</v-list-item-title>
                <v-list-item-subtitle>Add audio</v-list-item-subtitle>
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
      color="Villager accent-4"
      rounded="pill"
      elevation="24"
    >
      <v-icon left class="mb-1">{{purposeIcon}}</v-icon>
      <span>
        {{mapContext}}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="Villager"
          class="claim-bounce"
          v-bind="attrs"
          rounded
          @click="snackbar = false; claimsDialog = true"
        >
          Claim
          <v-icon>
            mdi-room-service-outline
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="statusSnackbar"
      :timeout="-1"
      absolute
      top
      color="Villager accent-4"
      elevation="24"
    >
        <h1 class="h1">
          <v-icon>
            mdi-human-greeting
          </v-icon>
          Welcome
        </h1>
        <v-divider class="my-2"></v-divider>
        <div class="caption">
          Login successful
        </div>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          v-bind="attrs"
          text
          class="px-5"
          outlined
          @click="statusSnackbar = false;"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          ok
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
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';

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
    },
    acceptPathwayItem: function () {
      this.pathwaysMenu = false
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
    goToProfiles: function () {
      let site = `/profiles`
      this.$router.push(site)
      this.close()
    },
    goToClaims: function () {
      let site = `/claims`
      this.$router.push(site)
      this.close()
    }
  },
  data: () => ({
    geosearchOptions: { // Important part Here
      provider: new OpenStreetMapProvider(),
    },
    pathwaysMenu: false,
    shareViewDialog: false,
    claimsDialog: false,
    claimDescription: 'Claim this?',
    snackbar: true,
    enterContext: 'Neighbors',
    mapContext: 'Services',
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
      zoomSnap: 0.5
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
    -moz-transform: scale(1); transform: scale(1)
  }
  50% {
    -moz-transform: scale(1.1); transform: scale(1.1)
  }
  100% {
    -moz-transform: scale(1); transform: scale(1)
  }
}
@-webkit-keyframes claim {
  0% {
    -webkit-transform: scale(1); transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.25); transform: scale(1.25);
  }
  100% {
    -webkit-transform: scale(1); transform: scale(1)
  }
}
@keyframes claim {
  0% {
    -webkit-transform: scale(1); transform: scale(1)
  }
  50% {
    -webkit-transform: scale(1.25); transform: scale(1.25)
  }
  100% {
    -webkit-transform: scale(1); transform: scale(1)
  }
}
</style>
