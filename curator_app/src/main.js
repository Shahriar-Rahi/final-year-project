'use strict'

// These requires inform webpack which styles to build
require('bootstrap')
require('../styles/main.scss')

const m = require('mithril')

const api = require('./services/api')
const navigation = require('./components/navigation')

const AgentList = require('./views/agent_list')
const AgentDetailPage = require('./views/agent_detail')
const RegisterProductForm = require('./views/register_product_form')
const Dashboard = require('./views/dashboard')
const LoginForm = require('./views/login_form')
const ProductList = require('./views/product_list')
const ProductDetailPage = require('./views/product_detail')
const SignupForm = require('./views/signup_form')

/**
 * A basic layout component that adds the navbar to the view.
 */
const Layout = {
  view (vnode) {
    return [
      vnode.attrs.navbar,
      m('.content.container', vnode.children)
    ]
  }
}

const loggedInNav = () => {
  const links = [
    ['/register', 'Register Product'],
    ['/products', 'View Product Registry'],
    ['/agents', 'View Agents']
  ]
  return m(navigation.Navbar, {}, [
    navigation.links(links),
    navigation.link('/profile', 'Profile'),
    navigation.button('/logout', 'Logout')
  ])
}

const loggedOutNav = () => {
  const links = [
    ['/products', 'View Product Registry'],
    ['/agents', 'View Agents']
  ]
  return m(navigation.Navbar, {}, [
    navigation.links(links),
    navigation.button('/login', 'Log in/Sign up')
  ])
}

/**
 * Returns a route resolver which handles authorization related business.
 */
const resolve = (view, restricted = false) => {
  const resolver = {}

  if (restricted) {
    resolver.onmatch = () => {
      if (api.getAuth()) return view
      m.route.set('/login')
    }
  }

  resolver.render = vnode => {
    if (api.getAuth()) {
      return m(Layout, { navbar: loggedInNav() }, m(view, vnode.attrs))
    }
    return m(Layout, { navbar: loggedOutNav() }, m(view, vnode.attrs))
  }

  return resolver
}

/**
 * Clears user info from memory/storage and redirects.
 */
const logout = () => {
  api.clearAuth()
  m.route.set('/')
}

/**
 * Redirects to user's personal account page if logged in.
 */
const profile = () => {
  const publicKey = api.getPublicKey()
  if (publicKey) m.route.set(`/agents/${publicKey}`)
  else m.route.set('/')
}

/**
 * Build and mount app/router
 */
document.addEventListener('DOMContentLoaded', () => {
  m.route(document.querySelector('#app'), '/', {
    '/': resolve(Dashboard),
    '/agents': resolve(AgentList),
    '/agents/:publicKey': resolve(AgentDetailPage),
    '/register': resolve(RegisterProductForm, true),
    '/login': resolve(LoginForm),
    '/logout': { onmatch: logout },
    '/profile': { onmatch: profile},
    '/products': resolve(ProductList),
    '/products/:recordId': resolve(ProductDetailPage),
    '/signup': resolve(SignupForm)
  })
})
