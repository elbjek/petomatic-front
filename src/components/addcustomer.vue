<template>
  <v-container>
    <div class="goback" style="display:flex; justify-content:space-between; align-items:center">
      <h3>Add new customer</h3>
      <v-btn to="/"><v-icon>close</v-icon></v-btn>
    </div>

  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="first_name"
      :rules="nameRules"
      label="First name"
      required
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      :rules="lastNameRules"
      label="Last name"
      required
    ></v-text-field>

    <v-text-field
      v-model="phone_number"
      :rules="phoneRules"
      label="Phone number"
      required
    ></v-text-field>

    <v-text-field
      v-model="address"
      label="Address"
    ></v-text-field>

    <v-text-field
      v-model="city"
      label="City"
    ></v-text-field>

    <v-text-field
      v-model="state"
      label="State"
    ></v-text-field>
  
        <v-input>
          <input type="file" name="file" id="">
        </v-input>

    <v-btn
      color="orange"
      :disabled="!valid"
      @click="submit"
    >
      Submit
    </v-btn>

  </v-form>

  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    valid: true,
    first_name: '',
    nameRules: [
      v => !!v || 'First name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    last_name: '',
    lastNameRules: [
      v => !!v || 'Last name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    phone_number: '',
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(v) || 'Phone number must be valid',
      v => (v && v.length <= 20) || 'Phone number must be less than 20 characters',
      v => (v && v.length >= 9) || 'Phone number must be at least 9 characters'
    ],
    address: '',
    city: '',
    state: '',
    newCustomer: {}
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.newCustomer = {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number,
          address: this.address,
          city: this.city,
          state: this.state
        }
        // console.log(this.newCustomer)
        this.axios
          .post('http://localhost:3200/customers/create', this.newCustomer)
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.clear()
        this.$router.push('/pet/create')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
.app {
  border: 1px solid black;
}
</style>