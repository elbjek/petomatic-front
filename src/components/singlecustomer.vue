<template>
  
<v-container fluid>
      <v-layout row wrap justify-space-between>
        
    <!-- USER -->
    <v-flex xs8 >
      <h2 style="padding-bottom:20px; text-align:left">Customer info</h2>
      <v-card  style="display:flex; justify-content:center">
        <v-card-title primary-title >
          <div>
            <h3 class="headline mb-0">{{customer[0].first_name + ' ' + customer[0].last_name}}</h3>
            <p>{{customer[0].city + ', ' +  customer[0].state}}  </p>
            <p>{{'0' + customer[0].phone_number}}  </p>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>

    <!-- PETS -->

    <v-flex xs4>
      <h2 style="padding-bottom:20px; text-align:left">Pet info</h2>
      <v-expansion-panel >
      <v-expansion-panel-content 
        v-for="pet in customer"
        :key="pet.id">
          <div slot="header">{{pet.name}}</div>
            <v-card >
              <v-card-media height="100px" src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"></v-card-media>
              <v-card-title primary-title>
              <div>
                <div style="display:flex; justify-content:space-between; flex-direction:row">
                <h3 class="headline mb-0">{{pet.name}}</h3>
                <a :href="'/pet/edit/' + $route.params.clientId"><v-icon>edit</v-icon></a>
                </div>
                <p> Breed: {{pet.breed}}</p>
                <p>Gender: {{pet.sex}}</p>              
                <p> Species: {{pet.species}}</p> 
                <p>Appointment description:{{pet.description}}</p>
              </div>
            </v-card-title>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
   </v-flex>
    <!-- TABS -->  
    </v-layout>
</v-container>

</template>

<script>
/*eslint-disable*/
export default {
  name:'singleCustomer',
  data() {
    return{
    customer:[] ,
    appointments:'',
    landscape:true,
    active: null,
    }
  },
  beforeMount () {
    this.axios .get('http://localhost:3200/customers/' + this.$route.params.clientId)
      .then(response => {
        this.customer = response.data
      })    
  }
}
</script>

<style>
.app {
  border: 1px solid black;
}
</style>