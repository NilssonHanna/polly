import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
 
const routes = [
 {
   path: '/',
   name: 'Start',
   component: StartView
 },
   {
   path: '/poll/:id',
   name: 'PollView',
   component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
 },
 {
   path: '/nickname/:pin',
   name: 'NicknameView',
   component: () => import(/* webpackChunkName: "about" */ '../views/NicknameView.vue')
 },
 
 {
   path: '/create/:lang',
   name: 'CreateView',
   // route level code-splitting
   // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
 },
 {
   path: '/connect/:lang/',
   name: 'ConnectView',
   component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
 },
 {
   path: '/join/:lang',
   name: 'JoinView',
   // route level code-splitting
   // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
<<<<<<< HEAD
   component: () => import(/* webpackChunkName: "about" */ '../views/JoinView.vue')
 },
=======
   //component: () => import(/* webpackChunkName: "about" */ '../views/JoinView.vue')
 //},
>>>>>>> a7f1498c8f35e7a1ef5b7109d7c18bc211d11d7f
  {
   path: '/result/:id',
   name: 'ResultView',
   // route level code-splitting
   // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
 },
 
 {
   path: '/questions/:lang/',
   name: 'QuestionsView',
   component: () => import(/* webpackChunkName: "about" */ '../views/QuestionsView.vue')
 },
 
 {
   path: '/waiting/:lang/',
   name: 'WaitingView',
   component: () => import(/* webpackChunkName: "about" */ '../views/WaitingView.vue')
 }
 
]
 
const router = createRouter({
 history: createWebHashHistory(),
 routes
})
 
export default router

