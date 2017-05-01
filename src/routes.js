import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Statistics from './pages/statistics.vue'

export default [
    { path: '/', component: Home },
    { path: '/statistics', component: Statistics },
    { path: '/about', component: About }
]