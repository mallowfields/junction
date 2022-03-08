<template>
  <v-card tile>
    <v-toolbar absolute width="100%" dense color="Villager darken-3">
      <v-spacer>

      </v-spacer>
      <div class="caption small Villager--text">menu</div>
    </v-toolbar>
    <v-list-item-subtitle
      class="pt-5 text-center grey--text caption">
      options
    </v-list-item-subtitle>
    <v-list class="d-flex flex-column justify-start">
      <v-list-item-group
        v-model="activeItem"
        mandatory
        >
        <v-list-item
          :color="item.color"
          v-for="(item, i) in primaryLinks"
          :key="item.title"
          :disabled="item.disabled"
          @click="setActivePage(item, i)">
          <v-list-item-icon>
            <v-icon x-large :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="item.color + '--text'">
            <h4>
              {{item.title}}
            </h4>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-toolbar fixed dense color="Data darken-1">
          <v-spacer></v-spacer>
          <div class="caption small white--text">administration</div>
        </v-toolbar>

        <v-list-item
          v-for="(item, i) in adminLinks"
          :key="item.title"
          :disabled="item.disabled"
          v-show="!item.disabled"
          color="Data"
          @click="setActivePage(item, i+3)">
          <v-list-item-icon>
            <v-icon
              x-large
              :disabled="item.disabled"
              :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title :class="(item.disabled ? 'grey' : item.color) + '--text'">
            <h4>
              {{
                item.title
              }}
            </h4>
            </v-list-item-title>
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
            <v-list-item-title :class="item.color + '--text'">{{
              item.title
            }}</v-list-item-title>
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
  components: { },
  mounted: function () {
    this.getActivePage()
    this.setActiveItem()
    this.addKeyBoardListeners()
  },
  methods: {
    addKeyBoardListeners: function () {
      window.addEventListener('keydown', (event) => {
        const ctrlPressed = event.ctrlKey
        const gPressed = event.code === 'KeyG'
        const mPressed = event.code === 'KeyM'
        const onePressed = event.code === 'Digit1'
        const twoPressed = event.code === 'Digit2'
        const threePressed = event.code === 'Digit3'
        const fourPressed = event.code === 'Digit4'
        const fivePressed = event.code === 'Digit5'
        const sixPressed = event.code === 'Digit6'
        if (ctrlPressed && gPressed) {
          event.preventDefault()
          this.graphDialog = !this.graphDialog
        }
        if (ctrlPressed && mPressed) {
          event.preventDefault()
          this.mapDialog = !this.mapDialog
        }
        if (ctrlPressed && onePressed) {
          event.preventDefault()
          this.activeItem = 0
          this.setActivePage({
            href: '/profiles'
          }, this.activeItem)
        }
        if (ctrlPressed && twoPressed) {
          event.preventDefault()
          this.activeItem = 1
          this.setActivePage({
            href: '/neighbors'
          }, this.activeItem)
        }
        if (ctrlPressed && threePressed) {
          event.preventDefault()
          this.activeItem = 2
          this.setActivePage({
            href: '/gigs'
          }, this.activeItem)
        }
        if (ctrlPressed && fourPressed) {
          event.preventDefault()
          this.activeItem = 3
          this.setActivePage({
            href: '/models'
          }, this.activeItem)
        }
        if (ctrlPressed && fivePressed) {
          event.preventDefault()
          this.activeItem = 4
          this.setActivePage({
            href: '/process-center'
          }, this.activeItem)
        }
        if (ctrlPressed && sixPressed) {
          event.preventDefault()
          this.activeItem = 5
          this.setActivePage({
            href: '/command-center'
          }, this.activeItem)
        }
      })

      //     setActivePage: function (item, i) {
      // if (this.$route.path !== item.href) {
      //   this.$store.commit('activePage', i)
      //   this.$router.push(item.href)
      // }
    // }
    },
    getActivePage: function () {
      this.activePage = this.$store.state.activePage
    },
    setActiveItem: function () {
      this.activeItem = Number(this.activePage)
    },
    setActivePage: function (item, i) {
      if (this.$route.path !== item.href) {
        this.$store.commit('activePage', i)
        this.$router.push(item.href)
      }
    }
  },
  data: () => ({
    activePage: null,
    graphDialog: false,
    mapDialog: false,
    activeItem: null
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
