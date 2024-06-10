import {
    createRouter, createWebHashHistory, RouteRecordRaw
} from 'vue-router'
import GameBoardPage from './pages/game-board-page.vue'
import GameInitPage from "./pages/game-init-page.vue";

const routes: RouteRecordRaw[] = [
    {
      path: '', redirect: '/game-init'
    },
    {
        path: '/game-init', component: GameInitPage
    },
    {
        path: '/game-board', component: GameBoardPage
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
