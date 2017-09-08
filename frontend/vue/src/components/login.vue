<template>
  <div class="login">


<div class="jumbotron">
  <h1>Login using facebook</h1>

 <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Facebook
  </fb-signin-button>


</div>
</div>

</template>
<script>
import Vue from 'vue'
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)


export default {

  name: 'login',
  components:{
  },
  data () {

    return {

      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
       url:'http://localhost:1337/login',


    }
  },
  methods:{
  onSignInSuccess (response,req) {

      let vm=this
      this.$store.dispatch("login").then(this.$router.push('/'))//window.location.href="http://localhost:8080/"  this.$router.push('/')

      FB.api('/me', res => {
      this.axios.post(vm.url,{name:res.name,id:res.id})
                .then( (response) => {
                    localStorage.setItem('name',res.name);
                    localStorage.setItem('token',response.data.token);
                },(error)=>{ console.log(error) })
                .then(()=>{window.location.href="http://localhost:8080/"})
      })
      // window.location.href="http://localhost:8080/"

  },

    onSignInError (error) {

    },



  },
   computed:{

  }
  }




</script>


<!-- Add "scoped" attribute to limit CSS to this component only
<style scoped>

</style>

 -->




