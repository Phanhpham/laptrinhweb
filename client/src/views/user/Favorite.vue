<template>
  <div>
    <Header />
    <br>
    <br>
    <br>

    <div class="container mx-auto p-5">
      

      <!-- If there are no favorites -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-center mb-10 text-blue-700">
          Your Favorites
        </h1>
      </div>

      <!-- Display Favorite Products -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
      >
        <div
          v-for="item in listFavorite"
          :key="item.id"
          class="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
        >
          <!-- Product Image -->
          <div class="w-full h-64 rounded-lg overflow-hidden">
            <img
              :src="item.product.image"
              alt="product image"
              class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-lg"
            />
          </div>

          <!-- Remove from Favorites -->
          <button
            class="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>

          <!-- Product Info -->
          <div class="mt-6 text-center">
            <a
              href="#"
              class="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
            >
              {{ item.product.name }}
            </a>
            <p class="text-xl text-gray-500 mt-2">{{ formatPrice(item.product.price) }}</p>
          </div>
          <button @click="handleDelete(item.id)" class="bg-blue-400 rounded w-20 h-10 ml-12">Delete</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from "@/layouts/user/Header.vue";
import Footer from "@/layouts/user/Footer.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();
const {id} = route.params
// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
// delete button
const handleDelete=(id)=>{
    store.dispatch("deleteFavorite", id)
    // window.location.reload()
}
const user = reactive(JSON.parse(localStorage.getItem("account")) || []);

const store = useStore();

const listFavorite = computed(() => store.state.favorite.favoriteProducts);

onMounted(() => {
  if (id) {
    store.dispatch("getFavorite", Number(id));
  }
});
</script>
<style scoped>
.container {
  max-width: 1200px;
}

.group:hover .remove-favorite {
  opacity: 1;
  transform: scale(1.2);
}

.remove-favorite {
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
</style>
