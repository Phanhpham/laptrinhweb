<template>
  <div class="m-5">
    <div class="bg-white p-5 rounded-lg h-screen">
      <h1 class="font-bold text-[20px]">Manager User</h1>

      <!-- Search bar --->
      <div class="mt-4">
        <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search by username or email"
          class="border p-2 rounded w-full" />
      </div>
      <div>
        <!--- Sort form --->
        <select v-model="selectedSort" @change="handleSort" class="border p-2 rounded w-1/3 mt-2">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">STT</th>
              <th scope="col" class="px-6 py-3">UserName</th>
              <th scope="col" class="px-6 py-3">Address</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="user.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ (currentPage - 1) * usersPerPage + index + 1 }}
              </th>
              <td class="px-6 py-4">
                {{ user.name }}
              </td>
              <td class="px-6 py-4">
                {{ user.address }}
              </td>
              <td class="px-6 py-4">
                {{ user.email }}
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <button :class="[
                    'font-medium border px-2 py-2 rounded-lg w-20',
                    user.status ? 'text-blue-600 bg-blue-200 dark:bg-blue-500 hover:bg-blue-300' : 'text-white bg-red-500 hover:bg-red-600'
                  ]" @click="toggleUserStatus(user.id)">
                    {{ user.status ? "UNBLOCK" : "BLOCK" }}
                  </button>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center mt-6">
    <nav class="inline-flex items-center space-x-2">
        <button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300" >Trước</button>   
        <button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300" v-for="(page) in totalPages" :key="page" @click="changePage(page)">{{ page }}</button>
        <button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Tiếp</button>
    </nav>
</div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const searchQuery = ref("");
const selectedSort = ref("");
const currentPage = ref(1);
const usersPerPage = ref(3); // Chỉ định số người dùng trên mỗi trang là 2

const listUser = computed(() => store.state.user.users);

// Tính toán tổng số trang
const totalPages = computed(() =>
  Math.ceil(listUser.value.length / usersPerPage.value)
);

// Tính toán người dùng được phân trang
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage.value;
  const end = start + usersPerPage.value;
  return listUser.value.slice(start, end);
});



// Tìm kiếm và lọc người dùng
const handleSearch = () => {
  store.dispatch("searchUsers", searchQuery.value);
};

// sap xep ng dung
const handleSort = () => {
  store.dispatch("sortUsers", selectedSort.value);
};

// Dispatch action
onMounted(() => {
  store.dispatch("getUser");
});

// Thay đổi trang
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return; // Không cho phép chuyển tới trang ngoài giới hạn
  currentPage.value = page;
};

// block
const toggleUserStatus = (userId) => {
  const user = store.state.user.users.find((u) => u.id === userId);
  if (user) {
    const newStatus = user.status ? false : true; // Đổi trạng thái từ chặn sang bỏ chặn hoặc ngược lại
    store.dispatch("updateUserStatus", { id: userId, status: newStatus }); // Gọi action để cập nhật trạng thái
  }
};
</script>

<style></style>
