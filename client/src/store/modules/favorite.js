import {
  deleteFavorite,
  getFavoriteProduct,
  postFavoriteProduct,
} from "@/api/favorite";

export const favorite = {
  state: {
    favoriteProducts: [],
  },
  mutations: {
    setFavorite: (state, payload) => {
      state.favoriteProducts = payload;
      console.log(22222, payload);
    },

    postFavorite: (state, payload) => {
      state.favoriteProducts.push(payload);
      console.log(333333, payload);
    },
    deleteFavoriteProduct: (state, payload) => {
      state.favoriteProducts = state.favoriteProducts.filter((item) => item.id !== payload);
      console.log(7777, payload);
    },
  },
  actions: {
    getFavorite: async ({ commit }, id) => {
      const response = await getFavoriteProduct(id);
      console.log(response);

      commit("setFavorite", response);
    },
    postFavorite: async ({ commit }, data) => {
      const response = await postFavoriteProduct(data);
      commit("postFavorite", response);
    },
    deleteFavorite: async ({ commit }, id) => {
      const response = await deleteFavorite(id);
      commit("deleteFavoriteProduct", response);
    },
  },
};
