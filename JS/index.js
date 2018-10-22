const About = {
  template: '<div><h6>This is my demo page showcasing basic routing, usage of Vuex and JSON-data fetching from a server with the help of Axios.</h6></div>',
  beforeRouteUpdate (to,from,next) {
    //Reacting to route changes.
  }
};

const User = {
  props: ['name'],
  template: '<div><h2>User {{ name }}</h2></div>',
  watch: {
  '$route'(to, from) {
    // Reacting to route changes.
  }}
};

const Home = { template: '<div>Home</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },
  { path: '/about', component: About },
  { path: '/user/:name', component: User, props: true }
];

const router = new VueRouter({
  routes
});

const routerApp = new Vue({
  router
}).$mount('#routerApp')

const store = new Vuex.Store({
  state: {
    message: 'Hello from Vuex!',
    count: 0,
    messageVisible: true
  },
  //Synchronous.
  mutations: {
    increment(state, amount) {
      state.count+=amount;
    },
    decrement(state, amount) {
      state.count-=amount;
    },
    messageVisible(state) {
      state.messageVisible = !state.messageVisible
    }
  },
  //Asynchrounous.
  actions: {
    increment(state, amount) {
      state.commit('increment',amount)
    },
    decrement(state, amount) {
      state.commit('decrement',amount)
    }
  },
  getters: {
      message(state) {
        return state.message.toUpperCase();
      },
      counter(state) {
        return state.count;
      },
      messageVisible(state) {
        return state.messageVisible;
      }
  }
});

const vuexApp = new Vue({
  el: '#vuexApp',
  data() {
    return {
      welcome: 'Hello World'
    }
  },
  computed: {
    message() {
      return store.getters.message;
    },
    counter() {
      return store.getters.counter;
    },
    messageVisible() {
      return store.getters.messageVisible;
    }
  },
  methods: {
    incrementPressed() {
      store.dispatch('increment', 20)
    },
    decrementPressed() {
      store.commit('decrement', 15);
    },
    hideMessage() {
      store.commit('messageVisible');
    }
  },
  template: '<div><h1 v-if="messageVisible"> {{ message }} </h1><h2> {{ counter }} </h2><button @click="incrementPressed">Increment</button><button @click="decrementPressed">Decrement</button> <button v-if="messageVisible" @click="hideMessage">Hide Message</button> <button v-else="!messageVisible" @click="hideMessage">Show Message</button></div>'
});

var jsonApp =  new Vue({
  el: '#jsonApp',
  data:{
    status: '',
    id: 0,
    userId: 0,
    title: '',
    body: '',
    dataLoaded: false
  },
  created() {
    this.loadJSON();
  },
  methods: {
    loadJSON() {
      this.status = 'Loading JSON...';
      var jsonApp = this;
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      axios.get('https://jsonplaceholder.typicode.com/posts/' + randomNumber)
      .then(function (response) {
        jsonApp.status = 'Connection succesful';
        jsonApp.dataLoaded = true;
        jsonApp.id = response.data.id;
        jsonApp.userId = response.data.userId;
        jsonApp.title = response.data.title;
        jsonApp.body = response.data.body;
      })
      .catch(function (error) {
        jsonApp.status = 'An error occured: ' + error;
      })
    }
  },
  template: '<div><div v-if="dataLoaded"><p><b>Here is some random data from the depths of the Internet:</b></p><p><b>ID:</b> {{ id }}</p><p><b>UserID:</b> {{ userId }}</p><p><b>Title:</b> {{ title }}</p><p><b>Body:</b> {{ body }}</p><button @click="loadJSON">Get More Data</button></div> <div v-else="!dataLoaded"> {{ status }} </div> </div>'
});
