import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
    { path: '/tasks', name: 'tasks', component: () => import('../views/TasksView.vue'), meta: { title: 'Zadania' } },
    { path: '/subjects', name: 'subjects', component: () => import('../views/SubjectsView.vue'), meta: { title: 'Przedmioty' } },
    { path: '/timer', name: 'timer', component: () => import('../views/TimerView.vue'), meta: { title: 'Timer' } },
    { path: '/statistics', name: 'statistics', component: () => import('../views/StatisticsView.vue'), meta: { title: 'Statystyki' } },
    { path: '/notes', name: 'notes', component: () => import('../views/NotesView.vue'), meta: { title: 'Notatki' } },
  ],
})

export default router
