<template>
  <div class="bg-gray-100">
    <div class="container mx-auto p-6 max-w-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Checkout
      </h2>
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Thông tin người mua -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700">
            Billing Information
          </h3>
          <form action="#">
            <label class="block mt-3">
              <span class="text-gray-600">Full Name</span>
              <input
                type="text"
                class="block w-full mt-1 px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Your name"
                v-model="user.name"
              />
            </label>
            <label class="block mt-3">
              <span class="text-gray-600">Email</span>
              <input
                type="email"
                class="block w-full mt-1 px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="your.email@example.com"
                v-model="user.email"
              />
            </label>
            <label class="block mt-3">
              <span class="text-gray-600">Phone Number</span>
              <input
                type="tel"
                class="block w-full mt-1 px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="0123456789"
                v-model="inputValue.phone"
              />
            </label>
            <label class="block mt-3">
              <span class="text-gray-600">Address</span>
              <input
                type="text"
                class="block w-full mt-1 px-4 py-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Your address"
                v-model="inputValue.address"
              />
            </label>
          </form>
        </div>

        <!-- Phương thức thanh toán -->
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-700">Payment Method</h3>
          <div class="mt-2 space-y-2">
            <label class="flex items-center">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                class="form-radio text-blue-500"
                v-model="inputValue.payment"
              />
              <span class="ml-2 text-gray-600">Credit Card</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="payment"
                value="payPal"
                class="form-radio text-blue-500"
                v-model="inputValue.payment"
              />
              <span class="ml-2 text-gray-600">PayPal</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="payment"
                value="bankTransfer"
                class="form-radio text-blue-500"
                v-model="inputValue.payment"
              />
              <span class="ml-2 text-gray-600">Bank Transfer</span>
            </label>
          </div>
        </div>

        <!-- Thông tin đơn hàng -->
        <div class="border-t border-gray-200 pt-4">
          <h3 class="text-lg font-semibold text-gray-700">Order Summary</h3>
          <div class="mt-4 space-y-2">
            <div
              class="flex justify-between"
              v-for="cart in listCart"
              :key="cart.id"
            >
              <span>{{ cart.product.name }}</span>
              <span>{{ formatPrice(cart.product.price) }}</span>
            </div>

            <div
              class="flex justify-between font-semibold text-gray-800 border-t border-gray-200 pt-2"
            >
              <span>Total</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>
        </div>

        <!-- Nút thanh toán -->
        <div class="mt-6">
          <button
            @click="handleOrder"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const { id } = route.params;
const router = useRouter();
console.log(33333, id);
const user = reactive(JSON.parse(localStorage.getItem("account")) || {})

const listCart = computed(() => store.state.cart.cartProducts);
console.log(33333, listCart);

const totalPrice = computed(() => {
  const total = listCart.value.reduce((total, item) => {
    return total + item.product.price * item.product.quantity;
  }, 0);
  return total;
});

onMounted(() => {
  if (id) {
    store.dispatch("getCartProduct", Number(id));
  }
});

const inputValue = reactive({
  phone: "",
  address: "",
  payment: "",
});

const store = useStore();
const handleOrder = () => {
  const newOrder = {
    idUser: Number(id),
    name: user.name,
    email: user.email,
    phone: inputValue.phone,
    address: inputValue.address,
    paymentBy: inputValue.payment,
    orderAt: new Date(),
    orderDetail: listCart.value,
    totalPrice: totalPrice.value,
  };
  store.dispatch("postOrder", newOrder);
  alert("Dat hang thanh cong");
  router.push("/");
};

// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<style></style>
