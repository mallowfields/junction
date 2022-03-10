<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-left-transition"
      v-model="website">
      <v-card class="ma-0" flat outlined tile>
        <v-toolbar
          dark
          tile
        >
          <v-btn
            icon
            @click="website = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Data Source</v-list-item-title>
              <v-list-item-subtitle>@jessachalla</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
        </v-toolbar>
        <iframe
          :src="iframeSrc"
          width="100%"
          marginwidth="0"
          marginheight="0"
          hspace="0"
          vspace="0"
          frameborder="0"
          style="min-height: calc(100vh - 170px)"
          >
        </iframe>
      </v-card>
    </v-dialog>
    <v-card tile flat>
      <v-toolbar
        dark
        tile
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
            <v-list-item-subtitle>Businesses and Workplaces</v-list-item-subtitle>
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

          <v-list dense two-items>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="Villager" left>
                  mdi-lead-pencil
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  My Notes
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Visible only to who you choose
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-progress-linear
        color="Villager"
        buffer-value="0"
        value="35"
        height="10"
        striped
        stream
        reverse
      ></v-progress-linear>
      <v-dialog
        fullscreen
        transition="slide-x-transition"
        v-model="profileDialog">
        <v-card flat tile>
          <v-card-title>
            <v-btn icon
              @click="profileDialog = false">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-row class="text-truncate caption">
              {{activeProfile.name}}
            </v-row>
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

              <v-list dense two-items>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Villager" left>
                      mdi-bell-ring
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Send Notification
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      An Alert or a Reminder
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mb-3"></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Villager" left>
                      mdi-lead-pencil
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Private Note
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Visible only to who you choose
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Villager" left>
                      mdi-pause
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Pause
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Temporarily freeze connectivity
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  @click="goToCommand">
                  <v-list-item-action>
                    <v-icon color="Villager" class="sync-spin" left>
                      mdi-sync
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Synchronize
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Synchronize your view
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-progress-linear
            :color="connectionProgressColor"
            buffer-value="0"
            :value="connectionProgressValue"
            height="10"
            striped
            stream
          ></v-progress-linear>
          <v-card-actions>
            <v-btn
              small
              text
              disabled
              color="Villager">
              <v-icon left>mdi-web</v-icon>
              website
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              small
              text
              disabled
              color="Villager">
              <v-icon left>mdi-phone</v-icon>
              call business
            </v-btn>
          </v-card-actions>
          <v-list dense>
            <v-list-item
              two-line
              @click="connectProfile()"
              v-touch="{
                right: () => connectProfile()
              }"
              :class="connectionProgressColor"
              >
              <v-list-item-content>
                <v-list-item-title class="d-flex caption align-center justify-content justify-center white--text">
                  <v-icon right class="mr-5" size="50" color="white">{{ !validated ? "mdi-power-plug mdi-rotate-90" : "mdi-content-cut" }}</v-icon>
                  {{validationMessage}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line>
              <v-list-item-icon>
                <v-btn
                  icon
                  class="mt-1"
                  color="Villager">
                  <v-icon>mdi-shield-check</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Claim
                </v-list-item-title>
                <v-list-item-subtitle class="caption">Is this your business?</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line>
              <v-list-item-icon>
                <v-btn
                  icon
                  class="mt-1"
                  color="Villager">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Public Job
                </v-list-item-title>
                <v-list-item-subtitle class="caption ">This Job is backed by a non-profit organization</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
      <v-card
        flat
        tile
        class="mx-auto"
      >
        <v-list two-line>
          <v-list-item-group
            v-model="selected"
          >
            <template v-for="(item, index) in businesses">
              <v-list-item
                :key="item.name">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row class="my-2">
                        <v-col class="caption">
                          {{index+1}}.
                          <v-btn
                            text
                            x-small
                            outlined
                            class="ml-3"
                            @click="window.open('https://jessachalla.com/bipoc', '_blank')">
                            source
                          </v-btn>
                          <v-btn
                            x-small
                            class="ml-3 class"
                            color="Villager"
                            @click="viewProfile(item)">
                            connect
                          </v-btn>
                        </v-col>
                          <v-spacer></v-spacer>
                        <v-col class="caption">
                        </v-col>
                      </v-row>
                      <v-icon small left color="Villager" class="mb-1">
                        {{purposeIcon}}
                      </v-icon>
                      {{item.name}}
                    </v-list-item-title>

                    <v-list-item-subtitle
                      class="caption ml-8"
                    >
                      {{item.about}}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                    <div v-if="enterContext ==='Intake'">
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-home-heart
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-home-heart
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-currency-usd
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-currency-usd
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-alert
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-alert
                      </v-icon>
                    </div>

                    <div v-if="enterContext ==='Outcomes'">
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-av-timer
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-home-heart
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-av-timer
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-currency-usd
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-checkbox-blank-circle
                      </v-icon>

                      <v-icon
                        v-else
                        color="Villager darken-3"
                      >
                        mdi-emoticon
                      </v-icon>
                    </div>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < businesses.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-card>

  </v-dialog>
</template>

<script>
import apiClient from '@/mixin/api-client'
import axios from 'axios'

export default {
  mixins: [apiClient],
  components: { },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.getBusinesses()
  },
  methods: {
    getBusinesses () {
      this.loadingBusinesses = true
      const url = process.env.VUE_APP_NO_CODE_API_URL
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          this.businesses = response.data.data
          this.loadingBusinesses = false
        })
    },
    viewProfile: function (item, event) {
      this.activeProfile = item
      this.profileDialog = true
    },
    connectProfile: function () {
      if (this.validated) return this.disconnectProfile()

      this.connectionProgressValue = 60
      this.connectionProgressColor = 'Data'
      this.validationMessage = 'CONNECTING...'

      setTimeout(() => {
        this.connectionProgressColor = 'Villager'
        this.connectionProgressValue = 100
        this.validationMessage = 'CONNECTED!'
      }, 3000)

      setTimeout(() => {
        this.connectionProgressColor = 'Villager'
        this.connectionProgressValue = 100
        this.validationMessage = 'SWIPE RIGHT TO WITHDRAW'
        this.validated = true
      }, 6000)
    },
    disconnectProfile: function () {
      this.validated = false
      this.connectionProgressColor = 'grey'
      this.connectionProgressValue = 30
      this.validationMessage = 'SWIPE RIGHT TO APPLY'
    },
    goBack: function () {
      this.$router.push('/')
    },
    goToCommand: function () {
      this.$router.push('/neighbors')
    },
    goToProcessCenter: function () {
      this.$router.push('/process-center')
    },
    setPurpose: function (icon, enterContext) {
      this.purposeIcon = icon
      this.enterContext = enterContext
    },

    close: function () {
      this.$emit('close')
    }
  },
  data: () => ({
    website: false,
    iframeSrc: 'http://jessachalla.com/bipoc/',
    profileDialog: false,
    businesses: [],
    loadingBusinesses: false,
    connectionProgressValue: 10,
    connectionProgressColor: 'grey',
    validated: false,
    validationMessage: 'SWIPE RIGHT TO APPLY',
    activeProfile: {},
    enterContext: 'Jobs',
    purposeIcon: 'mdi-domain',

    fab: false,
    organizationName: null,
    loading: false,

    hereDialog: false,
    networkOptionsDialog: false,
    showFab: true,

    dialog: true,

    selected: []
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

.sync-spin {
    -webkit-animation:spin 3s linear infinite;
    -moz-animation:spin 3s linear infinite;
    animation:spin 3s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

.scale-big-small {
    -webkit-animation:scale 2s linear infinite;
    -moz-animation:scale 2s linear infinite;
    animation:scale 2s linear infinite;
}
@-moz-keyframes scale {
  0% {
    -moz-transform: scale(1); transform: scale(1)
  }
  50% {
    -moz-transform: scale(2); transform: scale(2)
  }
  100% {
    -moz-transform: scale(1); transform: scale(1)
  }
}
@-webkit-keyframes scale {
  0% {
    -webkit-transform: scale(1); transform: scale(1)
  }
  50% {
    -webkit-transform: scale(2); transform: scale(2)
  }
  100% {
    -webkit-transform: scale(1); transform: scale(1)
  }
}
@keyframes scale {
  0% {
    -webkit-transform: scale(1); transform: scale(1)
  }
  50% {
    -webkit-transform: scale(2); transform: scale(2)
  }
  100% {
    -webkit-transform: scale(1); transform: scale(1)
  }
}
</style>
