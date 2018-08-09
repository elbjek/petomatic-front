<template>
  <v-container>
      <div class="goback" style="display:flex; justify-content:space-between; align-items:center">
           <h3>Add an appointment</h3>
        <v-btn to="/">x</v-btn>
      </div>

      <v-form v-on:submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-flex class="datePicker">
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            readonly
          ></v-text-field>
          <v-date-picker aria-required v-model="date" :min="todaysDate" @input="$refs.menu.save(date)"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-autocomplete
        v-model="selectedName"
        :items="names"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        item-text="customerName"
        item-value="API"
        label="Customer"
        placeholder="Start typing to Search"
        return-object
        aria-required
      ></v-autocomplete>
    <v-select
      v-model="petId"
      :items="allPets"
      :rules="[v => !!v || 'Item is required']"
      label="Pet names"
      required
    ></v-select>
      <v-select
      v-model="appointmentId"
      :items="allAppointments"
      :rules="[v => !!v || 'Item is required']"
      label="Appointment type"
      required
    ></v-select>
        <v-textarea
          name="input-7-1"
          label="Visit Description"
          v-model="description"
          hint="Visit Details"
        ></v-textarea>    
     <v-btn @click="submit">submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    petName:'',
    customers: [],
    customerId: null,
    description:'',
    pets:[],
    petId:null,
    allPets:[],
    speciesId:null,
    isLoading: false,
    selectedName: null,
    search: null,
    select: null,
    date:null,
    menu: false,
    newAppointment:{},
    allAppointments:[],
    appointments:[],
    appointmentId:null
    }),
    computed: {
      names () {
        return this.customers.map(entry => {
        const customerName = entry.first_name + ' ' + entry.last_name
        return Object.assign(customerName)
        })
      },
      todaysDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<10){
          month = "0" + month;
        }
        var day = date.getDate();
        if (day < 10){
          day = "0" + day;
        }
        return  year + "-" + month + "-" + day;
      }      
    },
    methods:{
      submit () {
        this.newAppointment = {
          date: this.date,
          description: this.description,
          customers_id: this.customerId,
          pets_id:this.petId,
          appointment_type_id: this.appointmentId
        }
        console.log(this.newAppointment)
        this.axios
          .post('http://localhost:3200/appointments/create', this.newAppointment)
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
          this.$router.push('/')
      },
    },
  watch: {
      search (val) {
       if (this.names.length > 0) return
        this.isLoading = true
        this.axios.get('http://localhost:3200/customers')
          .then(res => {
            this.customers = res.data
        })
      .finally(() => (this.isLoading = false))
      },
      selectedName () {
        for(var i=0;i<this.customers.length;i++) {
          if(this.selectedName == (this.customers[i].first_name + " " + this.customers[i].last_name)) {
            this.customerId = this.customers[i].id
          }
        }
      }
    },
  mounted () { 
      this.axios.get('http://localhost:3200/pets/all')
        .then(res => {
          this.pets = res.data
          for(var i = 0; i<this.pets.length; i++) {
              var pet = { value: this.pets[i].id, text: this.pets[i].name}
            this.allPets.push(pet);
            }                 
        }) 
      this.axios.get('http://localhost:3200/appointments/types')
        .then(res => {
          this.appointments = res.data
          for(var i = 0; i<this.appointments.length; i++) {
              var appointment = { value: this.appointments[i].id, text: this.appointments[i].title}
            this.allAppointments.push(appointment);
            }                 
        })                                
        .catch(err => {
            console.log(err)
        })
    }
  }
</script>

<style>
.app {
  border: 1px solid black;
}
</style>