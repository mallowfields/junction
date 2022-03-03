import VueRouter from 'vue-router'

// Pages
import HomePage from '@/pages/public/HomePage.vue'
import ProfileBuilderPage from '@/pages/public/ProfileBuilderPage.vue'
import NeighborsPage from '@/pages/public/NeighborsPage.vue'
import ServicesPage from '@/pages/public/ServicesPage.vue'
import DataCenterPage from '@/pages/public/DataCenterPage.vue'
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
    component: ProfileBuilderPage
  }, {
    name: 'neighbors',
    path: '/neighbors',
    component: NeighborsPage
  }, {
    name: 'services',
    path: '/services',
    component: ServicesPage
  }, {
    name: 'data',
    path: '/data',
    component: DataCenterPage
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
