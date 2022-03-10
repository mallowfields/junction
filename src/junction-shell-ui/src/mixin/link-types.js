export default {
  mounted: function () {
    this.setCurrentViewMode()
    this.setVisibleLinks()
  },
  methods: {
    setCurrentViewMode: function () {
      this.viewMode = this.$store.state.viewMode
      this.adminPowers = this.$store.state.adminPowers
      this.socialJusticePowers = this.$store.state.socialJusticePowers
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
      adminPowers: null,
      socialJusticePowers: null,
      viewMode: null,
      primaryLinks: [
        {
          title: 'Polls',
          href: '/polls',
          icon: 'mdi-vote',
          color: 'Villager',
          description: 'My skills and preferences'
        }
      ],
      socialJusticeLinks: [
        {
          title: 'Neighbors',
          href: '/neighbors',
          icon: 'mdi-earth',
          color: 'Villager',
          socialJusticePower: true,
          description: 'My World'
        }, {
          title: 'Gigs',
          href: '/gigs',
          icon: 'mdi-star-circle-outline',
          color: 'Villager',
          socialJusticePower: true,
          description: 'My Gigs'
        }, {
          title: 'Jobs',
          href: '/jobs',
          icon: 'mdi-domain',
          color: 'Villager',
          socialJusticePower: true,
          description: 'My Jobs'
        }
      ],
      casualLinks: [
        {
          title: 'Casual',
          href: '/casual',
          icon: 'mdi-human-greeting',
          color: 'blue',
          description: 'Casual'
        }
      ],
      adminLinks: [
        {
          title: 'GigCenter',
          href: '/gig-center',
          icon: 'mdi-star-circle-outline',
          color: 'Data',
          disabled: true,
          description: 'Create and Manage Gigs'
        }, {
          title: 'Models',
          href: '/models',
          icon: 'mdi-chart-bubble',
          color: 'Data',
          description: 'My Workflows'
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
          description: 'Real-time Gig Management'
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
