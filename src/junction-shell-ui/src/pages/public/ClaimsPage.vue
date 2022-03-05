<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
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
            <v-list-item-subtitle>Services</v-list-item-subtitle>
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
            <v-icon :color="connectionProgressColor" left>
              mdi-room-service-outline
            </v-icon>
            <div>{{activeProfile.title}}</div>
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
            <v-spacer></v-spacer>
            <v-btn
              small
              text
              color="Villager">
              <v-icon left>mdi-phone</v-icon>
              call provider
            </v-btn>
          </v-card-actions>
          <v-list dense>
            <v-list-item
              two-line
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
                <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Verified Service
                </v-list-item-title>
                <v-list-item-subtitle class="caption">This is an Officially Supported Service</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line>
              <v-list-item-icon>
                <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Tested Service
                </v-list-item-title>
                <v-list-item-subtitle class="caption">This service has been Tested Recently</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line>
              <v-list-item-icon>
                <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Secure Service
                </v-list-item-title>
                <v-list-item-subtitle class="caption">This service uses Secured Resources</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense two-line>
              <v-list-item-icon>
                <v-icon class="mt-5 scale-big-small" color="Villager">mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Public Service
                </v-list-item-title>
                <v-list-item-subtitle class="caption ">This service backed by a non-profit organization</v-list-item-subtitle>
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
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.title"
                v-touch="{
                  right: () => viewProfile(item)
                }">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left>
                        {{purposeIcon}}
                      </v-icon>
                      {{item.title}}
                    </v-list-item-title>

                    <v-list-item-subtitle
                      class="caption"
                    >
                      {{item.headline}}
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
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>

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
              Claims
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
                @click="setPurpose('mdi-heart', 'Outcomes')"
              >
              <v-icon size="40" color="white">mdi-heart</v-icon>
            </v-btn>
          </template>
          Outcomes
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
              @click="setPurpose('mdi-room-service-outline', 'Claims')"
            >
              <v-icon size="40" color="white">mdi-room-service-outline</v-icon>
            </v-btn>
          </template>
          Service
        </v-tooltip>
      </v-speed-dial>
    </v-card>

  </v-dialog>
</template>

<script>
import apiClient from '@/mixin/api-client'
export default {
  mixins: [apiClient],
  components: { },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
  },
  methods: {
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
        this.validationMessage = 'SWIPE RIGHT TO DISCONNECT'
        this.validated = true
      }, 6000)
    },
    disconnectProfile: function () {
      this.validated = false
      this.connectionProgressColor = 'grey'
      this.connectionProgressValue = 30
      this.validationMessage = 'SWIPE RIGHT TO CONNECT'
    },
    goBack: function () {
      this.$router.push('/')
    },
    goToCommand: function () {
      this.$router.push('/command-center')
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
    profileDialog: false,
    connectionProgressValue: 10,
    connectionProgressColor: 'grey',
    validated: false,
    validationMessage: 'SWIPE RIGHT TO CONNECT',
    activeProfile: {},
    enterContext: 'Claims',
    purposeIcon: 'mdi-room-service-outline',

    fab: false,
    organizationName: null,
    loading: false,

    hereDialog: false,
    networkOptionsDialog: false,
    showFab: true,

    dialog: true,

    selected: [3, 4, 5, 6, 7, 8],
    items: [
      {
        action: 'a few seconds ago',
        headline: 'Neighborly assistance with a project',
        subtitle: `Villager`,
        title: 'Neighborly Service'
      }, {
        action: '1 week ago',
        headline: 'My neighborhood utilities service',
        subtitle: `Villager`,
        title: 'City Service'
      }, {
        action: '1 month ago',
        headline: 'Subsidy for 6 months at a co-working space',
        subtitle: `Villager`,
        title: 'Entrepreneur'
      }, {
        action: '5 months ago',
        headline: 'Subsidy for startup mentorship',
        subtitle: `Villager`,
        title: 'Mentorship'
      }, {
        action: '5 months ago',
        headline: 'Subsidy for 500 miles of public transportation',
        subtitle: `Villager`,
        title: 'Transportation Service'
      }, {
        action: '6 months ago',
        headline: 'Subsidy for family Healthcare',
        subtitle: `Villager`,
        title: 'Family Healthcare'
      }
    ]
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
