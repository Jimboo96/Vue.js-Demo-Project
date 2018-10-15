const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/', redirect: '/' },
  { path: '/about', component: About }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app')
