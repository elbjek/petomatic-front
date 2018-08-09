<template>
<div>
   <v-toolbar flat color="white">
      <v-toolbar-title>Customer list</v-toolbar-title>
   </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="customers"
      hide-actions
      class="elevation-1"
      >
      <template slot="items" v-if="deleted" slot-scope="props">
     
        <td class="text-xs-left">{{ props.item.first_name + ' ' + props.item.last_name }}</td>
        <td class="text-xs-left">{{'0' + props.item.phone_number }}</td>
        <td class="text-xs-left">{{ props.item.city }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="justify-start align-center layout px-20">

          <v-btn :href="'/customer/' + props.item.customers_id"
          flat icon small color="orange"> <v-icon>visibility</v-icon>
          </v-btn>
          
          <v-btn :href="'/customer/edit/' + props.item.customers_id"
          flat icon small color="orange"> <v-icon>edit</v-icon>
          </v-btn>
      
          <v-btn
          flat icon small color="orange"> <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
   </v-data-table>
</div>
</template>

<script>
/*eslint-disable*/
export default {
  name:'customers',
    data: () => ({
      
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Phone number', value: 'phone_number' },
        { text: 'City', value: 'city' },
        { text: 'Date of visit', value: 'date' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      customers: [],
      defaultItem: {
        first_name: '',
        last_name:'',
        phone_number: 0,
        date: 0,
        name: '',
      },
      deletedItem:'',
      deleted:false,  
      selected:''    
  }),
  mounted () {
    this.axios .get('http://localhost:3200/all')
      .then(response => {
        this.customers = response.data
        for(var i = 0; i< this.customers.length; i++) {
          this.first_name = this.customers[i].first_name 
          this.last_name = this.customers[i].last_name
          this.phone_number = this.customers[i].phone_number
          this.date = this.customers[i].date
          this.name = this.customers[i].name
          this.deleted = this.customers[i].deleted
        }
      })
      console.log(this.customers);
  }
}
</script>

<style>
.app {
  border: 1px solid black;
}
</style>