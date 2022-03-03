export default {
  data () {
    return {
      entityTypes: [
        {
          value: 'entity',
          label: 'Entity',
          icon: 'mdi-shape-plus'
        }, {
          value: 'actor',
          label: 'Actor',
          icon: 'mdi-account-circle'
        }, {
          value: 'workflow',
          label: 'Workflow',
          icon: 'mdi-check-all'
        }, {
          value: 'task',
          label: 'Task',
          icon: 'mdi-check'
        }, {
          value: 'site',
          label: 'Site',
          icon: 'mdi-web'
        }
      ]
    }
  }
}
