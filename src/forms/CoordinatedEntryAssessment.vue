<template>
  <v-card class="ma-3" width="800" flat tile>

    
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          rounded
          x-small
          color="grey"
          v-bind="attrs"
          v-on="on"
        >
          other issues
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="">
          System Logic & Other System Issues
        </v-card-title>

        <v-card-text>
          Field 2 – It is recommended that a system administrator managed list is used for this 
field. If such functionality doesn’t exist in the HMIS, a text box must be provided.
        </v-card-text>
        <v-card-text>
Fields 5 & 6 and Dependents A and B are representative of whatever assessment a 
community uses. There is no specified structure or format for an assessment, and an 
HMIS might have more than one type of assessment (crisis needs or housing needs or 
multiples of each). The system must be able to treat a single assessment recorded for 
a client as one unit of data including the fields listed here as well as the community defined fields. 
        </v-card-text>
        <v-card-text>
          Field 5 and Dependent A are a list of key-value (question and response) pairs for every 
question in the assessment, e.g. “Where did you sleep last night” / “On the streets”.
Similarly, Field 6 and Dependent B are a list of key-value (result type and result) pairs 
used to contain any number of possible results, scores, or calculations on the 
assessment. For example, one assessment might have three results: “Housing stability 
score” / “10”; “Total score” / “81”; “Recommended placement” / “RRH”.
        </v-card-text>
        <v-card-text>
Fields 1-4 and field 7 will be required for reporting purposes. Fields 5 & 6 are included 
as placeholders for communities who currently do, or want to in the future, collect CE 
Assessment questions, answers, and results in HMIS. These fields also serve as a 
common frame of reference when transferring data via HMIS CSV or XML.

Data must be able to be added in multiple stages to complete a client record for a 
single assessment.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="Villager"
            text
            outlined
            @click="dialog = false"
          >
              close
            <v-icon small class="ml-2">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list>
      <v-list-item two-line>
        <v-list-item-icon>
          <v-icon size="40" class="mt-4 ml-2" color="Villager">
            mdi-home-heart
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Element Name</v-list-item-title>
          <v-list-item-subtitle class="Villager--text">Coordinated Entry Assessment</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Field 1 & Response</v-list-item-title>
          <v-list-item-subtitle>Date of assessment [date]</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Field 2 & Response</v-list-item-title>
          <v-list-item-subtitle>Assessment location [drop down]</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Field 3 & Responses</v-list-item-title>
          <v-list-item-subtitle>Assessment Type</v-list-item-subtitle>
          <v-list-item-subtitle>1:Phone, 2:Virtual, 3:In person</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Field 4 & Responses</v-list-item-title>
          <v-list-item-subtitle>Assessment Level</v-list-item-subtitle>
          <v-list-item-subtitle>1:Crisis Needs Assessment, 2:Housing Needs Assessment</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Field 5 & Responses</v-list-item-title>
          <v-list-item-subtitle>Assessment questions -- Local determination -- responses to questions defined by community</v-list-item-subtitle>
          <v-list-item-subtitle>1..n</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Field 6 & Responses</v-list-item-title>
          <v-list-item-subtitle>Assessment Result Type -- Local determination -- responses to questions defined by community</v-list-item-subtitle>
          <v-list-item-subtitle>1..n</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Field 7 & Responses</v-list-item-title>
          <v-list-item-subtitle>Prioritization Status</v-list-item-subtitle>
          <v-list-item-subtitle>1:Placed on prioritization list, 2:Not placed on prioritization list</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Element Type</v-list-item-title>
          <v-list-item-subtitle>Program Specific</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Funder: Program-Component</v-list-item-title>
          <v-list-item-subtitle>HUD: CoC -- Collection required for all components providing Coordinated Entry</v-list-item-subtitle>
          <v-list-item-subtitle>HUD: ESG -- Collection required for all components providing Coordinated Entry</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Project Type Applicability</v-list-item-title>
          <v-list-item-subtitle>14: Coordinated Entry (or other depending on CoC design of Coordinated Entry system)</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Data Collected About</v-list-item-title>
          <v-list-item-subtitle>Head of Household</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Collection Point</v-list-item-title>
          <v-list-item-subtitle>At occurrence</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Relationship to Enrollment ID (an enrollment)</v-list-item-title>
          <v-list-item-subtitle>One or more Coordinated Entry Assessment per enrollment</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Relationship to Personal ID (a client)</v-list-item-title>
          <v-list-item-subtitle>One or more Coordinated Entry Assessment per client</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
      dialog: false,
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
    requestGift: function () {
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
