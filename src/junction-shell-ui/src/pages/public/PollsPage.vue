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
            <v-list-item-title>Polls</v-list-item-title>
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
      <app-poll :questions="questions"></app-poll>
    </v-card>
  </v-dialog>
</template>
<script>
import AppPoll from '@/components/AppPoll.vue'
export default {
  components: { AppPoll },
  methods: {
    goHome: function () {
      this.$router.push('/')
    }
  },
  data () {
    return {
      dialog: true,
      questions: [
        {
          image: 'https://th.bing.com/th/id/OIP.5Kg9Z3D3Xg3jT9gFTNn0SQHaFi?pid=ImgDet&rs=1',
          question: 'Are you a volunteer?',
          detail: ''
        }, {
          image: 'https://static.wixstatic.com/media/e73c83_c9088fadec404f70a392764974eb2d70~mv2.jpg/v1/crop/x_0,y_39,w_1152,h_689/fill/w_930,h_557,al_c,q_85,usm_0.66_1.00_0.01/municipalphoto.webp',
          question: 'Are you in your neighborhood?',
          detail: ''
        }, {
          image: 'https://normalwasneverenough.org/wp-content/uploads/2021/08/Mask-Group-24.png',
          question: 'Do you have children?',
          detail: 'This includes being a guardian of children'
        }
      ]
    }
  }
}

</script>
