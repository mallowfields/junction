<template>
  <v-card tile flat>
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
            mdi-star-circle-outline
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
            @click="connectProfile"
            v-touch="{
              right: () => connectProfile()
            }"
            :class="connectionProgressColor"
            >
            <v-list-item-content>
              <v-list-item-title class="d-flex caption align-center justify-content justify-center white--text">
                <v-icon right class="mr-5" size="50" color="white">{{ !validated ? "mdi-navigation mdi-rotate-90" : "mdi-content-cut" }}</v-icon>
                {{ validationMessage }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense two-line>
            <v-list-item-icon>
              <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Verified Gig
              </v-list-item-title>
              <v-list-item-subtitle class="caption">This is an Officially Supported Gig</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense two-line>
            <v-list-item-icon>
              <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Tested Gig
              </v-list-item-title>
              <v-list-item-subtitle class="caption">This Gig has been Tested Recently</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense two-line>
            <v-list-item-icon>
              <v-icon class="mt-5" color="Villager">mdi-shield-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Secure Gig
              </v-list-item-title>
              <v-list-item-subtitle class="caption">This Gig uses Secured Resources</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense two-line>
            <v-list-item-icon>
              <v-icon class="mt-5 scale-big-small" color="Villager">mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Public Gig
              </v-list-item-title>
              <v-list-item-subtitle class="caption ">This gig is backed by a non-profit organization</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    <v-dialog
      fullscreen
      v-model="claimGiftDialog">
        <v-card
          :style="$store.state.displayTheme === 'dark' ? 'background: url(/grey-gradient-background.jpg)' : 'background: url(/card-texture.png)'"
          class="pa-5">
          <v-toolbar color="Site darken-3" tile>
            <v-icon large left color="Villager lighten-4">
              mdi-check-bold
            </v-icon>
            <v-spacer></v-spacer>
            <v-btn
              icon
              left
              @click="claimGiftDialog = false">
              <v-icon color="Villager lighten-4">
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title
            class="pa-3">
            Grant claimed!
          </v-card-title>
        </v-card>
    </v-dialog>
    <v-card
      flat
      tile
      class="mx-auto"
    >
      <!-- <app-poll :questions="questions" color="Site"></app-poll> -->
      <v-list three-line>
        <v-list-item-group
          v-model="selected"
        >
          <v-list-item
              :key="grant.Marker"
              v-for="(grant, index) in grants">
            <v-col>
              <v-img
                class="ma-0 pa-0"
                contain
                height="70px"
                :src="grant.Icon">
              </v-img>
              <v-list-item-content>
                {{grant.Story}}
              </v-list-item-content>
              <v-row>
                <v-list-item-content>
                  <v-list-item-subtitle class="caption">
                    <v-icon small color="Villager" class="mb-1">
                      mdi-human-greeting
                    </v-icon>
                    {{grant.Marker}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-row>
              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0 mb-2"
                >
                  <v-rating
                    :value="5"
                    color="amber"
                    dense
                    size="14"
                  ></v-rating>
                <v-chip x-small outlined class="ml-3">grant available</v-chip>
                </v-row>

                <div>A grant has been found and funded in your area! Your final step is to claim this request, you may do so now!</div>
              </v-card-text>
              <v-row>
                <v-spacer></v-spacer>
                <v-list-item-action>
                  <v-btn
                      x-large
                      outlined
                      @click="requestGrant(index)"
                      :color="$store.state.displayTheme === 'dark' ? 'Site darken-2 Villager--text text--lighten-4' : 'Site darken-2 Villager--text text--lighten-3'">
                    <span>
                      {{$vuetify.breakpoint.smAndUp ? 'Click' : 'Tap'}} to claim
                    </span>

                    <v-icon
                      small
                      :color="$store.state.displayTheme === 'dark' ? 'Site' : 'Site'" right>
                      mdi-check-bold
                    </v-icon>
                  </v-btn>
                  <!-- <stripe-checkout
                    :ref="index + 'checkoutRef'"
                    mode="payment"
                    :pk="publishableKey"
                    :line-items="lineItems"
                    :success-url="successURL"
                    :cancel-url="cancelURL"
                    @loading="v => claimLoading = v"
                  /> -->
                </v-list-item-action>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-list-item>
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
            Gigs
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
            @click="setPurpose('mdi-star-circle-outline', 'Gigs')"
          >
            <v-icon size="40" color="white">mdi-star-circle-outline</v-icon>
          </v-btn>
        </template>
        Gig
      </v-tooltip>
    </v-speed-dial>
    <v-snackbar
      v-model="showRequestSnackbar"
      :timeout="-1"
      color="Site darken-3"
    >
      <v-icon class="my-3" color="Villager lighten-3" left>
        mdi-human-greeting
      </v-icon>
      {{giftStatus}}
      <v-progress-linear
        buffer-value="35"
        :value="giftProgressValue"
        color="Villager"
        height="15"
        striped
        stream
      ></v-progress-linear>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          rounded
          outlined
          v-bind="attrs"
          @click="() => { requestPending = false; showRequestSnackbar = false }">
          <v-icon small left>
            mdi-close
          </v-icon>
            Cancel
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import apiClient from '@/mixin/api-client'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import AppPoll from './AppPoll.vue'

export default {
  mixins: [apiClient],
  components: { StripeCheckout, AppPoll },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.grants = this.$store.state.grants
    this.validationMessage = 'CONNECT'
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
        this.validationMessage = 'DISCONNECT'
        this.validated = true
      }, 6000)
    },
    disconnectProfile: function () {
      this.validated = false
      this.connectionProgressColor = 'grey'
      this.connectionProgressValue = 30
      this.validationMessage = 'DISCONNECT'
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
    },
    claimGrant (index) {
      // Redirected to Stripe's secure checkout page
      this.$refs[index + 'checkoutRef'][0].redirectToCheckout()
    },
    requestGrant (index) {
      this.requestPending = true
      this.showRequestSnackbar = true
      this.giftProgressValue += 5

      new Promise((resolve) => {
        return this.nextGiftStatus('Finding neighbors...', 500, resolve)
      }).then(() => {
        return new Promise((resolve) => {
          this.giftProgressValue += 43
          return this.nextGiftStatus('Found (48) neighbors...', 500, resolve)
        })
      }).then(() => {
        return new Promise((resolve) => {
          this.giftProgressValue += 45
          return this.nextGiftStatus('Checking out...', 500, resolve)
        })
      }).then(() => {
        this.resetGiftStatus()
        this.showClaimGiftDialog()
      })
    },
    nextGiftStatus (status, delay, resolve) {
      this.giftStatus = status
      return setTimeout(() => {
        if (resolve) resolve()
      }, delay)
    },
    resetGiftStatus () {
      this.requestPending = false
      this.showRequestSnackbar = false
      this.giftProgressValue = 0
      this.giftStatus = ''
    },
    showClaimGiftDialog () {
      this.claimGiftDialog = true
    }
  },
  data: () => ({
    claimGiftDialog: false,
    requestPending: false,
    showRequestSnackbar: false,
    giftProgressValue: 0,
    giftStatus: '',
    publishableKey: process.env.VUE_APP_STRIPE_PK,
    claimLoading: false,
    lineItems: [
      {
        price: process.env.VUE_APP_STRIPE_PRICE_ID, // The id of the one-time price you created in your Stripe dashboard
        quantity: 1
      }
    ],
    successURL: window.location.href,
    cancelURL: window.location.href,
    profileDialog: false,
    connectionProgressValue: 10,
    connectionProgressColor: 'grey',
    validated: false,
    validationMessage: 'READY',
    activeProfile: {},
    enterContext: 'Gigs',
    purposeIcon: 'mdi-star-circle-outline',

    fab: false,
    organizationName: null,
    loading: false,

    hereDialog: false,
    networkOptionsDialog: false,
    showFab: true,

    dialog: true,
    grants: [],

    selected: [3, 4, 5, 6, 7, 8],
    items: [
      {
        action: '$25',
        headline: 'rapidGrant',
        subtitle: `Villager`,
        title: 'Museum Ticket'
      }, {
        action: '$100',
        headline: 'Affinity Mentoring',
        subtitle: `Villager`,
        title: 'Student Mentoring'
      }, {
        action: '$25',
        headline: 'Treetops Collective',
        subtitle: `Villager`,
        title: 'New American women and teen girls sponsorship'
      }, {
        action: '$25',
        headline: 'NAACP',
        subtitle: `Villager`,
        title: 'Voting Access - Transportation'
      }
    ],
    questions: [
      {
        question: 'Do you need a small grant?',
        detail: ''
      }, {
        question: 'Is this your neighborhood?',
        detail: 'The current map view'
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
