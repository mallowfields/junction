<template>
  <v-card class="ma-1" flat outlined tile max-width="300px">
    <v-card-text>
      Welcome,  use the menu.
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="caption Villager--text">
      2202.0.1 Social Justice Shell
    </v-card-text>
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
          2022.0.1 Social Justice Shell
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
    setUserRole: function () {
      const viewMode = this.$store.state.viewMode
      this.userRole = viewMode
    },
    setUserName: function () {
      const userName = this.$store.state.userName
      this.userName = userName
    },
    playChime: function () {
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
      }, 1500)
    },
    rotateImage: function () {
      this.coverImage = this.coverImages[Math.floor(Math.random() * this.coverImages.length)]
      setInterval(() => {
        this.coverImage = this.coverImages[Math.floor(Math.random() * this.coverImages.length)]
      }, 2300)
    }
  },
  data: () => ({
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
