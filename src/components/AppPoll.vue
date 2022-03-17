<template>
  <v-card flat tile>

    <v-card flat tile fluid class="d-flex flex-column align-center">
      <v-card
        tile
        flat
        v-show="pollComplete">
        <v-card-title class="d-flex justify-center align-center">
          <v-icon class="ma-3 scale-big-small red--text" size="40">
            mdi-heart
          </v-icon>
          <h3 class="ma-2">Thank you!</h3>
        </v-card-title>
        <v-divider class="mb-1"></v-divider>
        <v-card-text v-show="story">
          {{ story }}
        </v-card-text>

        <v-card-actions v-show="story">
          <v-btn-toggle
            >
            <v-btn
              outlined
              color="Villager lighten-4"
              @click="giveGift"
              >
              <span
                :class="$store.state.displayTheme === 'dark' ? 'Site--text text--lighten-5' : 'Site--text text--darken-3'">
                Give Gift
              </span>

              <v-icon
                :color="$store.state.displayTheme === 'dark' ? 'Site lighten-5' : 'Site darken-3'"
                right>
                mdi-gift
              </v-icon>
            </v-btn>
            <v-snackbar
              color="Site"
              class="pa-5 mt-10"
              top
              v-model="requestingGift"
              :timeout="-1">
              no grants available, please try again soon
            </v-snackbar>
            <v-btn
                color="Site darken-1"
                :loading="requestingGift"
                @click="requestGrant"
                >
              <span
                :class="$store.state.displayTheme === 'dark' ? 'white--text' : 'Villager--text text--lighten-3'">
                Request Grant
              </span>

              <v-icon
                :color="$store.state.displayTheme === 'dark' ? 'Villager lighten-5' : 'Villager lighten-3'" right>
                mdi-human-greeting
              </v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <stripe-checkout
          ref="checkoutRef"
          mode="payment"
          :pk="publishableKey"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
          @loading="v => giftLoading = v"
        />
        <v-btn v-show="story" disabled color="Site" text x-small outlined rounded class="subtitle mb-3 ml-2">
          recommended grant
        </v-btn>
      </v-card>
      <v-card
        tile
        outlined
        elevation="0"
        width="400px"
        class="ma-2"
        :style="$store.state.displayTheme === 'dark' ? 'background: url(/grey-gradient-background.jpg)' : 'background: url(/card-texture.png)'"
        v-show="!pollComplete"
        v-touch="{
          right: () => nextPollQuestion(),
          left: () => playChime()
        }"
      >
        <template slot="progress">
        </template>
        <v-img
          tile
          v-show="pollQuestion.image || pollQuestion.Image"
          height="110"
          :src="pollQuestion.image || pollQuestion.Image"
        ></v-img>
        <h2 class="pa-2">{{pollQuestion.question || pollQuestion.Question}}</h2>
        <v-btn
            class="ml-2"
            text
            x-small
            outlined
            @click="pollStop"
          >
            <v-icon x-small :color="color" class="mr-1">
              mdi-close-circle-outline
            </v-icon>
            SKIP
          </v-btn>
        <v-card-text>
          <div>{{pollQuestion.detail || pollQuestion.Detail}}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            :color="color"
            text
            x-large
            outlined
            :disabled="pollSkipped"
            @click="skip"
          >
            <v-icon left>
              mdi-close
            </v-icon>
            NO
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :color="color"
            x-large
            class="pr-5 white--text"
            @click="nextPollQuestion()"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            yes
          </v-btn>

        </v-card-actions>
        <v-progress-linear
          :color="color"
          :value="connectionProgressValue"
          height="5"
        ></v-progress-linear>
      </v-card>
    </v-card>
  </v-card>
</template>
<script>

import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
  components: { StripeCheckout },
  mounted: function () {
    this.pollQuestion = this.questions[0]
  },
  props: {
    questions: {
      type: Array,
      default: () => {
        return [{
          image: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-closeup-man-hands-texting-mobile-phone-outdoors-unknown-guy-touching-smartphone-screen-on-city-street-unrecognizable-person-hands-using-cellphone-outside_sf9ypadkw_thumbnail-1080_01.png',
          question: 'Do you have a smartphone?',
          detail: ''
        }, {
          image: 'https://th.bing.com/th/id/OIP.5Kg9Z3D3Xg3jT9gFTNn0SQHaFi?pid=ImgDet&rs=1',
          question: 'Do you want to do something?',
          detail: ''
        }, {
          image: 'https://static.wixstatic.com/media/e73c83_c9088fadec404f70a392764974eb2d70~mv2.jpg/v1/crop/x_0,y_39,w_1152,h_689/fill/w_930,h_557,al_c,q_85,usm_0.66_1.00_0.01/municipalphoto.webp',
          question: 'Do you know where?',
          detail: ''
        }, {
          image: 'https://www.reviewpro.com/wp-content/uploads/2018/12/business-business-people-calendar-1187439.jpg',
          question: 'Do you know when?',
          detail: ''
        }]
      }
    },
    color: {
      type: String,
      default: 'Villager'
    },
    story: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      requestingGift: false,
      chiming: false,
      dialog: true,
      attentionDialog: false,
      skillsDialog: false,
      pollSkipped: false,
      pollComplete: false,
      allowInfoRequests: true,
      allowLocationRequests: true,
      connectionProgressValue: 10,
      connectionProgressColor: 'Villager',
      validationMessage: 'SWIPE TO CONFIRM',
      confirming: false,
      confirmed: false,
      activeQuestionIndex: 0,
      pollQuestion: {},

      publishableKey: process.env.VUE_APP_STRIPE_PK,
      giftLoading: false,
      lineItems: [
        {
          price: process.env.VUE_APP_STRIPE_PRICE_ID, // The id of the one-time price you created in your Stripe dashboard
          quantity: 1
        }
      ],
      successURL: window.location.href,
      cancelURL: window.location.href
    }
  },
  methods: {
    requestGrant: function () {
      this.playRequestChime()
      this.requestingGift = true
      setTimeout(() => {
        this.requestingGift = false
      }, 2000)
    },
    giveGift (index) {
      // Redirected to Stripe's secure checkout page
      this.$refs['checkoutRef'].redirectToCheckout()
    },
    playChime: function () {
      return
      var audio = new Audio('greeting.mp3')
      this.chiming = true
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      setTimeout(() => {
        this.chiming = false
      }, 1000)
    },
    skip: function () {
      if (this.pollComplete) return
      this.confirming = true
      this.connectionProgressColor = 'Grey'
      this.validationMessage = ''
      this.pollSkipped = true
      setTimeout(() => {
        this.changeQuestionData()
        this.confirming = false
        this.pollSkipped = false
        this.connectionProgressColor = 'Villager'
        this.validationMessage = 'SWIPE TO CONFIRM'
      }, 300)
    },
    pollStop: function () {
      this.pollComplete = true
    },
    nextPollQuestion: function () {
      if (this.pollComplete) return
      this.confirming = true
      this.pollSkipped = false
      this.connectionProgressColor = 'Villager'
      this.validationMessage = ''
      this.pollComplete = false
      setTimeout(() => {
        if (!this.changeQuestionData()) return
        this.confirming = false
        this.connectionProgressColor = 'Villager'
        this.validationMessage = 'SWIPE TO CONFIRM'
      }, 800)
    },
    changeQuestionData: function () {
      this.playAcceptChime()
      this.activeQuestionIndex++
      let nextQuestion = Object.assign({}, this.questions[this.activeQuestionIndex])
      let total = this.questions.length
      let complete = this.activeQuestionIndex
      this.connectionProgressValue = (complete / total) * 100

      if ((this.questions.length + 1) === this.activeQuestionIndex) return
      if (Object.keys(nextQuestion).length === 0) return this.finishPoll()

      this.pollQuestion = nextQuestion
      return true
    },
    finishPoll: function () {
      this.pollComplete = true
      return false
    },
    playAcceptChime: function () {
      var audio = new Audio('accept.mp3')
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    },
    playRequestChime: function () {
      var audio = new Audio('request.mp3')
      audio.volume = 0.5
      audio.oncanplaythrough = function () {
        audio.play()
      }

      // setTimeout(() => {
      //   this.chiming = false
      // }, 1000)
    }
  }
}
</script>
<style>
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
