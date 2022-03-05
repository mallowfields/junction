import { RestClient } from '../../api-client'

const isProduction = process.env.NODE_ENV === 'production'
const uri = isProduction
  ? process.env.VUE_APP_PROD_REST_ENDPOINT
  : process.env.VUE_APP_DEV_REST_ENDPOINT

const client = new RestClient(uri, 'no-key')

export default {
  methods: {
    api: function (tag) {
      client.localHeaders = {
        'x-jct-app-version': '1.0',
        'x-jct-tag': `${tag}`,
        'x-jct-app-path': window.location.pathname,
        'x-jct-app-profile': `${this.$store.state.profile}`,
        'x-jct-app-organization-name': `${this.$store.state.organizationName}`,
        'x-jct-app-user-role': `${this.$store.state.viewMode}`,
        'x-jct-app-user-display-name': `${this.$store.state.userName}`
      }
      return {
        actor: client.actor,
        entity: client.entity,
        site: client.site,
        task: client.task,
        workflow: client.workflow
      }
    }
  }
}
