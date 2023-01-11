import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
 
const routes = [
 {
   path: '/',
   name: 'Start',
   component: StartView
 },

 /*-------------JOIN-----------------------------------*/

 {
  path: '/join/:lang',
  name: 'JoinView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/JoinView.vue')
 },
 
  {
    path: '/nickname/:lang/:id/',
    name: 'NicknameView',
   component: () => import(/* webpackChunkName: "about" */ '../views/NicknameView.vue')
 },
 
 {
  path: '/connect/:lang/:id/:nickname',
  name: 'ConnectView',
  component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
 },
 

 {
  path: '/word/:lang/:id/:nickname',
  name: 'WordView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WordView.vue')
 },
 
 {
   path: '/presentexplanations/:lang/:id/:nickname',
   name: 'PresentExplanationsView',
   component: () => import(/* webpackChunkName: "about" */ '../views/PresentExplanationsView.vue')
  },

  {
    path: '/voting/:lang/:id/:nickname',
   name: 'VotingView',
   component: () => import(/* webpackChunkName: "about" */ '../views/VotingView.vue')
 },


  /*----------------------CREATE-----------------------------*/

  {
    path: '/create/:lang',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },

  {
    path: '/questions/:lang/:id',
    name: 'QuestionsView',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuestionsView.vue')
  },

 {
  path: '/words/:lang/:id',
  name: 'WordsView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WordsView.vue')
},


{
  path: '/explanations/:lang/:id',
  name: 'ExplanationsView',
  component: () => import(/* webpackChunkName: "about" */ '../views/ExplanationsView.vue')
 },




/*-----------------------END-------------------------------*/


{
  path: '/resultcreate/:lang/:id',
  name: 'ResultCreateView',
 // route level code-splitting
 // this generates a separate chunk (about.[hash].js) for this route
 // which is lazy-loaded when the route is visited.
 component: () => import(/* webpackChunkName: "about" */ '../views/ResultCreateView.vue')
},

{
 path: '/resultjoin/:lang/:id/:nickname',
 name: 'ResultJoinView',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () => import(/* webpackChunkName: "about" */ '../views/ResultJoinView.vue')
},


{
  path: '/winner/:lang/:id/:nickname',
  name: 'WinnerView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WinnerView.vue')
 },





]
 
const router = createRouter({
 history: createWebHashHistory(),
 routes
})
 
export default router