
<template>
  <div class="content" id="app" data-app>
    <div class="form">
      <h1>EDIT USER INFORMATION</h1>
      <p>
        Please note that if you made a bet with old data and then changed it, we
        will receive update data. However, according to your company's policy,
        if we are unable to contact you when you win the auction, you will
        receive a point. Upon reaching 3 points, you will be blocked on this.
      </p>
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="20"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="company"
          :error-messages="companyErrors"
          :counter="15"
          label="Company"
          required
          @input="$v.company.$touch()"
          @blur="$v.company.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          :error-messages="phoneErrors"
          :counter="20"
          label="Corp.number"
          placeholder="375290000000"
          required
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
        ></v-text-field>
        <div class="button">
          <v-btn @click="clear"> cancel </v-btn>
          <v-btn class="mr-4" :disabled="this.$v.$invalid" @click="submit">
            save
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapGetters, mapMutations } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  alphaNum,
  numeric,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      alphaNum,
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
    email: { required, email },
    company: { required, maxLength: maxLength(15) },
    phone: { required, numeric, maxLength: maxLength(20) },
  },
  data: () => ({
    name: "",
    email: "",
    company: "",
    phone: "",
  }),
  created() {
    this.name = this.$store.getters.getLoggedUser.name;
    this.email = this.$store.getters.getLoggedUser.email;
    this.company = this.$store.getters.getLoggedUser.company;
    this.phone = this.$store.getters.getLoggedUser.phone;
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.minLength &&
        errors.push("Name must be at least 3 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      !this.$v.name.alphaNum &&
        errors.push("Please enter alphabet characters (numerics)");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    companyErrors() {
      const errors = [];
      if (!this.$v.company.$dirty) return errors;
      !this.$v.company.maxLength &&
        errors.push("Company name must be at most 15 characters long");
      !this.$v.company.required && errors.push("Company is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength &&
        errors.push("Number must be at most 20 characters long");
      !this.$v.phone.required && errors.push("Number is required.");
      !this.$v.phone.numeric && errors.push("Please enter only numerics.");
      return errors;
    },
  },
  methods: {
    ...mapMutations(["updateLoggedUser"]),
    submit() {
      var user = {
        id: this.getLoggedUser.id,
        name: this.name,
        email: this.email,
        company: this.company,
        phone: this.phone,
      };
      this.updateLoggedUser(user);
      this.$router.push("lots");
    },
    clear() {
      this.$v.$reset();
      this.$router.push("lots");
    },
  },
};
</script>

<style scoped>
.content {
  width: 45%;
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  float: left;
  margin: 0% 0% 5% 5%;
}
.content h1 {
  margin-top: 50px;
  text-align: center;
  padding: 0% 0% 5% 0%;
}
.form {
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5% 0 5%;
  text-align: justify;
  margin-top: 50px;
}
form {
  margin-bottom: 50px;
  margin-top: 50px;
}
.button {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
