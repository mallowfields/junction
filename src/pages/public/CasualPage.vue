<template>
  <v-card class="ma-0" flat outlined tile>
    <v-row>
      <v-col>
      <v-dialog
        v-model="urlDialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar flat>
            <v-btn
              icon
              small
              class=""
              v-bind="attrs"
              v-on="on"
            >
            <v-icon small>
              mdi-link
            </v-icon>
          </v-btn>
          <v-card-subtitle>
            {{ iframeSrc }}
          </v-card-subtitle>
          </v-toolbar>
        </template>

        <v-card>
          <v-text-field
            v-model="updatedSrc"
            :value="iframeSrc"
            placeholder="http://example.com"
            solo
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="updateUrl"
            >
              load
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-col>
    </v-row>
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
    updateUrl: function () {
      this.urlDialog = false
      this.iframeSrc = this.updatedSrc
      console.log(this.updatedSrc, this.iframeSrc)
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
    updatedSrc: '',
    urlDialog: false,
    iframeSrc: 'https://casualos.com/',
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
