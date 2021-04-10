<template>
  <form class="form">
    <div class="div1" id="app" data-app>
      <label class="label">ADD NEW LOT</label>
      <div class="div2">
        <v-select
          v-model="selectedPart"
          placeholder="select name of part"
          :items="getAllParts"
          :item-text="'name'"
          :item-value="'id'"
          name="getAllParts"
          label="Part name"
          return-object
          @change="changePart"
          required
          :error-messages="selectedPartErrors"
          @input="$v.selectedPart.$touch()"
          @blur="$v.selectedPart.$touch()"
        ></v-select>
        <v-text-field v-model="description" label="Description"></v-text-field>
        <v-text-field
          type="number"
          v-model="price"
          label="Desired price"
          suffix="$"
          required
          :error-messages="priceErrors"
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
        ></v-text-field>
        <v-text-field
          type="number"
          min="1"
          step="1"
          v-model="quantity"
          label="Quantity"
          required
          :error-messages="quantityErrors"
          @input="$v.quantity.$touch()"
          @blur="$v.quantity.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="expirationTime"
          type="datetime-local"
          label="Expiration Time"
          required
          :error-messages="expirationTimeErrors"
          @input="$v.expirationTime.$touch()"
          @blur="$v.expirationTime.$touch()"
        ></v-text-field>
      </div>
      <div class="div3">
        <v-btn class="clear" @click="clear"> clear </v-btn>
        <v-btn class="submit" :disabled="this.$v.$invalid" @click="submit()">
          add
        </v-btn>
      </div>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapGetters, mapMutations } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    selectedPart: { required },
    price: { required, minValue: minValue(1) },
    quantity: { required, minValue: minValue(1) },
    expirationTime: { required }
  },

  data: () => ({
    selectedPart: "",
    description: "",
    quantity: "",
    price: "",
    expirationTime: "",
    nowData: ""
  }),

  computed: {
    ...mapGetters(["getAllParts"]),
    selectedPartErrors() {
      const errors = [];
      if (!this.$v.selectedPart.$dirty) return errors;
      !this.$v.selectedPart.required && errors.push("Part name is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.minValue && errors.push("Price must be at least 1");
      !this.$v.price.required && errors.push("Price is required.");
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.minValue && errors.push("Quantity must be at least 1");
      !this.$v.quantity.required && errors.push("Quantity is required.");
      return errors;
    },
    expirationTimeErrors() {
      const errors = [];
      if (!this.$v.expirationTime.$dirty) return errors;
      !this.$v.expirationTime.required &&
        errors.push("Expiration time is required.");
      return errors;
    }
  },

  methods: {
    ...mapMutations(["pushLot"]),
    ...mapGetters(["getAllLots"]),

    changePart() {
      this.description = this.selectedPart.description;
    },

    submit() {
      var d = new Date();
      var loc = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes()
      );
      var now =
        new Date(loc).toJSON().slice(0, 10) +
        " " +
        new Date(loc).toJSON().slice(11, -8);
      this.nowData = now;

      var lots = this.getAllLots();
      var newId = lots.length;
      for (var i = 0; i < lots.length; i++) {
        if (newId === lots[i].id) {
          newId++;
        }
      }
      var t =
        this.expirationTime.substr(0, 10) +
        " " +
        this.expirationTime.substr(11);
      var newLot = {
        id: newId,
        part_id: this.selectedPart.id,
        part_name: this.selectedPart.name,
        part_decstiption: this.description,
        quantity: this.quantity,
        status: "open",
        expirationTime: t,
        timer: t,
        desiredPrice: this.price,
        bid: "",
        image: "",
        nowData: this.nowData
      };
      this.pushLot(newLot);
      this.$router.push("lots");

      alert("New lot for Part name = '" + this.selectedPart.name + "' added!");
    },
    clear() {
      this.$v.$reset();
      this.selectedPart = "";
      this.description = "";
      this.price = "";
      this.quantity = "";
      this.expirationTime = "";
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-self: center;
  height: 100%;
}
.div1 {
  background-color: #e3e3e3;
  width: 60%;
  margin: 5%;
  padding: 4% 0% 4% 0%;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.label {
  margin-top: 5%;
  align-self: center;
  font-size: 30px;
}
.div2 {
  margin-left: 15%;
  margin-top: 3%;
  width: 70%;
  font-size: 15px;
}
.div3 {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.clear {
  background: rgb(239, 133, 140);
  width: 20%;
  margin-bottom: 3%;
  font-size: 15px;
}
.submit {
  background: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(rgb(133, 201, 239)) to(rgb(133, 201, 239))
      color-stop(rgb(133, 201, 239))
  );
  width: 20%;
  margin-bottom: 3%;
  font-size: 15px;
}
</style>
