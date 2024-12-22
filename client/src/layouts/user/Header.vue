<template>
  <header class="bg-[#1e293b] p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/">
        <div class="text-white text-2xl font-bold flex gap-2">
          <img
            class="w-30 h-10 mb-2"
            src="https://img.freepik.com/premium-vector/pet-shop-cute-puppy-logo-design_680355-30.jpg"
          />
          <div class="mt-1 ml-4">PetShop</div>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="hidden md:flex gap-6">
        <a href="#" class="text-white hover:text-gray-200">Home</a>
        <a href="#" class="text-white hover:text-gray-200">Shop</a>
        <a href="#" class="text-white hover:text-gray-200">Services</a>
        <a href="#" class="text-white hover:text-gray-200">About Us</a>
        <a href="#" class="text-white hover:text-gray-200">Contact</a>
      </nav>

      <!-- Login/Register or Account Dropdown -->
      <div class="flex gap-5 items-center">
        <router-link v-if="!storedAccount" to="/login" class="text-white"
          >Đăng Nhập</router-link
        >

        <div v-else class="relative">
          <div
            @click="toggleDropdown"
            class="flex gap-2 items-center cursor-pointer"
          >
            <i class="fa-solid fa-user" style="color: White"></i>
            <div class="text-white font-medium">{{ storedAccount.name }}</div>
          </div>

          <!-- Dropdown menu -->
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          >
            <ul>
              <li>
                <router-link
                  :to ="`/profile/${user.id}`"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >Profile</router-link
                >
              </li>

              <li>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Search bar and Cart -->
      <div class="flex items-center gap-4">
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchItem"
            @change="handleSearch"
            type="text"
            placeholder="Search for products..."
            class="p-2 rounded-lg w-64"
          />
          <button class="absolute right-2 top-2 text-gray-600">🔍</button>
        </div>

        <!-- Shopping Cart -->
        <div class="relative">
          <button @click="handleClick(user.id)" class="text-white text-xl">
            🛒
          </button>
          <!-- Cart Badge -->
          <span
            class="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-3 h-4 text-center"
          >
            {{ listCart.length }}
          </span>
        </div>
        <div class="relative">
          <button>
            <i
              class="fa fa-heart w-6 text-red-500"
              @click="handleFavorite(storedAccount.id)"
            ></i>
          </button>
          <span
            class="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-3 h-3 text-center"
          >
            {{ listFavoriteById.length }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const userAccount = ref(null);
const dropdownOpen = ref(false);
const router = useRouter();
const user = reactive(JSON.parse(localStorage.getItem("account")) || []);

const listFavoriteById = computed(() => store.state.favorite.favoriteProducts);
const listCart = computed(() => store.state.cart.cartProducts);
console.log(233333, listFavoriteById);

onMounted(() => {
  if (user.id) {
    store.dispatch("getFavorite", user.id);
    store.dispatch("getCartProduct", user.id);
  }
});
//search
const searchItem = ref("");
const handleSearch = () => {
  store.dispatch("searchProduct", searchItem.value);
};
// Lấy dữ liệu từ localStorage khi component được tải
const storedAccount = reactive(
  JSON.parse(localStorage.getItem("account")) || []
);

onMounted(() => {
  if (storedAccount) {
    userAccount.value = storedAccount;
  }
});

// Hàm bật/tắt dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem("account"); // Xóa tài khoản trong localStorage
  userAccount.value = null; // Đặt lại giá trị tài khoản
  router.push("/login"); // Chuyển hướng về trang đăng nhập
};

const handleFavorite = (id) => {
  router.push(`/favorite/${id}`);
};

const handleClick = (id) => {
  router.push(`/cart/${id}`);
};
</script>

<style scoped>
.relative {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 10;
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  color: #333;
  text-align: left;
  text-decoration: none;
  background-color: transparent;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
