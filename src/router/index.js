import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Afiliado from '../views/Afiliado.vue'
import Configuracion from '../views/Configuracion.vue'
import OrdenById from '../views/orden.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Proveedor.vue'),
  },
  {
    path: '/afiliado',
    name: 'Afiliado',
    component: Afiliado,
  },
  {
    path: '/config',
    name: 'configuracion',
    component: Configuracion,
  },
  {
    path: '/orden',
    name: 'orden',
    component: OrdenById,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
