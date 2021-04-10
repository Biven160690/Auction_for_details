<template>
  <div class="container">
    <div class="lot" v-for="lot in getAllLots" :key="lot.id">
      <div class="frame img">
        <h2>{{ lot.part_name }}</h2>
        <a><img :src="lot.image" alt="parms" class="img" /> </a>
        <div class="data_lot">
          <h4>ID:{{ lot.id }}</h4>
          <h4>QUANTITY:{{ lot.quantity }}</h4>
          <h4>DESIRED PRICE:{{ lot.desiredPrice }}</h4>
          <h4>EXPIRATION TIME:{{ lot.expirationTime }}</h4>
          <h4>STATUS:{{ lot.status }}</h4>
        </div>
      </div>
      <div class="price">
        <div class="timer">
          <h3>TIME LIFE:</h3>
          <h3><timer v-bind:deadline="lot.timer"> </timer></h3>
        </div>
        <div class="curret_bid">
          <h3 v-if="isUserLogged">CURRENT BID: {{ lot.bid }} $</h3>
          <div class="button">
            <v-btn
              elevation="6"
              x-large
              color="#B0E0E6"
              @click="moreInfo(lot.id)"
              >MORE INFO</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timer from "@/components/timer.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAllLots", "isUserLogged"])
  },
  components: {
    timer
  },
  methods: {
    moreInfo(id) {
      this.$router.push("lots/" + id);
    }
  }
};
</script>

<style scoped>
.price {
  display: flex;
  flex-direction: column;
  padding: 0px 20px 0px 0px;
}
.curret_bid {
  padding: 0px 0px 0px 170px;
  margin: 0px 0px 0px 100px;
}
.timer {
  padding: 0px 0px 0px 220px;
  font-size: 120%;
  display: flex;
}
.button {
  display: flex;
  justify-content: flex-end;
  padding: 30px 0px 0px 0px;
  margin: 20px 20px 0px 0px;
}
.lot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e3e3e3;
  border-radius: 10px;
  padding: 5px;
  margin: 10px 5px 25px 15px;
  box-shadow: 5px 5px 5px 5px rgb(94, 87, 87);
}
.frame img {
  border: 2px solid #121313;
  border-radius: 5px;
  width: 178px;
  height: 190px;
  box-shadow: 3px 3px 3px 3px rgb(189, 180, 180);
}
.img {
  float: left;
  margin: 15px 7px 3px 3px;
  padding: 0px 0px 0px 0px;
}
.frame h2 {
  font-size: 250%;
  font-weight: normal;
  margin: -10px 0px 0px 0px;
}
.data_lot {
  float: left;
  padding: 25px 0px 15px 10px;
  font-size: 18px;
  line-height: 1.9;
}
</style>
