<template>
<v-app>
  <div class="container">
      <div class="page__content">
        <div class="lot_component">
          <h1>LOT ID: {{ lot.id }}</h1>
          <div class="header">
            <h2>{{ lot.part_name }}</h2>
            <h2>STATUS: {{ lot.status }}</h2>
          </div>
          <div class="content">
            <img :src="lot.image" alt="parms" width="180px" height="180px" />
            <p>
              {{ lot.part_decstiption }}
            </p>
          </div>
          <div class="chars">
            <h3>QUANTITY: {{ lot.quantity }}</h3>
            <h3>BIRTH DATE: {{ lot.nowData }}</h3>
            <h3>EXPIRATION TIME: {{ lot.expirationTime }}</h3>
            <h3>DESIRED PRICE: {{ lot.desiredPrice }}$</h3>
          </div>
          <div class="footer">
            <div class="footer__chars">
              <h2 v-if="isLogged">CURRENT BID: {{ lot.bid }}$</h2>
              <h2>TIME LEFT:</h2>
              <h2><timer v-bind:deadline="lot.timer" class="time"> </timer></h2>
            </div>
          </div>
          <div v-if="isLogged && !isUserDreamCar && lot.status == 'open'">
            <bid class="bid"></bid>
          </div>
        </div>
        <div class="bids">
          <div v-if="isLogged">
            <h1>BIDS {{ getbidQuantity }}</h1>
            <div v-for="bid in bids" :key="bid.id">
              <div v-bind:class="[isWinnerBid, bid.style_bid]">
                <h3>COMPANY: {{ bid.user_company }}</h3>
                <div>
                  <h1>BET: {{ bid.bid_price }}$</h1>
                  <h3>{{ bid.date }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bid_error">
              <p>
                In order to see the bids of other participants - log into your
                account
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
  </v-app>
</template>
<script>
import timer from "@/components/timer.vue";
import bid from "@/components/bid.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    timer,
    bid
  },
  methods: {
    ...mapMutations(["updateStatuses", "bidQuantity"]),
  },
  data: () => ({
    lot: [],
    bids: [],
    isLogged: false,
    isUserDreamCar: false
  }),
  computed: {
    ...mapGetters(["getbidQuantity"]),
    isWinnerBid() {
      if (this.lot.status == "closed") {
        let bid = this.bids.filter(bid => bid.bid_price == this.lot.bid);
        for (let i = 0; i < bid.length; i++) {
          bid[i].isWinner = true;
          bid[i].style_bid = "bid_win";
          return bid;
        }
      }
    }
  },
  created() {
    let lots = this.$store.getters.getAllLots;
    let lot = lots.find(lot => lot.id == this.$route.params.id);
    this.lot = lot;
    this.bidQuantity(lot);

    this.isLogged = this.$store.getters.isUserLogged;

    this.isUserDreamCar = this.$store.getters.isUserDreamCar;

    let bids = this.$store.getters.getAllBids;
    let cur_bids = bids.filter(bid => bid.lot_id == this.$route.params.id);
    this.bids = cur_bids;
  },
  beforeUpdate() {
    let bids = this.$store.getters.getAllBids;
    let cur_bids = bids.filter(bid => bid.lot_id == this.$route.params.id);
    this.bids = cur_bids;
    this.updateStatuses();
  }
};
</script>

<style scoped>
.time {
  margin: -35px 0px 0px 140px;
  padding: 0px 0px 0px 0px;
}

.bid {
  margin: -80px 20px 10px 0px;
  padding: 20px 20px 0px 0px;
}
.page__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "initial";
  margin: 5%;
}
.lot_component {
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-top: 20px;
}
.chars {
  margin-top: 20px;
}
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}
button {
  width: 125px;
  height: 30px;
  border-radius: 5px;
  background-color: #85c9ef;
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
  margin-left: 30px;
}
img {
  margin-right: 30px;
}
.bids {
  display: flex;
  flex-direction: column;
  width: 35%;
}
.bid_id {
  background-color: #e3e3e3;
  padding: 10px;
  margin-bottom: 20px;
}
.bid_id div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bid_win {
  background-color: #98f390;
  padding: 10px;
  margin-bottom: 20px;
}

.bid_win div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.bid_error {
  background-color: #e3e3e3;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.bid_error p {
  width: 50%;
  margin: 0 auto;
}
</style>
