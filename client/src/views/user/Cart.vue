<template>
  <div>
    <Header />
    <div class="min-h-screen bg-gray-100 p-6">
      <!-- Title -->
      <h2 class="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>

      <!-- Cart Container -->
      <div class="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <!-- Cart Items -->
        <div class="space-y-4 mb-6">
          <!-- Example Item 1 -->
          <div
            v-for="cart in listCart"
            :key="cart.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <div class="flex items-center space-x-4">
              <img
                :src="cart.product.image"
                alt="Cat Food"
                class="w-16 h-16 rounded-lg"
              />
              <div>
                <h3 class="text-lg font-semibold">{{ cart.product.name }}</h3>
                <p class="text-gray-600">{{ formatPrice(cart.product.price) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="
                  handleQuantityChange(cart.id, cart.product.quantity - 1)
                "
              >
                -
              </button>
              <span>{{ cart.product.quantity }}</span>
              <button
                @click="
                  handleQuantityChange(cart.id, cart.product.quantity + 1)
                "
              >
                +
              </button>
              <p class="text-lg font-bold text-gray-800">
                {{ formatPrice(cart.product.price * cart.product.quantity) }} 
              </p>
              <button
                @click="handleDelete(cart.id)"
                class="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>

          <div class="flex justify-between">
            <div></div>
            <button
              @click="handleDeleteAll"
              class="bg-red-400 rounded w-20 h-10 text-white ml-96"
            >
              Delete All
            </button>
          </div>
        </div>

        <!-- Summary Section -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
          <div
            class="flex justify-between text-lg font-bold border-t border-gray-300 pt-2"
          >
            <span>Total</span>
            <span>{{formatPrice(totalPrice) }} </span>
          </div>
          <button
            @click="handleClick(user.id)"
            class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/user/Header.vue";
import Footer from "@/layouts/user/Footer.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const store = useStore();
const user = reactive(JSON.parse(localStorage.getItem("account")) || [])

const route = useRoute();
const router = useRouter()
const { id } = route.params;



// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// delete
const handleDelete = (id) => {
  
    store.dispatch("deleteCartProduct", id);
};
// delete all
const handleDeleteAll = () => {
  const isDeleteAll = Array.from(listCart.value);
  isDeleteAll.map((item) => {
    store.dispatch("deleteCartProduct", item.id);

  })
}

const listCart = computed(() => store.state.cart.cartProducts);
const totalPrice = computed(() => {
  const total = listCart.value.reduce((total, item) => {
    return total + item.product.price * item.product.quantity;
  }, 0);
  return total;
});
console.log(12344, listCart);

onMounted(() => {
  if (id) {
    store.dispatch("getCartProduct", Number(id));
  }
});

const handleQuantityChange = (itemId, newQuantity) => {
  if (newQuantity < 1)  {
    let confirmDelete=confirm("ban co chac chan muon xoa ko ? ")
     console.log(1111,confirmDelete);
    if(confirmDelete){
      store.dispatch("deleteCartProduct",itemId)
    }
    return;
  }


  store.dispatch("updateProductQuantity", { itemId, quantity: newQuantity });
 
};

const handleClick = (id) => {
  router.push(`/payment/${id}`)
}
</script>

<style></style>
