import { createRouter, createWebHistory } from 'vue-router'
import NewMessageView from '../views/NewMessageView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
    {
        path: '/',
        name: 'NewMessage',
        component: NewMessageView
    },
    {
        path: '/history',
        name: 'History',
        component: HistoryView
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
