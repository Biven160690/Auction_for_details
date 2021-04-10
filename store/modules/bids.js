export default {
  state: {
    bids: [],
    bidQuantity: ""
  },

  mutations: {
    addBid(state, newBid) {
      return state.bids.push(newBid);
    },
    minBidSearch(state, lot) {
      let arr = [];
      let bid_on_id = state.bids.filter(id => id.lot_id === lot.id);
      for (let i = 0; i < bid_on_id.length; i++) {
        arr.push(bid_on_id[i].bid_price);
      }
      let min_Bid = Math.min(...arr);
      lot.bid = min_Bid;
      state.bidQuantity = bid_on_id.length;
    },
    bidQuantity(state, lot) {
      let bid = state.bids.filter(id => id.lot_id === lot.id);
      let quant = bid.length;
      state.bidQuantity = quant;
    }
  },

  getters: {
    getAllBids(state) {
      return state.bids;
    },
    getbidQuantity(state) {
      return state.bidQuantity;
    }
  }
};
