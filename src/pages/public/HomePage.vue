<template>
  <v-card class="ma-1" flat outlined tile max-width="300px">
    <v-card-text>
      scan to connect to another device
    </v-card-text>
    <v-img src="/qr-heroku.png"></v-img>
    <v-card-actions>
      <v-row>
        <v-col v-show="$vuetify.breakpoint.smAndUp">
        </v-col>
        <v-col>
          <v-col>
            <v-row class="caption mb-2">
              sponsored by
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-img
                width="220px"
                src="sponsors.png">
              </v-img>
            </v-row>
          </v-col>
        </v-col>
        <v-col v-show="$vuetify.breakpoint.smAndUp">

        </v-col>
      </v-row>
    </v-card-actions>
    <v-divider></v-divider>
    <v-dialog
      v-model="coverDialog"
      width="500"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="Villager"
          icon
          x-small
          class="ma-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="Villager">
            mdi-help-circle-outline
          </v-icon>
        </v-btn>
      </template>

      <v-card tile>
        <v-card-title>
          <v-icon left x-large color="Villager">
            mdi-all-inclusive
          </v-icon>
          Junction
        </v-card-title>

        <v-card-text>
          2022.0.1
        <v-btn
          outlined
          small
          text
          @click="installApp">
            install
        </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-img
          width="300px"
          :src="coverImage">

        </v-img>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            @click="window.open('https://github.com/mallowfields/junction', '_blank')"
            x-large
            icon>
            <v-img
              width="30"
              height="40"
              src="github.png"
            ></v-img>
          </v-btn>
          <v-card-text class="caption">
            mallowfields/junction
          </v-card-text>
          <v-spacer></v-spacer>
          <v-btn
            color="Villager"
            text
            outlined
            x-large
            :loading="pageLoading"
            @click="coverDialog = false"
          >
            <v-icon left medium>
              mdi-star-circle-outline
            </v-icon>
            start
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import linkTypes from '@/mixin/link-types'
export default {
  mixins: [linkTypes],
  mounted: async function () {
    this.setUserRole()
    this.setUserName()
    this.playChime()
    this.fancyLoading()
    this.rotateImage()
    this.isAdmin = this.$store.state.viewMode === 'Admin'
  },
  methods: {
    installApp: function () {
      this.installPromptEvent.prompt()
      this.installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
      })
    },
    setUserRole: function () {
      const viewMode = this.$store.state.viewMode
      this.userRole = viewMode
    },
    setUserName: function () {
      const userName = this.$store.state.userName
      this.userName = userName
    },
    playChime: function () {
      return
      this.chiming = true
      var audio = new Audio('greeting.mp3')
      audio.volume = 0.25
      audio.oncanplaythrough = function () {
        audio.play()
      }
      setTimeout(() => {
        this.chiming = false
      }, 3000)
    },
    fancyLoading: function () {
      this.coverDialog = true
      setTimeout(() => {
        this.pageLoading = false
      }, 500)
    },
    rotateImage: function () {
      this.coverImage = this.coverImages[Math.floor(Math.random() * this.coverImages.length)]
      setInterval(() => {
        this.coverImage = this.coverImages[Math.floor(Math.random() * this.coverImages.length)]
      }, 2300)
    }
  },
  data: () => ({
    installPromptEvent: window.installPromptEvent,
    coverDialog: false,
    pageLoading: true,
    chiming: false,
    isAdmin: false,
    userName: null,
    userRole: null,
    coverImage: 'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-24.png',
    coverImages: [
      'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-24.png',
      'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-46@2x.png',
      'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-41@2x.png',
      'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-40@2x.png',
      'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-48@2x.png'
    ]
  })
}
</script>
