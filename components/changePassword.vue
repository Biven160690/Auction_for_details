
<template>
  <div class="content">
    <div class="form">
      <h1>CHANGE PASSWORD</h1>
      <form>
        <v-text-field
          v-model="passw"
          :counter="16"
          :type="'password'"
          label="Old password"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :disabled="this.$v.passw.$invalid"
          :error-messages="passwordErrors"
          :counter="16"
          :type="'password'"
          label="New password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-text-field
           v-model="repeatPassword"
          :disabled="this.$v.password.$invalid"
          :error-messages="repeatPasswordErrors"
          :counter="16"
          :type="'password'"
          label="Repeat new password"
          required
          @input="$v.repeatPassword.$touch()"
          @blur="$v.repeatPassword.$touch()"
        ></v-text-field>
        <div class="button">
          <v-btn @click="clear"> clear </v-btn>
          <v-btn class="mr-4" :disabled="this.$v.passw.$invalid" @click="submit">
            submit
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
  sameAs,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      passw: "",
      userPasswFromStore: "",
      password: "",
      repeatPassword: "",
    };
  },
  created() {
    this.userPasswFromStore = this.$store.getters.getLoggedUser.passw;
  },
  validations: {
    passw: {
      required,
      sameAsPassw: sameAs("userPasswFromStore"),
    },
    password: { required, minLength: minLength(5), maxLength: maxLength(16) },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 16 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAs &&
       errors.push("Passwords must be identical.");
    },
  },
  methods: {
    ...mapMutations(["updateLoggedUserPassword"]),
    submit() {
      if ( this.passw === this.userPasswFromStore) {
      if (this.password === this.repeatPassword
      && this.password.length > 4) {
        var user = {
        id: this.getLoggedUser.id,
        passw: this.password,
        }
        alert("password changed successfully");
        this.updateLoggedUserPassword(user);
        this.$router.push("lots");
      } else {
        return alert('Wrong  or not filled "New password" form');
      }
       } else {
        return alert('Wrong old password');
    };
  },
    clear() {
      this.$v.$reset();
      this.passw = "";
      this.password = "";
      this.repeatPassword = "";
    },
  },
};
</script>
<style scoped>
.content {
  width: 37%;
  justify-content: center;
  margin-top: 50px;
  float: right;
  margin: 0% 5% 0% 0%;
}
.content h1 {
  margin-top: 50px;
}
.form {
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  padding: 0 5% 0 5%;
}
form {
  margin-bottom: 50px;
  margin-top: 50px;
}
.link {
  text-decoration: none;
  color: #85c9ef;
  border-bottom: 2px solid #85c9ef;
}
.button {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
