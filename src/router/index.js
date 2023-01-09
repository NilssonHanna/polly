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
  path: '/waitingvote/:lang/:id',
  name: 'WaitingVoteView',
  component: () => import(/* webpackChunkName: "about" */ '../views/WaitingVoteView.vue')
},
{
 path: '/word/:lang/:id',
 name: 'WordView',
 component: () => import(/* webpackChunkName: "about" */ '../views/WordView.vue')
},

{
 path: '/explanations/:lang/:id',
 name: 'ExplanationsView',
 component: () => import(/* webpackChunkName: "about" */ '../views/ExplanationsView.vue')
},

{
 path: '/winner/:lang/:id',
 name: 'WinnerView',
 component: () => import(/* webpackChunkName: "about" */ '../views/WinnerView.vue')
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
   path: '/nickname/:lang/:id',
   name: 'NicknameView',
  component: () => import(/* webpackChunkName: "about" */ '../views/NicknameView.vue')
},

{
 path: '/connect/:lang/:id',
 name: 'ConnectView',
 component: () => import(/* webpackChunkName: "about" */ '../views/ConnectView.vue')
},

{
 path: '/waitinganswer/:lang/:id',
 name: 'WaitingForAnswersView',
 component: () => import(/* webpackChunkName: "about" */ '../views/WaitingForAnswersView.vue')
},

{
  path: '/presentexplanations/:lang/:id',
  name: 'PresentExplanationsView',
  component: () => import(/* webpackChunkName: "about" */ '../views/PresentExplanationsView.vue')
 },

 {
   path: '/voting/:lang/:id',
  name: 'VotingView',
  component: () => import(/* webpackChunkName: "about" */ '../views/VotingView.vue')
},

  {
   path: '/result/:lang/:id/',
   name: 'ResultView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
},

{
  path: '/waiting/:lang/:id',
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