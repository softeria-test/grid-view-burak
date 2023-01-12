import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

//Initializing new route array with type of RouteConfig by the help of TypeScript.
const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router