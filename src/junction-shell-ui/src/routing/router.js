import VueRouter from 'vue-router'

// Pages
import HomePage from '@/pages/public/HomePage.vue'
import ProfilesPage from '@/pages/public/ProfilesPage.vue'
import NeighborsPage from '@/pages/public/NeighborsPage.vue'
import GigsPage from '@/pages/public/GigsPage.vue'
import JobsPage from '@/pages/public/JobsPage.vue'
import ModelsPage from '@/pages/public/ModelsPage.vue'
import CasualPage from '@/pages/public/CasualPage.vue'
import ProcessCenterPage from '@/pages/administration/ProcessCenterPage.vue'
import CommandCenterPage from '@/pages/administration/CommandCenterPage.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage
  }, {
    name: 'profiles',
    path: '/profiles',
    component: ProfilesPage
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
