<template>
  <div class="hello">
    <appointment></appointment>
    <customers></customers>
  </div>
</template>

<script>
import appointment from './partials/appointments'
import customers from './partials/customers'

export default {
  name: 'index',
  components:{
    appointment,
    customers
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
