<template>

    <v-navigation-drawer
      v-model="drawer"
      permanent
      absolute
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title><a href="/">Home</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content >
            <v-list-tile-title><a href="/customer/create">Add a customer</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
        <v-list-tile>
          <v-list-tile-content >
            <v-list-tile-title><a href="/pet/create">Add a pet</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content >
            <v-list-tile-title><a href="/appointment/create">Add appointment</a></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
      </v-list>
    </v-navigation-drawer>

</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        right: null
      }
    }
  }
</script>

<style>
.app {
  border: 1px solid black;
}
a{
  text-decoration: none;
  color:black;
}
</style>