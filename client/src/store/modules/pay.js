import { addOrder, getOrder } from "@/api/pay";
// import { i } from "vite/dist/node/types.d-aGj9QkWt";

export const orders = {
  state: {
    orderProducts: [],
  },
  mutations: {
    orderItem: (state, payload) => {
      state.orderProducts.push(payload);
    },
    getOrderItem: (state, payload) => {
      state.orderProducts = payload;
    },
  },
  actions: {
    postOrder: async ({ commit }, data) => {
      const response = await addOrder(data);
      commit("orderItem", response);
    },
    getOrders: async ({ commit }, id) => {
      const response = await getOrder(id);
      commit("getOrderItem", response);
    },
  },
};
