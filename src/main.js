import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHighcharts from 'vue-highcharts'

import routes from './routes'

Vue.use(VueRouter);
Vue.use(VueHighcharts);

const router = new VueRouter({ routes });
new Vue({
    el: '#app',
    router: router,
    template: `
        <div>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/statistics">Statistics</router-link></li>
            </ul>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    `
})