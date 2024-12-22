<template>
  <div class="m-5">
    <!-- Form sửa sản phẩm chỉ hiển thị khi có sản phẩm được chọn để chỉnh sửa -->
    <div v-if="isOpenEdit" class="bg-white p-5 rounded-lg mb-5">
      <h2 class="font-bold text-[20px] mb-4">Edit Product</h2>
      <form @submit.prevent="updateProduct" class="mb-5">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
            >Product Name</label
          >
          <input
            type="text"
            v-model="selectedProduct.name"
            id="name"
            placeholder="Enter product name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image"
            >Product Image</label
          >
          <input
            type="text"
            v-model="selectedProduct.image"
            id="image"
            placeholder="Enter image URL"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price"
            >Price</label
          >
          <input
            type="number"
            v-model="selectedProduct.price"
            id="price"
            placeholder="Enter product price"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="category"
            >Category</label
          >
          <input
            type="text"
            v-model="selectedProduct.category"
            id="category"
            placeholder="Enter product category"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="category"
            >Quantity</label
          >
          <input
            type="text"
            v-model="selectedProduct.quantity"
            id="quantity"
            placeholder="Enter product quantity"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Product
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
    <!--modal them-->
    <div v-if="isOpen" class="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Thêm sản phẩm mới</h2>

    <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Tên sản phẩm -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input v-model="inputValue.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên sản phẩm">
            <p class="text-red-500 text-[14px]">{{ error.name }}</p>
        </div>

        <!-- Giá sản phẩm -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá</label>
            <input v-model="inputValue.price" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập giá sản phẩm" min="1">

        </div>

        <!-- Danh mục -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="inputValue.category" >
                <option>Chọn danh mục</option>
                <option  v-for="item in listCategories" :key="item.id">{{ item.name }}</option>
            
            </select>
            <p class="text-red-500 text-[14px]">{{ error.category }}</p>

        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">So luong</label>
            <input v-model="inputValue.quantity" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập giá sản phẩm" min="1">
        </div>

        <!-- Hình ảnh sản phẩm -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <input v-model="inputValue.image" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <p class="text-red-500 text-[14px]">{{ error.image }}</p>

        </div>

        <!-- Nút Thêm sản phẩm -->
        <div class="pt-4">
            <button type="submit" class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Thêm sản phẩm</button>
        </div>
    </form>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="bg-white p-5 rounded-lg h-screen">
      <div class="flex justify-between">
        <div>
          <h1 class="font-bold text-[20px]">Manager Product</h1><br>
          <!--add product-->
          <button @click="handleClick" class="bg-red-400 rounded h-10 w-52 text-white">
            Them san pham
          </button>


        </div>

        <div class="flex gap-6">
          <!--Search-->
          <input
            v-model="searchQueryItem"
            @input="handleSearchItem"
            type="text"
            placeholder="tim kiem"
          />
          <!--sort-->

          <select
            class="boder-2 rounded"
            v-model="selecteSortPrice"
            @change="handlePrice"
          >
            <option value="asc">Tang dan</option>
            <option value="desc">Giam dan</option>
          </select>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">STT</th>
              <th scope="col" class="px-6 py-3">Product Name</th>
              <th scope="col" class="px-6 py-3">Image</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in paginatedProducts"
              :key="product.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ (currentPage - 1) * productsPerPage + index + 1}}
              </th>
              <td class="px-6 py-4">{{ product.name }}</td>
              <td class="px-6 py-4">
                <img class="w-10" :src="product.image" :alt="product.name" />
              </td>
              <td class="px-6 py-4">{{ formatPrice(product.price) }}</td>
              <td class="px-6 py-4">{{ product.category }}</td>
              <td class="px-6 py-4">{{ product.quantity }}</td>

              <td class="px-6 py-4 flex gap-3">
                <button
                  @click.prevent="editProduct(product)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  @click.prevent="deleteProduct(product.id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="flex items-center justify-center mt-6">
        <nav class="inline-flex items-center space-x-2">
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Trước
          </button>
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Tiếp
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.state.product.products);
const listCategories=computed(()=>store.state.category.categoriesItem)
const selectedProduct = ref(null);
const selecteSortPrice = ref("");
const searchQueryItem = ref("");
const productsPerPage = ref(4);
const currentPage=ref(1);
const isOpen=ref(false);

const inputValue = reactive({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: ""
})

const error = reactive({
  name: "",
  category: "",
  image: "",
})

const reset = () => {
  inputValue.name = "",
  inputValue.price = "";
  inputValue.quantity = "";
  inputValue.category = "";
  inputValue.image = ""
}

const handleClick=()=>{
    isOpen.value=true;
}
// Tính toán tổng số trang
const totalPages = computed(() =>
  Math.ceil(products.value.length / productsPerPage.value)
);

// Tính toán người dùng được phân trang
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value;
  const end = start + productsPerPage.value;
  return products.value.slice(start, end);
});
// Thay đổi trang
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return; // Không cho phép chuyển tới trang ngoài giới hạn
  currentPage.value = page;
};
//tim kiem
const handleSearchItem = () => {
  store.dispatch("searchProduct", searchQueryItem.value);
};
//sap xep
const handlePrice = () => {
  store.dispatch("sortPrice", selecteSortPrice.value);
};
console.log(111, products);
onMounted(() => {
  store.dispatch("getProduct");
  store.dispatch("getCategory")
});
//mo form
const isOpenEdit = ref(false);
const editProduct = (product) => {
  isOpenEdit.value = true;
  selectedProduct.value = product;
};
//dong form
const cancelEdit = () => {
  isOpenEdit.value = false;
};
//update form
const updateProduct = () => {
  const productEdit = {
    ...selectedProduct.value,
    name: selectedProduct.value.name,
    price: selectedProduct.value.price,
    image: selectedProduct.value.image,
    categories: selectedProduct.value.categories,
    quantity: selectedProduct.value.quantity,
  };
  store.dispatch("updateProduct");
  cancelEdit();
};

//close form
const deleteProduct = (id) => {
  store.dispatch("deleteProducts", id);
};

const handleSubmit = () => {
    if(!inputValue.name){
      error.name = "Ten san pham khong duoc de trong"
    }else{
      error.name = ""
    }

    if(!inputValue.category){
      error.category = "Vui lòng chọn danh mục"
    }else{
      error.category = ""
    }

    if(!inputValue.image){
      error.image = "Vui lòng nhập hình ảnh"
    }else{
      error.image = ""
    }

    if(!error.name && !error.category && !error.image){
      const newProduct = {
        name: inputValue.name,
        price: inputValue.price,
        category: inputValue.category,
        image: inputValue.image,
        quantity: inputValue.quantity
      }
      store.dispatch("addProduct", newProduct);
      isOpen.value = false
      reset()
    }
}
// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<style></style>
