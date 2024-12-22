import {
  addToCart,
  changeQuantity,
  deleteCart,
  getCartById,
  updateCartQuantity,
} from "@/api/cart";

export const cartProduct = {
  state: {
    cartProducts: [],
    totalPrices: 0,
  },
  mutations: {
    getCartItem: (state, payload) => {
      state.cartProducts = payload;
    },
    postCart: (state, payload) => {
      state.cartProducts.push(payload);
    },
    changeCart: (state, payload) => {
      console.log(payload);

      const findIndex = state.cartProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (findIndex !== -1) {
        state.cartProducts[findIndex].product.quantity =
          payload.product.quantity;
      }
    },
    updateProduct: (state, payload) => {
      console.log(55555, payload);

      const index = state.cartProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (index !== -1) {
        state.cartProducts[index] = payload;
        state.totalPrices = state.cartProducts.reduce(
          (total, item) => total + item.product.price * item.product.quantity,
          0
        );
      }
    },
    deleteProduct: (state, payload) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
  actions: {
    getCartProduct: async ({ commit }, idUser) => {
      const response = await getCartById(idUser);
      commit("getCartItem", response);
    },
    addToCarts: async ({ commit }, cart) => {
      const response = await addToCart(cart);
      commit("postCart", response);
    },
    updateCart: async ({ commit }, cart) => {
      const response = await updateCartQuantity(cart);
      commit("changeCart", response);
    },
    updateProductQuantity: async ({ commit }, { itemId, quantity }) => {
      const response = await changeQuantity({ itemId, quantity });
      commit("updateProduct", response);
    },
    deleteCartProduct: async ({ commit }, id) => {
      const response = await deleteCart(id);
      commit("deleteProduct", response);
    },
    clearCart: ({ commit }) => {
      commit("clearCart");
    },
  },
};
