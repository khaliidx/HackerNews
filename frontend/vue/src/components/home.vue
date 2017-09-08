<template>
   
  <div id="app">

    <h1 > HackerNews </h1>
        <button class="btn btn-primary" @click="showTopics()">Topics</button>
        <router-link class="btn btn-primary" to="/newtopic">New Topic</router-link>
        <h4 v-text="msg"></h4>
<br><br>
   
    <ul class="topic" v-for="topic in topics"> 
      <li >
        <div style="float:left">
          +{{topic.upvotes}}<a style="padding-left: 10px" @click="upvote(topic.title)">upvote</a>
        </div>
        <a @click="showTopic(topic.id)">{{topic.title}}</a>
         <div style="float:right">
          {{topic.commentsNbr}} Comments
        </div>
      </li>
    </ul>
    

    


    <router-view></router-view>
  </div>
</template>




<script>
import { mapMutations, mapActions } from 'vuex'
import Vue from 'vue' 
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {



  name: 'app',
  data() {
    return {
      isLoggedIn: this.$store.state.isLoggedIn,
      topics : [],
      msg: "click on 'topics' to display a list of topics...",
      topic: "",

      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
    }
  },


  methods: {
    ...mapActions([
      'setCurrentTopic'
      ]),

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.$store.dispatch('logout').then(()=>{window.location.href="http://localhost:8080/"})
    },  

    showTopics(){
      
      Vue.axios.get('http://localhost:1337/topics')
               .then(response => { 
                  if(response.data.topics.length == 0)
                    this.msg = "No topics found."
                  this.topics = response.data.topics
                })
               .catch(function(e){ console.log(e) })
    },
    showTopic(id){
      let self = this
    
      Vue.axios.get('http://localhost:1337/topic/'+id)
              .then( response => { self.setCurrentTopic(response.data) })
              .then(() => {this.$router.push('/topic')} )
              .catch( e => { console.log(e)})
    },

    upvote(title){
      if(!localStorage.getItem('name')) this.$router.push('/login')
      else{
      Vue.axios.post('http://localhost:1337/topic/upvote', {user: localStorage.getItem('name'), title: title})
               .then( (res) => { 
                  let i = this.topics.findIndex( (r) => { return r.title == title} )
                  if(!this.topics[i].voters.find((r) => { return r == localStorage.getItem('name')}))
                  this.topics[i].upvotes = res.data[0].upvotes 
                })
               .catch( e => { console.log(e)} )
      }
    },


    onSignInSuccess (response,req) {
      let vm=this
      this.$store.dispatch("login").then(()=>{
        this.$router.push('/home')
      });
      FB.api('/me', res => {
      this.axios.post('localhost:1337/login',{name:res.name,id:res.id}).then( (response) => {
      localStorage.setItem('name',res.name);
      localStorage.setItem('token',response.body.token);

      },(error)=>{
        console.log(error)
      })
      })

    },
    onSignInError (error) {
      console.log('OH NOES', error)
  },

}
}
</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}


.topic{
  list-style: none;
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
  }
</style>
