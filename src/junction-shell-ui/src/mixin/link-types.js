export default {
  mounted: function () {
    this.setCurrentViewMode()
    this.setVisibleLinks()
  },
  methods: {
    setCurrentViewMode: function () {
      this.viewMode = this.$store.state.viewMode
    },
    setVisibleLinks: function () {
      switch (this.viewMode) {
        case 'Admin':
          this.filterAdminLinks()
          break
        case 'Member':
          this.filterMemberLinks()
          break
        case 'Public':
          this.filterPublicLinks()
          break
      }
    },
    filterAdminLinks: function () {
      this.primaryLinks = this.primaryLinks
      this.adminLinks = this.adminLinks
      this.resourceLinks = this.resourceLinks
    },
    filterMemberLinks: function () {
      this.primaryLinks = this.primaryLinks
      this.adminLinks = []
      this.resourceLinks = []
    },
    filterPublicLinks: function () {
      this.primaryLinks = this.primaryLinks.filter((item) => {
        return item.title === 'Work'
      })
      this.adminLinks = []
      this.resourceLinks = []
    }
  },
  data () {
    return {
      viewMode: null,
      primaryLinks: [
        {
          title: 'Profiles',
          href: '/profiles',
          icon: 'mdi-human-greeting',
          color: 'Villager',
          description: 'My skills and preferences'
        }, {
          title: 'Neighbors',
          href: '/neighbors',
          icon: 'mdi-earth',
          color: 'Villager',
          description: 'My world'
        }, {
          title: 'Claims',
          href: '/claims',
          icon: 'mdi-room-service-outline',
          color: 'Villager',
          description: 'My claimed services and offerings'
        }, {
          title: 'Models',
          href: '/models',
          icon: 'mdi-chart-bubble',
          color: 'Villager',
          description: 'My data and workflows'
        }
      ],
      adminLinks: [
        {
          title: 'Service',
          href: '/service-center',
          icon: 'mdi-room-service',
          color: 'Data',
          disabled: true,
          description: 'Create and Manage services'
        }, {
          title: 'Process',
          href: '/process-center',
          icon: 'mdi-human',
          color: 'Data',
          description: 'Manage Intake and Outcomes'
        }, {
          title: 'Command',
          href: '/command-center',
          icon: 'mdi-shield-check',
          color: 'Data',
          description: 'Real-time Service Management'
        }, {
          title: 'Referrals',
          href: '/referrals',
          icon: 'mdi-account-multiple-plus',
          color: 'Data',
          disabled: true,
          description: 'Create and Manage Referrals'
        }, {
          title: 'Contracts',
          href: '/contract-center',
          icon: 'mdi-file-document-outline',
          color: 'Data',
          disabled: true,
          description: 'Manage Platform Contracts'
        }, {
          title: 'Polls',
          href: '/poll-center',
          icon: 'mdi-vote',
          color: 'Data',
          disabled: true,
          description: 'Create and Manage Polls'
        }
      ],
      resourceLinks: []
    }
  }
}
