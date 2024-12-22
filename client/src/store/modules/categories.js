import { addCategory, deleteCategory, getCategory, searchCategory, updateCategory } from "@/api/categories";

export const categories = {
  state: {
    categoriesItem: [],
  },
  mutations: {
    getCategories: (state, payload) => {
      state.categoriesItem = payload;
      console.log(22222, payload);
    },
    addCategory: (state, payload) => {
      state.categoriesItem.push(payload);
    },
    changeItem: (state, payload) => {
      const findIndex = state.categoriesItem.findIndex(
        (items) => (items.id = payload.id)
      );
      if (findIndex !== -1) {
        state.categoriesItem[findIndex] = payload;
      }
    },
    deleteItem: (state, payload) => {
        state.categoriesItem = state.categoriesItem.filter((item) => item.id !== payload)
    },
    searchItem: (state, payload) => {
        state.categoriesItem = payload
    }
  },
  actions: {
    getCategory: async ({ commit }) => {
      const response = await getCategory();
      console.log(response);

      commit("getCategories", response);
    },
    addCategory: async ({ commit }, category) => {
      const response = await addCategory(category);
      commit("addCategory", response);
    },
    updateCategory: async ({ commit }, category) => {
      const response = await updateCategory(category);
      commit("editCategory", response);
    },
    deleteCategory:async ({commit},id) => {
        const response=await deleteCategory(id);
        commit("deleteItem",response)
    },
    searchCategory: async ({commit}, search) => {
        const response = await searchCategory(search);
        commit("searchItem", response)
    }
  },
};
