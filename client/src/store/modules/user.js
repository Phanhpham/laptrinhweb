import {
  getAllUser,
  getUserDetail,
  searchUser,
  sortUser,
  updateStatus,
} from "@/api/user";

export const users = {
  state: {
    users: [],
    userDetail: null,
  },
  mutations: {
    getAllUser: (state, user) => {
      state.users = user;
    },
    updateStatus: (state, payload) => {
      const findIndex = state.users.findIndex((user) => user.id === payload.id);
      if (findIndex !== -1) {
        state.users[findIndex].status = payload.status;
      }
    },
    searchItem: (state, payload) => {
      state.users = payload;
    },
    sortItem: (state, payload) => {
      state.users = payload;
    },
    getItemDetail: (state, payload) => {
      state.userDetail = payload;
    },
  },
  actions: {
    getUser: async ({ commit }) => {
      const response = await getAllUser();
      commit("getAllUser", response);
    },
    updateUserStatus: async ({ commit }, status) => {
      const response = await updateStatus(status);
      commit("updateStatus", response);
    },
    searchUsers: async ({ commit }, search) => {
      const response = await searchUser(search);
      commit("searchItem", response);
    },
    sortUsers: async ({ commit }, sort) => {
      const response = await sortUser(sort);
      commit("sortItem", response);
    },
    getUserDetail: async ({ commit }, id) => {
      const response = await getUserDetail(id);
      console.log(4444, response);

      commit("getItemDetail", response);
    },
  },
};
