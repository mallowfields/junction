<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <v-card flat tile>
      <v-toolbar
        dark
        tile>
        <v-btn
          icon
          @click="goHome">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Profiles</v-list-item-title>
            <v-list-item-subtitle>My skills and preferences</v-list-item-subtitle>
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
      <v-dialog
        v-model="skillsDialog">
        <v-card
          tile
          fluid
          flat>
          <v-toolbar flat>
            <v-icon color="Villager">mdi-human</v-icon>
            <v-card-title class="Villager--text caption">
              </v-card-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="skillsDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list dense one-line>
            <v-list-item
              v-for="(item, i) in profileQuestions"
              :key="item.question">
              <v-list-item-action class="mr-2">
                <v-checkbox color="Villager"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content class="caption">
                {{ `${i + 1} - ${item.question}` }}
                <!-- <v-list-item-subtitle></v-list-item-title> -->
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
      <v-card flat tile fluid class="d-flex flex-column align-center">
        <v-card
          tile
          flat
          v-show="profileComplete">
          <v-card-title class="d-flex justify-center align-center">
            <v-icon class="ma-3 scale-big-small red--text" size="40">
              mdi-heart
            </v-icon>
            <h3 class="ma-2">Thank you!</h3>
          </v-card-title>

        </v-card>
        <v-card
          tile
          outlined
          elevation="5"
          width="400px"
          class="ma-2 card-texture"
          v-show="!profileComplete"
          :loading="true"
          v-touch="{
            right: () => nextProfileQuestion(),
            left: () => playChime()
          }"
        >
          <template slot="progress">
            <v-progress-linear
              :color="profileSkipped ? 'grey lighten-1' : 'Villager'"
              height="30"
              value="100"
              class="Villager--text"
              stream
              striped
              v-show="$vuetify.breakpoint.smAndUp ? false : true"
              :indeterminate="!confirming"
            >
            <v-icon small color="Villager" v-show="!confirming" left>
              {{!chiming ? "mdi-human-greeting" : "mdi-volume-high"}}
            </v-icon>
            <v-icon x-large v-show="confirming && !profileSkipped" color="white">mdi-check</v-icon>
            {{validationMessage}}
          </v-progress-linear>
          </template>
          <v-img
            tile
            height="150"
            :src="profileQuestion.image"
          ></v-img>
          <h3 class="pa-5">{{profileQuestion.question}}</h3>

          <v-card-text>
            <div>{{profileQuestion.detail}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="Villager"
              text
              x-large
              outlined
              :disabled="profileSkipped"
              @click="skip"
            >
              <v-icon left>
                mdi-cancel
              </v-icon>
              SKIP
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="Villager"
              x-large
              v-show="$vuetify.breakpoint.smAndUp ? true : false"
              @click="nextProfileQuestion()"
            >
              <v-icon left>
                mdi-check
              </v-icon>
              yes
            </v-btn>

          </v-card-actions>
          <v-progress-linear
            :color="connectionProgressColor"
            buffer-value="0"
            :value="connectionProgressValue"
            height="10"
            striped
            stream
          ></v-progress-linear>
          <v-card-subtitle class="caption Villager">
          average time to complete: 1 minute
          </v-card-subtitle>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      chiming: false,
      dialog: true,
      attentionDialog: false,
      skillsDialog: false,
      profileSkipped: false,
      profileComplete: false,
      allowInfoRequests: true,
      allowLocationRequests: true,
      connectionProgressValue: 10,
      connectionProgressColor: 'Villager',
      validationMessage: 'SWIPE TO CONFIRM',
      confirming: false,
      confirmed: false,
      activeQuestionIndex: 0,
      profileQuestion: {
        image: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-closeup-man-hands-texting-mobile-phone-outdoors-unknown-guy-touching-smartphone-screen-on-city-street-unrecognizable-person-hands-using-cellphone-outside_sf9ypadkw_thumbnail-1080_01.png',
        question: 'Are you a person with a smartphone?',
        detail: 'The smartphone requires a data-plan through a provider or a WIFI connection'
      },
      profileQuestions: [
        {
          image: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-closeup-man-hands-texting-mobile-phone-outdoors-unknown-guy-touching-smartphone-screen-on-city-street-unrecognizable-person-hands-using-cellphone-outside_sf9ypadkw_thumbnail-1080_01.png',
          question: 'Are you a person with a smartphone?',
          detail: 'This includes any persons who identify as person'
        }, {
          image: 'https://th.bing.com/th/id/OIP.5Kg9Z3D3Xg3jT9gFTNn0SQHaFi?pid=ImgDet&rs=1',
          question: 'Do you want to do something?',
          detail: 'This includes maybe doing things that you but you know about'
        }, {
          image: 'https://static.wixstatic.com/media/e73c83_c9088fadec404f70a392764974eb2d70~mv2.jpg/v1/crop/x_0,y_39,w_1152,h_689/fill/w_930,h_557,al_c,q_85,usm_0.66_1.00_0.01/municipalphoto.webp',
          question: 'Do you know where the thing is happening?',
          detail: 'Can you locate points of interest on a map?'
        }, {
          image: 'https://www.reviewpro.com/wp-content/uploads/2018/12/business-business-people-calendar-1187439.jpg',
          question: 'Do you know when the thing is happening?',
          detail: 'Can you set dates on a calendar? Dates can be past, present, or in the future.'
        }
      ]
    }
  },
  methods: {
    playChime: function () {
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
      if (this.profileComplete) return
      this.confirming = true
      this.connectionProgressColor = 'Grey'
      this.validationMessage = ''
      this.profileSkipped = true
      setTimeout(() => {
        this.changeQuestionData()
        this.confirming = false
        this.profileSkipped = false
        this.connectionProgressColor = 'Villager'
        this.validationMessage = 'SWIPE TO CONFIRM'
      }, 300)
    },
    nextProfileQuestion: function () {
      if (this.profileComplete) return
      this.confirming = true
      this.profileSkipped = false
      this.connectionProgressColor = 'Villager'
      this.validationMessage = ''
      this.profileComplete = false

      setTimeout(() => {
        if (!this.changeQuestionData()) return
        this.confirming = false
        this.connectionProgressColor = 'Villager'
        this.validationMessage = 'SWIPE TO CONFIRM'
      }, 800)
    },
    changeQuestionData: function () {
      this.activeQuestionIndex++
      let nextQuestion = Object.assign({}, this.profileQuestions[this.activeQuestionIndex])
      let total = this.profileQuestions.length
      let complete = this.activeQuestionIndex
      this.connectionProgressValue = (complete / total) * 100

      if ((this.profileQuestions.length + 1) === this.activeQuestionIndex) return
      if (Object.keys(nextQuestion).length === 0) return this.finishProfile()

      this.profileQuestion = nextQuestion
      return true
    },
    finishProfile: function () {
      this.profileComplete = true
      return false
    },
    goToHomeMap: function () {
      this.$router.push('/neighbors')
    },
    goHome: function () {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.card-texture {
  background: url('/card-texture.png');
}
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
