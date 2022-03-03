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
          title: 'Services',
          href: '/services',
          icon: 'mdi-room-service-outline',
          color: 'Villager',
          description: 'My service providers and offerings'
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
          title: 'Service Center',
          href: '/service-center',
          icon: 'mdi-room-service',
          color: 'Data',
          disabled: true,
          description: 'Coming soon...'
        }, {
          title: 'Process Center',
          href: '/process-center',
          icon: 'mdi-human',
          color: 'Data',
          description: 'Intake and Outcomes'
        }, {
          title: 'Command Center',
          href: '/command-center',
          icon: 'mdi-charity',
          color: 'Data',
          description: 'Service Management'
        }, {
          title: 'Referral Center',
          href: '/referrals',
          icon: 'mdi-account-multiple-plus',
          color: 'Data',
          disabled: true,
          description: 'Coming soon...'
        }, {
          title: 'Contract Center',
          href: '/contract-center',
          icon: 'mdi-file-document-outline',
          color: 'Data',
          disabled: true,
          description: 'Contract Management'
        }, {
          title: 'Poll Center',
          href: '/poll-center',
          icon: 'mdi-vote',
          color: 'Data',
          disabled: true,
          description: 'Coming soon...'
        }
      ],
      resourceLinks: []
    }
  }
}
