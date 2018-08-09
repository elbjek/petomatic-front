<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-space-around>
          <v-flex xs3 v-for="appointment in appointments" :key="appointment.id" >
            <v-card color="blue"   >
              <v-card-title primary-title class="appointment white--text">
                <h2 >{{appointment.date}}</h2>
                <p >{{appointment.first_name}} {{appointment.last_name}}</p>
                <p>{{appointment.description}}</p>
              </v-card-title>
            </v-card>
          </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      appointments: '',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      allAppointments:''
    }
  },
  computed:{
  },
  mounted () {
      this.axios.get('http://localhost:3200/appointments/all')
        .then(res => {
          this.appointments = res.data
        }) 
  }
}
</script>

<style>
h2{
  text-align: left;
  width:100%;
  /* margin:10px 0px; */
  font-size: 15px
}
p:first-of-type{
  font-weight: lighter;
  font-size: 25px;
}
p{
  margin:0px;
  font-weight: bolder;
  text-align: left;
}
</style>