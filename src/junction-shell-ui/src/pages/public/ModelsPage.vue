<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        tile
      >
        <v-btn
          icon
          @click="goBack"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Junction</v-list-item-title>
            <v-list-item-subtitle>Models</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-tooltip
          bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :loading="loading"
              small
              icon
              @click="reloadGraph()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          Reload Graph
        </v-tooltip>
      </v-toolbar>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="Data"
      ></v-progress-linear>
      <div
        id="network"
        oncontextmenu="return false"
        ref="network"
        style="height: calc(100vh - 65px);">
      </div>
      <v-progress-linear
        v-if="fab"
        color="amber"
        indeterminate
      ></v-progress-linear>
      <v-divider></v-divider>
      <v-speed-dial
          v-show="showFab"
          id="networkFab"
          top
          left
          direction="top"
          transition="slide-y-reverse-transition"
          class="ma-5 pa-5"
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
                  dark
                  fab
                  color="amber"
                >
                  <v-icon color="black" v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon size="50" color="black" v-else>
                    mdi-auto-fix
                  </v-icon>
                </v-btn>
              </template>
              Automation
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
                color="black"
              >
                <v-icon size="50" color="amber">mdi-bell</v-icon>
              </v-btn>
            </template>
            Set Alert
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
                color="black"
              >
                <v-icon size="50" color="amber">mdi-email</v-icon>
              </v-btn>
            </template>
            Send Message
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
                color="black"
              >
              <v-icon size="50" color="amber">mdi-calendar</v-icon>
            </v-btn>
          </template>
          Add to Calendar
        </v-tooltip>

      </v-speed-dial>
    </v-card>
    <v-snackbar
      :timeout="-1"
      :value="showNodeDetails"
      multi-line
      top
      dark
      class="mt-13"
      >
        <v-list-item Three-line>
          <v-list-item-icon>
            <v-icon color="Data">
              {{labelIcon}}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle class="text-wrap caption Data--text">
              {{selectedNode ? selectedNode.type : ''}}
            </v-list-item-subtitle>
            <v-list-item-title class="text-wrap">
              {{selectedNode ? selectedNode.displayName : selectedNode}}
            </v-list-item-title>
            <v-divider class="my-2"></v-divider>
            <v-list-item-subtitle class="text-wrap">
              {{selectedNode && selectedNode.description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

    </v-snackbar>

    <v-dialog
      v-model="nodeModificationDialog"
      :width="140">
      <v-card dark class="pb-3">
        <v-divider></v-divider>
        <v-card-actions>
          <v-tooltip
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
                class="mt-3"
                icon
                large
                @click="editDialog = true">
                <v-icon>mdi-tune</v-icon>
              </v-btn>
            </template>
                Edit
          </v-tooltip>

          <v-tooltip
            v-if="isTool"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="isTool"
                color="blue"
                icon
                large
                class="mt-3 ml-4"
                @click="toolDialog = true">
                <v-icon>mdi-hammer-wrench</v-icon>
              </v-btn>
            </template>
            Tool
          </v-tooltip>
          <v-tooltip
            v-if="!isTool"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="Site"
                icon
                large
                class="mt-3 ml-4"
                @click="siteDialog = true">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>
            Sites
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      width="600"
      flat
      persistent
      v-if="networkOptionsDialog"
      v-model="networkOptionsDialog">
      <v-card>
        <v-toolbar flat color="Data">
          <v-icon color="white" left>
            mdi-chart-bubble
          </v-icon>
          <v-toolbar-title class="white--text">Model</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="networkOptionsDialog = false">
            <v-icon class="white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-shape-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Entity</v-list-item-title>
                <v-list-item-subtitle>Create a new Entity</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Data" class="ml-2 mt-2">mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Actor</v-list-item-title>
                <v-list-item-subtitle>Create a new Actor</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Workflow" class="ml-2 mt-2">mdi-check-all</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Workflow</v-list-item-title>
                <v-list-item-subtitle>Create a new Workflow</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Workflow" class="ml-2 mt-2">mdi-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Task</v-list-item-title>
                <v-list-item-subtitle>Create a new Task</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-5"></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="Site" class="ml-2 mt-2">mdi-web</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Site</v-list-item-title>
                <v-list-item-subtitle>Create a new Site</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { Network } from 'vis-network/peer/esm/vis-network'
import { DataSet } from 'vis-data/peer/esm/vis-data'
import apiClient from '@/mixin/api-client'
import entityTypes from '@/mixin/entity-types'
import moment from 'moment'

export default {
  mixins: [apiClient, entityTypes],
  components: { },
  mounted: function () {
    if (this.dialog && this.firstLoad) {
      this.firstLoad = false
      this.reloadGraph()
    }
    this.organizationName = this.$store.state.organizationName
  },
  methods: {
    goBack: function () {
      this.$router.push('/')
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
      this.reset()
      this.loadData()
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
        }
      })
      this.network.on('oncontext', (event) => {
        this.networkOptionsDialog = true
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
      let sites = await this.api('graph').site.getAll()
      this.labelNodeBy('displayName', sites)
      sites.forEach((site) => {
        site.group = 'Site'
        site.label = site.title
      })
      this.nodes.add(sites)

      let entities = await this.api('graph').entity.getAll()
      this.labelNodeBy('displayName', entities)
      entities.forEach((entity) => {
        entity.label = entity.title
      })
      this.nodes.add(entities)

      let actors = await this.api('graph').actor.getAll()
      this.labelNodeBy('displayName', actors)
      entities.forEach((actor) => {
        actor.label = actor.title
      })
      this.nodes.add(actors)

      let workflows = await this.api('graph').workflow.getAll()
      this.labelNodeBy('displayName', workflows)
      workflows.forEach((workflow) => {
        workflow.label = workflow.title
      })
      this.nodes.add(workflows)

      let tasks = await this.api('graph').task.getAll()
      this.labelNodeBy('displayName', tasks)
      this.nodes.add(tasks)

      let edges = []
      await Promise.all(sites.map(async (item) => {
        let site = await this.api('graph').site.get(item.id)
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
        let entity = await this.api('graph').entity.get(item.id)
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
        let actor = await this.api('graph').actor.get(item.id)

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
        let workflow = await this.api('graph').workflow.get(item.id)

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
        let task = await this.api('graph').task.get(item.id)

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
      await this.api('graph')[this.selectedNode.type.toLowerCase()].save(entity)
      this.selectedNode = {}
      this.reloadGraph()
    },
    purgeTargetEntity: async function () {
      this.loading = true
      this.editDialog = false
      this.showNodeDetails = false
      this.nodeModificationDialog = false
      await this.api('graph')[this.selectedNode.type.toLowerCase()].delete(this.selectedNode)
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
    dialog: true,
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

    networkOptionsDialog: false,
    showFab: false,
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
    siteLabelicon: 'mdi-web'
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
</style>
