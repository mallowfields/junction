<template>
  <v-card class="pa-2" flat outlined tile>
    <v-list class="d-flex flex-column justify-start">
      <v-list-item-subtitle
        class="text-center grey--text caption">
        junction
      </v-list-item-subtitle>
      <v-list-item-group
        >
        <v-list-item
          v-for="(item, i) in primaryLinks"
          :key="item.title"
          @click="setActivePage(item, i)">
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="item.description">
              {{item.title}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="item.description">
              {{item.description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="adminLinks.length > 0 ">
        </v-divider>
        <v-list-item-subtitle
          v-if="adminLinks.length > 0 "
          class="text-center grey--text caption"
          >
          administration
        </v-list-item-subtitle>
        <v-list-item
          v-for="(item, i) in adminLinks"
          :key="item.title"
          :disabled="item.disabled"
          @click="setActivePage(item, i+3)">
          <v-list-item-icon>
            <v-icon
              :disabled="item.disabled"
              :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="item.description">
              {{item.title}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="item.description">
              {{item.description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in resourceLinks"
          :key="item.title"
          @click="setActivePage(item, i+5)">
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="secondary--text">{{
              item.title
            }}</v-list-item-title>
            <v-list-item-title v-if="item.description">
              {{item.title}}
            </v-list-item-title>
            <v-list-item-subtitle v-if="item.description">
              {{item.description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    setActivePage: function (item, i) {
      if (this.$route.path !== item.href) {
        this.$store.commit('activePage', i)
        this.$router.push(item.href)
        this.playChime()
      }
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
