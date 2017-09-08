<template>

    <div id="wrapper">

    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="/">
          HackerNews
        </a>
        <ul class="nav navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-else><a href="#" @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="col-sm-3">
        <h2 v-if="isLoggedIn">  welcome <br>{{username}} </h2>
      </div>
      
      <div class="col-sm-9 jumbotron">
        <router-view></router-view>
      </div>
    </div>

  </div>

</template>

<script>

export default{




  data(){
    return {
      username : localStorage.getItem('name'),
      isLoggedIn: this.$store.state.isLoggedIn
    }
  },
  methods: {

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.$store.dispatch('logout').then(()=>{window.location.href="http://localhost:8080/"})
    }  
  }
  


}





</script>