import VueRouter from 'vue-router'

// Pages
import GrantsPage from '@/pages/public/GrantsPage.vue'
import HomePage from '@/pages/public/HomePage.vue'
import PollsPage from '@/pages/public/PollsPage.vue'
import NeighborsPage from '@/pages/public/NeighborsPage.vue'
import GigsPage from '@/pages/public/GigsPage.vue'
import JobsPage from '@/pages/public/JobsPage.vue'
import ModelsPage from '@/pages/public/ModelsPage.vue'
import CasualPage from '@/pages/public/CasualPage.vue'
import ProcessCenterPage from '@/pages/administration/ProcessCenterPage.vue'
import CommandCenterPage from '@/pages/administration/CommandCenterPage.vue'
import CoordinatedEntryAssessment from '@/forms/CoordinatedEntryAssessment.vue'

const routes = [
  {
    name: 'grants',
    path: '/grants',
    component: GrantsPage
  }, {
    name: 'coordinatedEntryAssessment',
    path: '/coordinated-entry-assessment',
    component: CoordinatedEntryAssessment
  }, {
    name: 'home',
    path: '/',
    component: HomePage
  }, {
    name: 'polls',
    path: '/polls',
    component: PollsPage
  }, {
    name: 'casual',
    path: '/casual',
    component: CasualPage
  }, {
    name: 'neighbors',
    path: '/neighbors',
    component: NeighborsPage
  }, {
    name: 'gigs',
    path: '/gigs',
    component: GigsPage
  }, {
    name: 'jobs',
    path: '/jobs',
    component: JobsPage
  }, {
    name: 'models',
    path: '/models',
    component: ModelsPage
  }, {
    name: 'process-center',
    path: '/process-center',
    component: ProcessCenterPage
  }, {
    name: 'command-center',
    path: '/command-center',
    component: CommandCenterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
