<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card tile flat>
      <v-toolbar
        dark
        tiled
      >
        <v-btn
          icon
          @click="goBack"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{enterContext}}</v-list-item-title>
            <v-list-item-subtitle>Process Center</v-list-item-subtitle>
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
              :loading="loading"
              small
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense two-items>
            <v-list-item
              @click="goToCommand">
              <v-list-item-action>
                <v-icon color="Data" left>
                  mdi-crosshairs
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Set context
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Set your processing area
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="Data" left>
                  mdi-bell-ring
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Send Notification
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  An Alert or a Reminder
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-3"></v-divider>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="Data" left>
                  mdi-lead-pencil
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Private Note
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Visible only to who you choose
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-3"></v-divider>
            <v-list-item
              @click="goToCommand">
              <v-list-item-action>
                <v-icon color="Data" class="sync-spin" left>
                  mdi-sync
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Synchronize View
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Synchronize your view
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-progress-linear
        color="Data"
        buffer-value="0"
        value="35"
        height="10"
        striped
        stream
        reverse
      ></v-progress-linear>
      <v-dialog
        fullscreen
        transition="slide-x-transition"
        v-model="profileDialog">
        <v-card flat tile>
          <v-card-title>
            <v-btn icon
              @click="profileDialog = false">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-icon :color="connectionProgressColor" left>
              mdi-human
            </v-icon>
            <div>{{activeProfile.title}}</div>
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
                  :loading="loading"
                  small
                  icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense two-items>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Data" left>
                      mdi-bell-ring
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Send Notification
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      An Alert or a Reminder
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mb-3"></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Data" left>
                      mdi-lead-pencil
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Private Note
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Visible only to who you choose
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon color="Data" left>
                      mdi-pause
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Pause
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Temporarily freeze connectivity
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  @click="goToCommand">
                  <v-list-item-action>
                    <v-icon color="Data" class="sync-spin" left>
                      mdi-sync
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Synchronize View
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption">
                      Synchronize your view
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-progress-linear
            :color="connectionProgressColor"
            buffer-value="0"
            :value="connectionProgressValue"
            height="10"
            striped
            stream
          ></v-progress-linear>
          <v-card-actions>
            <v-btn
              small
              text
              color="Data"
              @click="goToCommand">
              <v-icon left>mdi-shield-check</v-icon>
              command center
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              small
              text
              color="Data">
              <v-icon left>mdi-phone</v-icon>
              call
            </v-btn>
          </v-card-actions>
          <v-list dense>
            <v-list-item
              two-line
              @click="connectProfile"
              v-touch="{
                right: () => connectProfile()
              }"
              :class="connectionProgressColor"
              >
              <v-list-item-content>
                <v-list-item-title class="d-flex caption align-center justify-content justify-center white--text">
                  <v-icon right class="mr-5" size="50" color="white">{{ !validated ? "mdi-power-plug mdi-rotate-90" : "mdi-content-cut" }}</v-icon>
                  {{validationMessage}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-switch disabled v-model="profileDialog" color="Data"></v-switch>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="Data--text">
                  <v-icon class="mb-1" small color="Data">mdi-lock-open</v-icon>
                  Privacy Warning
                </v-list-item-title>
                <v-list-item-subtitle class="Data--text">Sensitive information might be visible!</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card>
      </v-dialog>
      <v-card
        flat
        tile
        class="mx-auto"
      >
        <v-list two-line>
          <v-list-item-group
            v-model="selected"
            active-class="Data--text"
            multiple
          >
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.title"
                @click="viewProfile(item)"
                v-touch="{
                  right: () => viewProfile(item)
                }">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left>
                        {{purposeIcon}}
                      </v-icon>
                      {{item.title}}
                    </v-list-item-title>

                    <v-list-item-subtitle
                      class="Data--primary"
                    >
                      {{item.headline}}
                    </v-list-item-subtitle>

                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                    <div v-if="enterContext ==='Intake'">
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-charity
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-charity
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-currency-usd
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-currency-usd
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-alert
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-alert
                      </v-icon>
                    </div>

                    <div v-if="enterContext ==='Outcomes'">
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-av-timer
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-home-heart
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-av-timer
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-currency-usd
                      </v-icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        mdi-checkbox-blank-circle
                      </v-icon>

                      <v-icon
                        v-else
                        color="Data darken-3"
                      >
                        mdi-emoticon
                      </v-icon>
                    </div>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-speed-dial
          v-show="showFab"
          id="networkFab"
          top
          left
          direction="top"
          transition="slide-y-reverse-transition"
          class="my-5"
          :style="$vuetify.breakpoint.smAndUp ? '' : ''"
          v-model="fab"
        >
          <template v-slot:activator>
            <v-tooltip
              top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  :loading="loading"
                  fab
                  color="white"
                  x-large
                >
                  <v-icon color="Data" v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon size="50" color="Data" v-else>
                    {{purposeIcon}}
                  </v-icon>
                </v-btn>
              </template>
              Process
            </v-tooltip>
          </template>
          <v-tooltip
            left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                fab
                dark
                large
                color="Data"
                @click="setPurpose('mdi-charity', 'Outcomes')"
              >
              <v-icon size="40" color="white">mdi-charity</v-icon>
            </v-btn>
          </template>
          Outcomes
        </v-tooltip>
        <v-tooltip
          left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              large
              color="Data"
              @click="setPurpose('mdi-human', 'Intake')"
            >
              <v-icon size="40" color="white">mdi-human</v-icon>
            </v-btn>
          </template>
          Human
        </v-tooltip>
      </v-speed-dial>
    </v-card>
  </v-dialog>
</template>

<script>
import { latLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Network } from 'vis-network/peer/esm/vis-network'
import { DataSet } from 'vis-data/peer/esm/vis-data'
import apiClient from '@/mixin/api-client'
import entityTypes from '@/mixin/entity-types'
import moment from 'moment'
export default {
  mixins: [apiClient, entityTypes],
  components: { },
  mounted: function () {
    this.organizationName = this.$store.state.organizationName
    this.redrawMap()
  },
  methods: {
    viewProfile: function (item, event) {
      this.activeProfile = item
      this.profileDialog = true
    },
    connectProfile: function () {
      if (this.validated) return this.disconnectProfile()

      this.connectionProgressValue = 60
      this.connectionProgressColor = 'Villager'
      this.validationMessage = 'CONNECTING...'

      setTimeout(() => {
        this.connectionProgressColor = 'Data'
        this.connectionProgressValue = 100
        this.validationMessage = 'CONNECTED!'
      }, 3000)

      setTimeout(() => {
        this.connectionProgressColor = 'Data'
        this.connectionProgressValue = 100
        this.validationMessage = 'SWIPE RIGHT TO DISCONNECT'
        this.validated = true
      }, 6000)
    },
    disconnectProfile: function () {
      this.validated = false
      this.connectionProgressColor = 'grey'
      this.connectionProgressValue = 30
      this.validationMessage = 'SWIPE RIGHT TO CONNECT'
    },
    goBack: function () {
      this.$router.push('/')
    },
    goToCommand: function () {
      this.$router.push('/command-center')
    },
    goToProcessCenter: function () {
      this.$router.push('/process-center')
    },
    setPurpose: function (icon, enterContext) {
      this.purposeIcon = icon
      this.enterContext = enterContext
    },
    redrawMap: async function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.$refs.map) {
            const map = this.$refs.map.mapObject
            map.invalidateSize(true)
            this.addMapListeners(map)
          }
        }, 100)
      })
    },
    addMapListeners: function (map) {
      map.on('contextmenu', (event) => {
        this.networkOptionsDialog = true
      })
      map.on('moveend', (event) => {
        this.mapCenter = map.getCenter()
        this.circleMarker.center = this.mapCenter
        this.snackbar = true
      })
    },
    actorIsReady: function () {
      this.hereDialog = true
      console.log('show dialog..')
    },
    formatTime: function (value) {
      return moment(new Date(this.currentTime || value)).format('LTS')
    },
    close: function () {
      // this.reset()
      this.$emit('close')
    },
    reset: function () {
      this.nodes = new DataSet([])
      this.edges = new DataSet([])
      this.network = null
    },
    reloadGraph () {
      this.redrawMap()
      this.reset()
      // this.loadData()
    },
    createContainer: function () {
      const container = this.$refs['network']
      const data = {
        nodes: this.nodes,
        edges: this.edges
      }
      var options = {
        groups: {
          'Entity': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 18, shape: 'circularImage', image: '/shape-plus.svg' },
          'Actor': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 16, shape: 'circularImage', image: '/account-circle.svg' },
          'Workflow': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 18, shape: 'circularImage', image: '/check-all.svg' },
          'Task': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 10, shape: 'circularImage', image: '/check.svg' },
          'Site': { color: this.$store.state.displayTheme === 'dark' ? '#222222' : '#eee', size: 25, shape: 'circularImage', image: '/web.svg' }
        },
        nodes: {
          shape: 'dot',
          size: 12,
          shadow: {
            enabled: true,
            size: 3,
            x: 1,
            y: 2
          },
          font: {
            color: this.$store.state.displayTheme === 'dark' ? '#eee' : '#000'
          }
        },
        interaction: {
          hover: true,
          hoverConnectedEdges: true
        }
      }
      this.network = new Network(container, data, options)
      this.network.on('click', (event) => {
        if (event.nodes.length) {
          this.selectedNode = this.nodes.get(event.nodes[0])
          this.isSite = this.selectedNode.type === 'Site'
          this.isTool = this.selectedNode.type === 'Task'
          this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
          this.showNodeDetails = true
          this.snackBarColor = options.groups[this.selectedNode.type].color
          this.showFab = true
        } else {
          this.showNodeDetails = false
          this.isSite = null
          this.isTool = null
          this.showFab = false
        }
      })
      this.network.on('hoverNode', (event) => {
        // this.selectedNode = this.nodes.get(event.node)
        // this.isSite = this.selectedNode.type === 'Site'
        // this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
        // this.showNodeDetails = true
        // this.snackBarColor = options.groups[this.selectedNode.type].color
        // this.showFab = true
      })
      this.network.on('blurNode', (event) => {
        // this.showNodeDetails = false
        // this.isSite = null
        // this.isTool = null
        // this.showFab = false
      })
      this.network.on('hold', (event) => {
        this.selectedNode = {}
        if (event.nodes[0]) {
          this.selectedNode = this.nodes.get(event.nodes[0])
          this.isSite = this.selectedNode.type === 'Site'
          this.isTool = this.selectedNode.type === 'Task'

          this.labelIcon = this.isSite ? this.siteLabelicon : this.getEntityLabelIcon(this.selectedNode)
          if (!this.isSite) this.nodeModificationDialog = true
          if (this.isSite) this.siteModificationDialog = true
          return
        }
        this.networkOptionsDialog = true
        console.log(event, this.networkOptionsDialog)
      })
      this.network.on('deselectNode', (event) => {
        this.selectedNode = {}
        this.isSite = null
        this.isTool = null
      })
    },
    showSelectedNodeInfo: function () {
      if (this.selectedNode.type === 'Site') {
        this.siteDialog = true
        return
      }
      this.editDialog = true
    },
    getEntityLabelIcon: function (entity) {
      let entityType = this.entityTypes.filter((options) => {
        return options.label === entity.type
      })
      return entityType.length ? entityType[0].icon : 'mdi-alert-circle'
    },
    labelNodeBy: function (prop, arr) {
      arr.forEach((item) => {
        item.title = item[prop]
        item.label = item.type
        item.group = item.type
      })

      return arr
    },
    getNodes: async function () {
      let sites = await this.api('map').site.getAll()
      this.labelNodeBy('displayName', sites)
      sites.forEach((site) => {
        site.group = 'Site'
        site.label = site.title
      })
      this.nodes.add(sites)

      let entities = await this.api('map').entity.getAll()
      this.labelNodeBy('displayName', entities)
      entities.forEach((entity) => {
        entity.label = entity.title
      })
      this.nodes.add(entities)

      let actors = await this.api('map').actor.getAll()
      this.labelNodeBy('displayName', actors)
      entities.forEach((actor) => {
        actor.label = actor.title
      })
      this.nodes.add(actors)

      let workflows = await this.api('map').workflow.getAll()
      this.labelNodeBy('displayName', workflows)
      workflows.forEach((workflow) => {
        workflow.label = workflow.title
      })
      this.nodes.add(workflows)

      let tasks = await this.api('map').task.getAll()
      this.labelNodeBy('displayName', tasks)
      this.nodes.add(tasks)

      let edges = []
      await Promise.all(sites.map(async (item) => {
        let site = await this.api('map').site.get(item.id)
        site.entities.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
        site.actors.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
        site.workflows.forEach((id) => {
          edges.push({
            from: site.id,
            to: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                type: 'arrow'
              }
            }
          })
        })
        site.tasks.forEach((id) => {
          edges.push({
            to: site.id,
            from: id,
            color: '#4CAF50',
            arrows: {
              from: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(entities.map(async (item) => {
        let entity = await this.api('map').entity.get(item.id)
        entity.entities.forEach((eid) => {
          edges.push({
            to: entity.id,
            from: eid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.actors.forEach((aid) => {
          edges.push({
            to: entity.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.workflows.forEach((wid) => {
          edges.push({
            to: wid,
            from: entity.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        entity.tasks.forEach((tid) => {
          edges.push({
            to: tid,
            from: entity.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(actors.map(async (item) => {
        let actor = await this.api('map').actor.get(item.id)

        actor.entities.forEach((aid) => {
          edges.push({
            to: actor.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.actors.forEach((aid) => {
          edges.push({
            to: actor.id,
            from: aid,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.workflows.forEach((wid) => {
          edges.push({
            to: wid,
            from: actor.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })

        actor.tasks.forEach((tid) => {
          edges.push({
            to: tid,
            from: actor.id,
            color: '#FF5722',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(workflows.map(async (item) => {
        let workflow = await this.api('map').workflow.get(item.id)

        workflow.tasks.forEach((tid) => {
          edges.push({
            to: workflow.id,
            from: tid,
            color: '#2196F3',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      await Promise.all(tasks.map(async (item) => {
        let task = await this.api('map').task.get(item.id)

        task.tools.forEach((tid) => {
          edges.push({
            to: task.id,
            from: tid,
            color: '#2196F3',
            arrows: {
              to: {
                enabled: true,
                scaleFactor: 0.5,
                type: 'arrow'
              }
            }
          })
        })
      }))

      this.edges.add(edges)
    },
    saveEntity: async function (entity) {
      this.loading = true
      this.editDialog = false
      this.showNodeDetails = false
      this.nodeModificationDialog = false
      await this.api('map')[this.selectedNode.type.toLowerCase()].save(entity)
      this.selectedNode = {}
      this.reloadGraph()
    },
    purgeTargetEntity: async function () {
      this.loading = true
      this.editDialog = false
      this.showNodeDetails = false
      this.nodeModificationDialog = false
      await this.api('map')[this.selectedNode.type.toLowerCase()].delete(this.selectedNode)
      this.selectedNode = {}
      this.reloadGraph()
    },
    goToSite: function ({ code, publicId }) {
      let site = `/site/${code}/${publicId}`
      this.$router.push(site, () => this.$router.go(0))
      this.close()
    },
    loadData: async function () {
      this.loading = true
      await this.getNodes()
      this.createContainer()
      this.loading = false
    },
    getNodesAsList: function () {
      const nodes = this.nodes.get()
      return nodes.map((node) => {
        return node.displayName
      })
    }
  },
  data: () => ({
    profileDialog: false,
    connectionProgressValue: 10,
    connectionProgressColor: 'grey',
    validated: false,
    validationMessage: 'SWIPE RIGHT TO CONNECT',
    activeProfile: {},
    enterContext: 'Intake',
    snackbar: true,
    purposeIcon: 'mdi-human',
    zoom: 11,
    mapCenter: latLng(42.9634, -85.6681),
    circleMarker: {
      center: latLng(42.9634, -85.6681),
      radius: 150,
      color: 'white',
      fillColor: 'white'
    },
    center: latLng(42.9634, -85.6681),
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VuZGVsbGpvc2VwaCIsImEiOiJja3IxZ252YWkxYm00MnBvNzhudWpvZGhvIn0.10YRNB3jfk6CedUpgXfPBA',
    attribution: '',
    withTooltip: latLng(47.41422, -1.250482),
    mapOptions: {
      zoomSnap: 0.5
    },
    showDevMessage: false,
    showMap: true,

    fab: false,
    organizationName: null,
    firstLoad: true,
    loading: false,
    applyingFilter: false,
    showNodeDetails: false,
    snackBarColor: null,
    selectedNode: {},
    selectedEdge: {},
    network: null,
    nodes: new DataSet([]),
    edges: new DataSet([]),
    hereDialog: false,
    networkOptionsDialog: false,
    showFab: true,
    currentTime: new Date(),

    siteModificationDialog: false,
    nodeModificationDialog: false,
    editDialog: false,
    automationDialog: false,
    siteDialog: false,
    toolDialog: false,
    isTool: false,
    isSite: false,
    labelIcon: 'mdi-help',
    siteLabelicon: 'mdi-web',
    dialog: true,

    selected: [3, 4, 5, 6, 7, 8],
    items: [
      {
        action: 'a few seconds ago',
        headline: 'Waiting...',
        title: 'Latasha Omari'
      }, {
        action: '4 minutes ago',
        headline: 'Waiting...',
        title: 'Aja Nova'
      },
      {
        action: '28 minutes ago',
        headline: 'Waiting...',
        title: 'Suzie McClure'
      },
      {
        action: '1 hour',
        headline: 'Connected',
        title: 'Yola Adams'
      },
      {
        action: '1 hour ago',
        headline: 'Connected',
        title: 'Jaeleen Hansen'
      },
      {
        action: '2 hours ago',
        headline: 'Connected',
        title: 'Todd Holt'
      },
      {
        action: '2 hours ago',
        headline: 'Connected',
        title: 'Lawrence Mirran'
      },
      {
        action: '2 hours ago',
        headline: 'Connected',
        title: 'Martin Cho'
      },
      {
        action: '2 hours ago',
        headline: 'Connected',
        title: 'Ingrid Smith'
      }
    ]
  })
}
</script>

<style>
#networkFab {
  position: fixed;
  z-index: 99999;
  top: calc(100vh - 120px);
  left: calc(100vw - 120px);
}

.sync-spin {
    -webkit-animation:spin 3s linear infinite;
    -moz-animation:spin 3s linear infinite;
    animation:spin 3s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
