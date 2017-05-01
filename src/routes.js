import Home from './pages/home.vue'
import About from './pages/about.vue'
import Search from './pages/search.vue';
import SearchWebWorker from './pages/searchWebWorker.vue';
import Statistics from './pages/statistics.vue'
import StatisticsWerWorker from './pages/statisticsWebWorker.vue'

export default [
    { path: '/', component: Home },
    { path: '/statistics', component: Statistics },
    { path: '/statisticsWebWorker', component: StatisticsWerWorker },
    { path: '/about', component: About },
    { path: '/search', component: Search },
    { path: '/searchWebWorker', component: SearchWebWorker },
]