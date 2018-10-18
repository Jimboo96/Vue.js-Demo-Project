const About = {
  template: '<div>About</div>',
  beforeRouteUpdate (to,from,next) {
    //react to route changes
    //dont forget to call next()
  }
};
const User = {
  props: ['name'],
  template: '<div><h2>User {{ name }}</h2></div>',
  watch: {
  '$route'(to, from) {
    //react to route changes
  }}
};
const Home = { template: '<div>Home</div>' }
/*
const Home = {
  props: ['name'],
  methods: {
    getProfileLink: function() {
      return "/user/" + this.name + "profile"
    },
    getPostsLink: function() {
      return "/user/" + this.name + "posts"
    },
  },
  template:'<div> <h2>User {{ name }}</h2><br> <router-link :to="{ path: getProfileLink() }">Go to Profile</router-link> //  <router-link :to="{ path: getPostsLink() }">Go to Posts</router-link><br> <router-view></router-view> </div>'
};*/


const routes = [
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },
  { path: '/about', component: About },
  { path: '/user/:name', component: User, props: true }

/*
  //Nested routing
  {
    path: '/user/:name',
    component: User,
    props: true,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ]
  }*/
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app')

const app2 = new Vue({
  el: '#app2',
  data: {
    ok: true
  }
})
