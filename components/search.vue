<template>
  <div class="search" id="app" data-app>
    <div class="auctions">
      <h1>AUCTIONS</h1>
    </div>
    <div class="data">
      <v-select
        v-model="status"
        :items="getAddStatuses"
        :menu-props="{ up: true, offsetY: true }"
        label="Status"
        @click="dataForSearch"
      ></v-select>
    </div>
    <div class="data">
      <v-select
        v-model="name"
        :items="getAddNames"
        :menu-props="{ up: true, offsetY: true }"
        label="Part name"
        @click="dataForSearch"
      ></v-select>
    </div>
    <div id="but">
      <v-btn color="#B0E0E6" @click="search" class="button">Search</v-btn>
      <v-btn color="#d9dbdb" @click="clear" class="button">Clear</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAddStatuses", "getAddNames"])
  },
  data: () => ({
    name: "",
    status: ""
  }),
  methods: {
    ...mapMutations(["lotFilter", "deleteSearchParameters", "dataForSearch"]),
    search() {
      var optionsSearch = {
        status: this.status,
        name: this.name
      };
      this.lotFilter(optionsSearch);
      this.name = this.status = "";
    },
    clear() {
      (this.name = this.status = ""), this.deleteSearchParameters();
    }
  },
  created() {
    this.deleteSearchParameters();
  }
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: space-around;
}
.data {
  display: flex;
  justify-content: space-around;
  width: 30%;
  padding-bottom: 10px;
  margin: 37px 0px 0px 0px;
}
.auctions {
  padding: 35px 20px 0px 40px;
}
#but {
  margin-top: 50px;
}
</style>
