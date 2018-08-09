<template>
  <div id="app">
    <v-app>
      <navigation app></navigation>
        <v-toolbar app></v-toolbar>
          <v-content>
            <router-view></router-view>
          </v-content>
    </v-app>
  </div>
</template>

<script>
import navigation from './components/partials/navigation'
export default {
  name: 'App',
  components:{
    navigation
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
</style>
