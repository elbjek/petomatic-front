<template>
  <v-container>
    <div class="goback" style="display:flex; justify-content:space-between; align-items:center">
      <h3>Edit pet</h3>
      <v-btn flat to="/">x</v-btn>
    </div>    
 
      <v-form v-on:submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
        <v-autocomplete 
        color="pink"
          v-model="selectedName"
          :items="names"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="customerName"
          item-value="API"
          label="Owner name"
          placeholder="Start typing to Search"
          return-object
          aria-required
          :rules="[v => !!v || 'Item is required']"
        ></v-autocomplete>      
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
              label="Date of birth"
              readonly
            ></v-text-field>
            <v-date-picker color="pink" v-model="date" :min="todaysDate" @input="$refs.menu.save(date)"></v-date-picker>
          </v-menu>
        </v-flex>
        ›
        <v-text-field
          v-model="petName"
          label="Pet name"
          :rules="[v => !!v || 'Item is required']">
        </v-text-field>

        <v-select
        v-model="breedId"
        :items="allBreeds"
        :rules="[v => !!v || 'Item is required']"
        label="Breed"
        required
        value:breedId
        seleced
        ></v-select>
        
        <v-select
        v-model="genderId"
        :items="allGenders"
        :rules="[v => !!v || 'Item is required']"
        label="Gender"
        required
        ></v-select>
        <v-select
        v-model="speciesId"
        :items="allSpecies"
        :rules="[v => !!v || 'Item is required']"
        label="Species"
        required
        ></v-select>    
        <v-btn color="orange" @click="submit">submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
    name:'editpet',
  data: () => ({
    valid: true,
    petName:'',
    customers: [],
    customerId: null,
    breeds :[],
    allBreeds: [],
    breedId: null,
    genders:[],
    allGenders:[],
    genderId:null,
    species:[],
    allSpecies:[],
    speciesId:null,
    isLoading: false,
    selectedName: "Sample name",
    search: null,
    select: null,
    newPet:{},
    date:null,
    menu: false,
    allPets:[]
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
        this.newPet = {
          name:this.petName,
          breed_id:this.breedId,
          sex_id:this.genderId,
          species_id:this.speciesId,
          customers_id: this.customerId,
          date_of_birth: this.date
        }
        this.axios
        .post('http://localhost:3200/pets/edit/' + this.$route.params.clientId, this.newPet)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
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
},
  mounted () {
      this.axios.get('http://localhost:3200/pets/breed')
        .then(res => {
            this.breeds = res.data
            for(var i = 0; i<this.breeds.length; i++) {
              var breed = { value: this.breeds[i].id, text: this.breeds[i].breed}
              this.allBreeds.push(breed);
            }            
        })   
      this.axios.get('http://localhost:3200/pets/sex')
        .then(res => {
            this.genders = res.data
              for(var i = 0; i<this.genders.length; i++) {
                var gender = { value: this.genders[i].id, text: this.genders[i].gender}
              this.allGenders.push(gender);
            }   
        }) 
      this.axios.get('http://localhost:3200/pets/species')
        .then(res => {
            this.species = res.data
              for(var i = 0; i<this.species.length; i++) {
                var specie = { value: this.species[i].id, text: this.species[i].species}
              this.allSpecies.push(specie);
            }             
        })
      this.axios.get('http://localhost:3200/pets/')
        .then(res => {
            this.allPets = res.data
              for(var i = 0; i<this.allPets.length; i++) {
        
                this.petName = this.allPets[i].name,
                this.breedId = this.allPets[i].breed_id,
                this.genderId = this.allPets[i].sex_id,
                this.speciesId = this.allPets[i].species_id,
                this.customerId = this.allPets[i].customers_id,
                this.date = this.allPets[i].date_of_birth
              }
        })     
        .catch(err => {
            console.log(err)
        })
    },
  
  }
</script>

<style>
.app {
  border: 1px solid black;
}
</style>