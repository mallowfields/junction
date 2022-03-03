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
      <v-toolbar absolute width="100%" dense>
        <div class="caption small">Found (2) Gigs, (2) Appointments</div>
        <v-spacer></v-spacer>
        <v-divider vertical class="mx-5"></v-divider>
        <div>
          <div class="caption small Site--text">$13,282.19</div>
          <div class="caption x-small grey--text">+ $51.00</div>
        </div>
        <v-icon class="ma-3 scale-big-small Site--text" size="20">
          mdi-cash-100
        </v-icon>
      </v-toolbar>
      <v-card>
        <v-progress-linear
            class="py-5"
            color="Site"
            buffer-value="0"
            value="100"
            height="10"
            striped
            stream
            reverse
          ></v-progress-linear>
          <v-list dense>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn
                    class="pa-5 ma-2"
                    color="Villager white--text">
                    <v-icon left>
                      mdi-human
                    </v-icon>
                    Adjust Profile
                  </v-btn>
                </v-list-item-title>
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
                  $45.50 - Cleaning
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Help clean and sanitize this place">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Site">face covering</v-chip>
                  <v-chip small color="Site">gloves</v-chip>
                  <v-chip small color="Site">food provided</v-chip>
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
                    $5.50 - Petcare
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Take the dogs for a mile walk">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Site">animals</v-chip>
                  <v-chip small color="Site">gloves</v-chip>
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
                    30 minutes - Healthcare
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Meet Dr. Holmstead wellness checkup">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager">children welcome</v-chip>
                  <v-chip small color="Villager">face coverings provided</v-chip>
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
                    1 hour - Vote
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Simon will take you to the polls">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager">friend</v-chip>
                  <v-chip small color="Villager">face coverings provided</v-chip>
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
                    10 minutes - Healthcare
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Meet Dr. Fairfield wellness checkup">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Villager">children welcome</v-chip>
                  <v-chip small color="Villager">face coverings provided</v-chip>
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
                    2 hours - Volunteering
                  </h3>
                </v-list-item-title>
                <v-checkbox
                  label="Assist with Code for Good">
                </v-checkbox>
                <v-chip-group
                  column
                >
                  <v-chip small color="Data">children welcome</v-chip>
                  <v-chip small color="Data">face coverings provided</v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-card tile flat>
      <v-toolbar
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
            <v-list-item-subtitle>My World</v-list-item-subtitle>
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
      :color="!connected ? 'Villager' : 'Site'"
      x-large
      :disabled="connecting"
      @click="actorIsReady">
       <v-icon left>
         {{ !connected ? 'mdi-power-plug mdi-rotate-90' : 'mdi-dots-horizontal' }}
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
                color="Villager"
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
              color="Villager"
              @click="setPurpose('mdi-earth', 'Neighbors')"
            >
              <v-icon size="40" color="white">mdi-earth</v-icon>
            </v-btn>
          </template>
          Neighbors
        </v-tooltip>
      </v-speed-dial>
    </v-card>
    <v-snackbar
      :timeout="-1"
      multi-line
      absolute
      bottom
      class="mb-1 mx-5"
      style="max-width: calc(100vw - 100px);"
      >
        <v-list-item Three-line>
          <v-list-item-icon>
            <v-icon>
              {{labelIcon}}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{selectedNode ? selectedNode.type : ''}} - {{selectedNode ? selectedNode.displayName : selectedNode}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{selectedNode && selectedNode.description}}
              <v-divider class="my-5"></v-divider>
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
                      color="secondary"
                      @click="editDialog = true">
                      <v-icon>mdi-tune</v-icon>
                    </v-btn>
                  </template>
                      Edit
                </v-tooltip>
                <v-tooltip
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
                </v-tooltip>
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
                      <v-icon>mdi-star-circle</v-icon>
                    </v-btn>
                  </template>
                  Content
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
            </v-list-item-subtitle>
          </v-list-item-content>
          <!-- <v-list-item-subtitle> -->
            
          <!-- </v-list-item-subtitle> -->
        </v-list-item>

    </v-snackbar>
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
          <v-card-title>{{enterContext}}</v-card-title>
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
        {{enterContext}}
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
import { Network } from 'vis-network/peer/esm/vis-network'
import { DataSet } from 'vis-data/peer/esm/vis-data'
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
      }, 1300)
    },
    setPurpose: function (icon, enterContext) {
      this.purposeIcon = icon
      this.enterContext = enterContext
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
      // this.reset()
      this.$emit('close')
    },
    reset: function () {
      this.nodes = new DataSet([])
      this.edges = new DataSet([])
      this.network = null
    },
    reloadGraph () {
      this.redrawMap()
      this.reset()
      // this.loadData()
    },
    createContainer: function () {
      const container = this.$refs['network']
      const data = {
        nodes: this.nodes,
        edges: this.edges
      }
      var options = {
        groups: {
          'Entity': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 18, shape: 'circularImage', image: '/shape-plus.svg' },
          'Actor': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 16, shape: 'circularImage', image: '/account-circle.svg' },
          'Workflow': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 18, shape: 'circularImage', image: '/check-all.svg' },
          'Task': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 10, shape: 'circularImage', image: '/check.svg' },
          'Site': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 25, shape: 'circularImage', image: '/web.svg' }
        },
        nodes: {
          shape: 'dot',
          size: 12,
          shadow: {
            enabled: true,
            size: 3,
            x: 1,
            y: 2
          },
          font: {
            color: this.$store.state.displayTheme === 'dark' ? '#eee' : '#000'
          }
        },
        interaction: {
          hover: true,
          hoverConnectedEdges: true
        }
      }
      this.network = new Network(container, data, options)
      this.network.on('click', (event) => {
        if (event.nodes.length) {
          this.selectedNode = this.nodes.get(event.nodes[0])
          this.isSite = this.selectedNode.type === 'Site'
          this.isTool = this.selectedNode.type === 'Task'
          this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
          this.showNodeDetails = true
          this.snackBarColor = options.groups[this.selectedNode.type].color
          this.showFab = true
        } else {
          this.showNodeDetails = false
          this.isSite = null
          this.isTool = null
          this.showFab = false
        }
      })
      this.network.on('hoverNode', (event) => {
        // this.selectedNode = this.nodes.get(event.node)
        // this.isSite = this.selectedNode.type === 'Site'
        // this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
        // this.showNodeDetails = true
        // this.snackBarColor = options.groups[this.selectedNode.type].color
        // this.showFab = true
      })
      this.network.on('blurNode', (event) => {
        // this.showNodeDetails = false
        // this.isSite = null
        // this.isTool = null
        // this.showFab = false
      })
      this.network.on('hold', (event) => {
        this.selectedNode = {}
        if (event.nodes[0]) {
          this.selectedNode = this.nodes.get(event.nodes[0])
          this.isSite = this.selectedNode.type === 'Site'
          this.isTool = this.selectedNode.type === 'Task'

          this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
          
          if (!this.isSite) this.nodeModificationDialog = true
          if (this.isSite) this.siteModificationDialog = true
          return
        }
        this.networkOptionsDialog = true
        console.log(event, this.networkOptionsDialog)
      })
      this.network.on('deselectNode', (event) => {
        this.selectedNode = {}
        this.isSite = null
        this.isTool = null
      })
    },
    showSelectedNodeInfo: function () {
      if (this.selectedNode.type === 'Site') {
        this.siteDialog = true
        return
      }
      this.editDialog = true
    },
    getEntityLabelIcon: function (entity) {
      let entityType = this.entityTypes.filter((options) => {
        return options.label === entity.type
      })
      return entityType.length ? entityType[0].icon : 'mdi-alert-circle'
    },
    labelNodeBy: function (prop, arr) {
      arr.forEach((item) => {
        item.title = item[prop]
        item.label = item.type
        item.group = item.type
      })

      return arr
    },
    getNodes: async function () {
      let sites = await this.api('map').site.getAll()
      this.labelNodeBy('displayName', sites)
      sites.forEach((site) => {
        site.group = 'Site'
        site.label = site.title
      })
      this.nodes.add(sites)

      let entities = await this.api('map').entity.getAll()
      this.labelNodeBy('displayName', entities)
      entities.forEach((entity) => {
        entity.label = entity.title
      })
      this.nodes.add(entities)

      let actors = await this.api('map').actor.getAll()
      this.labelNodeBy('displayName', actors)
      entities.forEach((actor) => {
        actor.label = actor.title
      })
      this.nodes.add(actors)

      let workflows = await this.api('map').workflow.getAll()
      this.labelNodeBy('displayName', workflows)
      workflows.forEach((workflow) => {
        workflow.label = workflow.title
      })
      this.nodes.add(workflows)

      let tasks = await this.api('map').task.getAll()
      this.labelNodeBy('displayName', tasks)
      this.nodes.add(tasks)

      let edges = []
      await Promise.all(sites.map(async (item) => {
        let site = await this.api('map').site.get(item.id)
        site.entities.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
        site.actors.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
        site.workflows.forEach((id) => {
          edges.push({
            from: site.id,
            to: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                type: 'arrow'
              }
            }
          })
        })
        site.tasks.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(entities.map(async (item) => {
        let entity = await this.api('map').entity.get(item.id)
        entity.entities.forEach((eid) => {
          edges.push({
            to: entity.id,
            from: eid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.actors.forEach((aid) => {
          edges.push({
            to: entity.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.workflows.forEach((wid) => {
          edges.push({
            to: wid,
            from: entity.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.tasks.forEach((tid) => {
          edges.push({
            to: tid,
            from: entity.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(actors.map(async (item) => {
        let actor = await this.api('map').actor.get(item.id)

        actor.entities.forEach((aid) => {
          edges.push({
            to: actor.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.actors.forEach((aid) => {
          edges.push({
            to: actor.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.workflows.forEach((wid) => {
          edges.push({
            to: wid,
            from: actor.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.tasks.forEach((tid) => {
          edges.push({
            to: tid,
            from: actor.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(workflows.map(async (item) => {
        let workflow = await this.api('map').workflow.get(item.id)

        workflow.tasks.forEach((tid) => {
          edges.push({
            to: workflow.id,
            from: tid,
            color: '#2196F3',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(tasks.map(async (item) => {
        let task = await this.api('map').task.get(item.id)

        task.tools.forEach((tid) => {
          edges.push({
            to: task.id,
            from: tid,
            color: '#2196F3',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      this.edges.add(edges)
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
    loadData: async function () {
      this.loading = true
      await this.getNodes()
      this.createContainer()
      this.loading = false
    },
    getNodesAsList: function () {
      const nodes = this.nodes.get()
      return nodes.map((node) => {
        return node.displayName
      })
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
          fillColor: 'purple'
        }, {
          moniker: 'EuzenConnect',
          center: latLng(42.97043760898049, -85.67471522173447),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'NAACP',
          center: latLng(42.93593381097306, -85.65786251021242),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Treetops Collective',
          center: latLng(42.946505929857985, -85.66705535806263),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Mallowfields',
          center: latLng(42.94260261726618, -85.67807064326311),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Lions & Rabbits',
          center: latLng(42.986355109074836, -85.66620189814095),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Grand Valley State University',
          center: latLng(42.9633899227588, -85.88859055639922),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Fort Valley State University',
          center: latLng(32.534688671924854, -83.89550132508403),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
        }, {
          moniker: 'Georgia Gwinnette College',
          center: latLng(33.97973044216388, -84.00389373600575),
          radius: 20,
          color: 'white',
          fillColor: 'purple'
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
    applyingFilter: false,
    showNodeDetails: false,
    snackBarColor: null,
    selectedNode: {},
    selectedEdge: {},
    network: null,
    nodes: new DataSet([]),
    edges: new DataSet([]),
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
    isSite: false,
    labelIcon: 'mdi-help',
    siteLabelicon: 'mdi-web',
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
