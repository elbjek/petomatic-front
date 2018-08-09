<template>
  <div>
    <form  v-on:click.prevent="validation">
      <label for="first_name">
        First name
        <input type="text" name="first_name" id="first_name" v-model="newUser.first_name" >
      </label>
      <label for="last_name">
        Last name
        <input type="text" name="last_name" id="last_name" v-model="newUser.last_name">
      </label>
      <label for="email">
        Email
        <input type="email" name="email" id="email" v-model="newUser.email">
      </label>
      <p v-if="show">{{emailError}}</p>
      <label for="password">
        Password
        <input type="password" name="password" id="password" v-model="newUser.password">
      </label>
      <button>Submit</button>
    </form>
    <p v-if="show" >{{passError}}</p>
    <div>
     Already have an account?  <a href="#"><router-link to="/login">Login</router-link></a>
    </div>
  </div>
</template>

<script>
export default {
  /*eslint-disable*/
  name: 'signup',
  data () {
    return {
      newUser: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      show: true,
      passError:'',
      emailError:''
    }
  },
  methods: {
    regEx () {
      var regularExpresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regularExpresion.test(this.newUser.email)
    },
    validation () {
      if (this.newUser.email === '') {
        this.emailError = 'E-mail is required.'
      } else if (!this.regEx(this.newUser.email)) {
        this.emailError = 'Please enter a valid e-mail.'
      }
      if (this.newUser.password === '') {
        this.passError = 'Password is required.'
      } else if (this.newUser.password.length < 3 ){
        this.passError = 'Password must be longer than 3 characters.'
      } else {
        this.show = false;
      this.axios
        .post('http://localhost:3200/signup', this.newUser)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        this.newUser.password = ''
        this.newUser.email = ''
      }
    }
  }
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.4.5/lib/theme-chalk/index.css");
.app {
  border: 1px solid black;
}
</style>