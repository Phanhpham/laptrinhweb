<template>
  <div>
    <Header />
    <br />
    <br />
    <br />
    <div class="container mx-auto p-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <!--Modal-->
        <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">
              Thay Đổi Hình Ảnh
            </h2>
            <form>
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Chọn Hình Ảnh Mới</label
              >
              <input
                type="file"
                accept="image/*"
                @change="onFileChange"
                class="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  @click="closeModal"
                  class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  @click="updateImage"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- Avatar and User Info -->
        <div class="flex items-center mb-6">
          <div v-if="getDetail">
            <button @click="handleOpen">
              <img
                :src="getDetail.image"
                alt="Avatar"
                class="w-24 h-24 rounded-full mr-4"
              />
            </button>
          </div>

          <div v-if="getDetail">
            <h2 class="text-2xl font-semibold">{{ getDetail.name }}</h2>
            <p class="text-gray-600">{{ getDetail.email }}</p>
            <p class="text-gray-600">{{ getDetail.phoneNumber }}</p>
            <p class="text-gray-600">{{ getDetail.address }}</p>
          </div>
        </div>

        <!-- Edit Personal Information -->
        <h3 class="text-xl font-semibold mb-4">Chỉnh sửa thông tin cá nhân</h3>
        <form @submit.prevent="handleSave" v-if="getDetail">
          <div class="mb-4">
            <label class="block text-gray-700">Tên:</label>
            <input
              v-model="getDetail.name"
              type="text"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Nhập tên mới"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email:</label>
            <input
              v-model="getDetail.email"
              type="email"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Nhập email mới"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số điện thoại:</label>
            <input
              v-model="getDetail.phoneNumber"
              type="tel"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Nhập số điện thoại mới"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Địa chỉ:</label>
            <input
              v-model="getDetail.address"
              type="text"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Nhập địa chỉ mới"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Lưu Thay Đổi
          </button>
        </form>

        <!-- Purchase History -->
        <h3 class="text-xl font-semibold mt-6 mb-4">Lịch sử mua hàng</h3>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border">STT</th>
              <th class="py-2 px-4 border">Tên nguoi dat</th>
              <th class="py-2 px-4 border">Tên san pham da dat</th>

              <th class="py-2 px-4 border">Tong tien</th>
              <th class="py-2 px-4 border">Thời gian đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in listOrder" :key="order.id">
              <td class="py-2 px-4 border">{{ index + 1 }}</td>
              <td class="py-2 px-4 border">{{ order.name }}</td>
              <td
                class="py-2 px-4 border flex gap-3"
                v-if="order.orderDetail.length > 0"
              >
                <div v-for="item in order.orderDetail" :key="item.id">
                  <img :src="item.product.image" alt="" />
                </div>
              </td>
              <td class="py-2 px-4 border">
                {{ formatPrice(order.totalPrice) }}
              </td>
              <td class="py-2 px-4 border">{{ order.orderAt }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Logout -->
        <router-link to="/login">
          <div class="mt-6">
            <button
              class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/user/Header.vue";
import Footer from "@/layouts/user/Footer.vue";
import axios from "axios";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase/firebase";

// open image
const isOpen = ref(false);
const handleOpen = () => {
  isOpen.value = true;
};
const downloadURL = ref("");
const images = ref(null);
const onFileChange = async (e) => {
  const image = e.target.files[0];
  images.value = image;

  // Upload anh len firebase
  const storageConference = storageRef(storage, `uploads/${image.name}`);
  await uploadBytes(storageConference, images.value);
  downloadURL.value = await getDownloadURL(storageConference);
  console.log("URL", downloadURL.value);
};
//change image
const updateImage = async () => {
  if (getDetail.value) {
    const update = {
      ...getDetail.value,
      image: downloadURL.value,
    };

    await axios.put(`http://localhost:8080/user/${user.id}`, update);
    localStorage.setItem("account", JSON.stringify(update));
    getDetail.value.image = downloadURL.value;
    isOpen.value = false;
  }
};
// close image
const closeModal = () => {
  isOpen.value = false;
};

// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
// userdetail

const route = useRoute();
const { id } = route.params;
const store = useStore();
const user = JSON.parse(localStorage.getItem("account") || {});
const listOrder = computed(() => store.state.order.orderProducts);
console.log("listOrder", listOrder);
const getDetail = computed(() => store.state.user.userDetail);
console.log(123, getDetail);

onMounted(() => {
  if (id) {
    store.dispatch("getOrders", Number(id));
    store.dispatch("getUserDetail", Number(id));
  }
});
const handleSave = async () => {
  if (getDetail.value) {
    const updateUser = {
      ...getDetail.value,
      name: getDetail.value.name,
      email: getDetail.value.email,
      phoneNumber: getDetail.value.phoneNumber,
      address: getDetail.value.address,
    };
    await axios.put(`http://localhost:8080/user/${user.id}`, updateUser);
    alert("cap nhat thanh cong");
    localStorage.setItem("account", JSON.stringify(updateUser));
  }
};
console.log(user);
</script>

<style></style>
