<template>

  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Title</label>
        <input 
          type="text"
          class="form-control"
          v-model="topic.title"
          placeholder="Title"
        />
      </div>
      <div class="col-sm-6"></div>      
    </div>    
    <div class="form-group">
      <div class="col-sm-12">
        <label>Content</label>
        <input 
          type="textarea" 
          class="form-control"
          v-model="topic.content"
          placeholder="Content"
        />
      </div>        
    </div>    
    <button class="btn btn-primary" @click="save()">Save</button>
    <router-link to="/" class="btn btn-danger">Cancel</router-link>

    
    <hr>
  </div>

</template>



<script>
import Vue from 'vue' 
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

  export default {
    data () {
      return {
        // We default the user object on
        // the timeEntry to have some user details
        topic: {
            user: 'Khalid Mouhcine',
            title: "",
            content: ""
        }
      }
    },
    methods: {
      save () {
        let topic = this.topic



      Vue.axios.post('http://localhost:1337/topic/new',topic)
               .then(response => {console.log(response)})
               .then(()=>{this.$router.push('/')})
               .catch(function(e){ console.log(e) })
      }
    }
  }
</script>