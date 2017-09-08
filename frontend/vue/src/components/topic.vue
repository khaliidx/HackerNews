<template>

  <div class="form-horizontal">
      <div class="col-sm-12">
        <h2>{{topic.title}}</h2>      
      </div>

      <div class="col-sm-12">
        <label>Content</label>
        <p>{{topic.content}}</p>        
      </div>
      <div class="col-sm-6"></div>
      <div class="col-sm-6">
        <p id="user">by {{topic.user}} at {{topic.createdAt}}</p>
      </div>
      <br><br>



      <div class="col-sm-12">
        <h2>Comments</h2>
        
        <p v-for="comment in topic.comments"><span id="comment">{{comment.owner}}</span> said : {{comment.content}}</p>
      </div>

      <div class="col-sm-12">
        <h3>Add a comment...</h3>
        <textarea v-model="content" placeholder="comment here..." rows="4" cols="50"></textarea><br>
        <button class="btn btn-primary" @click="addComment()">Comment</button>
      </div>
    
    <hr>
  </div>

</template>


<script>
import Vue from 'vue' 
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


export default {
  
  data() {
    return{
      topic:{
        createdAt: this.$store.state.topic.createdAt,
        user: this.$store.state.topic.user.username,
        title: this.$store.state.topic.title,
        content: this.$store.state.topic.content,
        comments: this.$store.state.topic.comments,

      },
      content: "",
    }
  },

  methods: {
    addComment(){
      Vue.axios.post('http://localhost:1337/topic/comment',{title:this.topic.title, content:this.content, oc: localStorage.getItem('name')})
      .then( (res) => { this.topic.comments.push(res.data);this.content="" })
      .then(() => {this.$router.push('/topic')} )
      .catch( e => { console.log(e)})
    },
  },  

}


</script>


<style>
#user{
  font-size: 15px;
  color: grey;
}

#comment{
  color: blue;
}
</style>