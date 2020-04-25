/* Add your Application JavaScript */
const Home = Vue.component('home', {
  template: `
    <div class="home">
    <img src="/static/images/logo.png" alt="VueJS Logo">
    <h1>{{ welcome }}</h1>
    </div>
    `,
  data: function() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/news" class="nav-link">News</router-link>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container justify-content-center">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
                <p>Powered by NewsAPI.org</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})

const NewsList = Vue.component('news-list', {
  template: `
  <div class="news">
    <h2>News</h2>
    <div class="form-inline d-flex justify-content-center">
      <div class="form-group mx-sm-3 mb-2">
        <label class="sr-only" for="search">Search</label>
        <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
        <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
      </div>
    </div>
      <ul class="row news__list">
        <div v-for="article in articles" class="news__item col-6 p-3">
          <div class="card border-dark" >
            <img :src="article.urlToImage" v-if= "article.urlToImage" class="card-img-top" alt="...">
            <img id="news-img" src="https://storage.needpix.com/rsynced_images/news-2389226_1280.png" v-if= "!article.urlToImage" class="card-img-top w-50" alt="News Icon">
            <div class="card-body justify-content-center">
              <h5 class="card-title font-weight-bold">{{ article.title }}</h5>
              <p class="card-text">{{ article.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item font-italic">Article from: {{ article.source.name }}</li>
              <li class="list-group-item font-italic" v-if="article.author">Author: {{ article.author }}</li>
              <!--<li class="list-group-item font-italic">Published on: </li>-->
            </ul>
            <div class="card-body">
              <a v-bind:href="article.url" target="_blank" class="card-link">Go to article page</a>
            </div>
          </div>
        </div>
      </ul>
  </div>
  `,
  /*data: function() {
      return {}
  },*/

  created: function() {
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=b66e88fda1544e8a8315583297c5225e').then(function(response) {
      return response.json();
      }).then(function(data) {
          //console.log(data);
          self.articles = data.articles;
        });
   },
   
   data: function() {
    return {
      articles: [],
      searchTerm: ''
    }
   },

   methods: {
    searchNews: function() {
    let self = this;
    fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=b66e88fda1544e8a8315583297c5225e').then(function(response) {
        return response.json();
      }).then(function(data) {
        //console.log(data);
        self.articles = data.articles;
      });
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});

let app = new Vue({
    el: '#app',
    router
});

