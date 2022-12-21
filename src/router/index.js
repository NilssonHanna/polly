import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
 
const routes = [
 {
   path: '/',
   name: 'Start',
   component: StartView
 },
   {
   
   path: '/words/:lang/:id',
   name: 'WordsView',
   component: () => import(/* webpackChunkName: "about" */ '../views/WordsView.vue')
 },

 {
  path: '/Word/:lang',
  name: 'WordView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WordView.vue')
},

 {
  path: '/wordstack/:lang/:id',
  name: 'WordStackView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WordStackView.vue')
},

 
 {
   path: '/poll/:pollId',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
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
  path: '/join/:lang',
  name: 'JoinView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/JoinView.vue')
},

 
  {
    path: '/nickname/:lang/:pollId',
    name: 'NicknameView',
   component: () => import(/* webpackChunkName: "about" */ '../views/NicknameView.vue')
 },
 
 {
  path: '/connect/:lang/:pollId',
  name: 'ConnectView',
  component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
},



{
  path: '/answer/:lang',
  name: 'answerView',
  component: () => import(/* webpackChunkName: "about" */ '../views/answerView.vue')
},

  {
    path: '/voting/:lang/',
   name: 'VotingView',
   component: () => import(/* webpackChunkName: "about" */ '../views/VotingView.vue')
 },


   {
    path: '/result/:id',
    name: 'ResultView',
   // route level code-splitting
   // this generates a separate chunk (about.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
 },
 
 
 {
   path: '/waiting/:lang/',
   name: 'WaitingView',
   component: () => import(/* webpackChunkName: "about" */ '../views/WaitingView.vue')
 },
 

  {
    path: '/questions/:lang/:id',
    name: 'QuestionsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuestionsView.vue')
  }


]
 
const router = createRouter({
 history: createWebHashHistory(),
 routes
})
 
export default router