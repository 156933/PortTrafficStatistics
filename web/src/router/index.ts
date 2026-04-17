import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../components/Layout/PublicLayout.vue'),
      children: [
        { path: '', name: 'PublicBoard', component: () => import('../views/PublicBoard.vue') },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/admin',
      component: () => import('../components/Layout/AdminLayout.vue'),
      meta: { requiresAuth: true },
      redirect: '/admin/dashboard',
      children: [
        { path: 'dashboard', name: 'Dashboard', component: () => import('../views/admin/Dashboard.vue') },
        { path: 'users', name: 'UserList', component: () => import('../views/admin/UserList.vue') },
        { path: 'users/create', name: 'UserCreate', component: () => import('../views/admin/UserForm.vue') },
        { path: 'users/:id/edit', name: 'UserEdit', component: () => import('../views/admin/UserForm.vue') },
        { path: 'hosts', name: 'HostList', component: () => import('../views/admin/HostList.vue') },
        { path: 'alerts/rules', name: 'AlertConfig', component: () => import('../views/admin/AlertConfig.vue') },
        { path: 'alerts/logs', name: 'AlertLog', component: () => import('../views/admin/AlertLog.vue') },
        { path: 'audit', name: 'AuditLog', component: () => import('../views/admin/AuditLog.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }
})

export default router
