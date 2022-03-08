<template>
  <v-card class="ma-1" flat outlined tile max-width="300px">
    <v-card-text>
      Welcome {{this.userName}},  use the menu.
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="caption Villager--text">
      <v-icon left>
        mdi-all-inclusive
      </v-icon>
      You are viewing as {{this.viewMode}}
    </v-card-text>
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
    }
  },
  data: () => ({
    chiming: false,
    isAdmin: false,
    userName: null,
    userRole: null
  })
}
</script>
