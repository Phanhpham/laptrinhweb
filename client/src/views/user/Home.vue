<template>
  <div class="container mx-auto p-5">
    <!-- Category Section -->
    <section class="mb-3">
      <h2 class="text-2xl font-bold mb-5">CATEGORIES</h2>
      <div class="flex gap-2">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
          class="w-32 ml-28 bg-blue-400 rounded-lg hover:bg-blue-600 cursor-pointer text-center"
        >
          <p
            class="h-9 font-semibold text-white flex items-center justify-center"
          >
            {{ category.name }}
          </p>
        </div>
      </div>
    </section>
    <!-- Section 2: Chương trình khuyến mãi -->
    <div class="section2">
      <div class="section2-title">
        <span>Chương trình khuyến mãi</span>
      </div>
      <div class="section2-discount">
        <div class="section2-discount-item bg-blue-200">
          <div class="section2-item-content">
            <p>COMBO SÚP THƯỞNG WANPY 10 THANH</p>
            <p>ĐỒNG GIÁ 220K</p>
            <p>Cho đơn hàng tối thiểu 10 sản phẩm</p>
            <p>Hạn sử dụng: KHÔNG GIỚI HẠN</p>
          </div>
          <img
            class="w-10 h-36"
            src="https://i.pinimg.com/564x/61/83/e0/6183e0a41707c7749b22bd73cbc95aa4.jpg"
            alt="Giảm giá"
          />
        </div>
        <div class="section2-discount-item bg-blue-200">
          <div class="section2-item-content">
            <h1>COMBO SÚP THƯỞNG WANPY 10 THANH</h1>
            <p>ĐỒNG GIÁ 220K</p>
            <p>Cho đơn hàng tối thiểu 10 sản phẩm</p>
            <p>Hạn sử dụng: KHÔNG GIỚI HẠN</p>
          </div>
          <img
            src="https://i.pinimg.com/564x/3f/ea/2f/3fea2f8a08e4ac90319088f6b5dc0d9c.jpg"
            alt="Giảm giá"
          />
        </div>
        <div class="section2-discount-item bg-blue-200">
          <div class="section2-item-content">
            <p>GIẢM 2% CHO ĐƠN HÀNG TIẾP THEO</p>
            <p>GIẢM 15% CHO ĐƠN HÀNG TRÊN 1TR</p>
            <p>GIẢM THÊM 5% KHI GIỚI THIỆU BẠN BÈ MUA HÀNG</p>
          </div>
          <img
            src="https://i.pinimg.com/564x/2f/31/71/2f3171056d8a4074bc2c01eebc9a1fb2.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- End Section 2 -->

    <!-- Product Section -->
    <section class="py-10 bg-gradient-to-b from-white to-blue-100">
      <h2 class="text-4xl font-bold text-center text-blue-700 mb-16">
        Our Products
      </h2>
      <div class="flex justify-between p-10">
        <div class="flex w-40 h-10 gap-4">
          <input
            v-model="minPrice"
            class="w-28 border-2 rounded-lg"
            type="text"
            placeholder="Từ"
          />
          <p>-</p>
          <input
            v-model="maxPrice"
            class="w-28 border-2 rounded-lg"
            type="text"
            placeholder="Đến"
          />
        
        </div>
        <div class="flex gap-3 border-2 rounded-lg">
          <select v-model="selectSort" @change="handleSortName">
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select v-model="selectSortPrice" @change="handleSortPrice">
            <option value="asc">Tang dan</option>
            <option value="desc">Giam dan</option>
          </select>
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-4 lg:px-20"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
        >
          <!-- Product Image -->
          <div class="relative w-full h-64 rounded-lg">
            <!-- Heart Icon -->
            <router-link :to="`/detailProduct/${product.id}`">
              <img
                :src="product.image"
                alt="image"
                class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-lg"
              />
            </router-link>

            <i
              @click="handleFavorite(product)"
              class="fa fa-heart text-red-500 absolute top-2 right-2 text-xl cursor-pointer"
            ></i>
            <!-- Overlay for hover effect -->
            <div>
              <button
                @click="addToCart(product)"
                class="text-white bg-blue-400 py-2 px-4 mt-24 ml-7 rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="mt-6 text-center">
            <!-- Use router-link for navigation -->
            <div>
              <h3
                class="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
              >
                {{ product.name }}
              </h3>
            </div>
            <p class="text-xl text-gray-500 mt-2">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Start -->
    <div class="container-fluid py-5">
      <div class="container">
        <div
          class="border-start border-5 border-primary ps-5 mb-5"
          style="max-width: 600px"
        >
          <h6 class="text-primary text-uppercase">Services</h6>
          <h1 class="display-5 text-uppercase mb-0">
            Our Excellent Pet Care Services
          </h1>
        </div>
        <div class="row g-5">
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/75/2a/23/752a239a61b535b1fda5255e0823603b.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Boarding</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/d6/21/af/d621af764d8a43f50756c4150e17e53c.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Feeding</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/07/67/33/0767334e929e2308e35fdf2cc62b4a98.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Grooming</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/e1/34/12/e13412e4fc9aa8d870125ff5308c5048.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Training</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/0d/ac/e1/0dace1d4f851d4c93c22c77bd663176b.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Exercise</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="service-item bg-light d-flex p-4">
              <img
                class="w-20 h-20"
                src="https://i.pinimg.com/564x/ad/2c/d9/ad2cd9d84ae0c0762ca943f1e544f180.jpg"
              />
              <div>
                <h5 class="text-uppercase mb-3">Pet Treatment</h5>
                <p>
                  Kasd dolor no lorem sit tempor at justo rebum rebum stet justo
                  elitr dolor amet sit
                </p>
                <a class="text-primary text-uppercase" href=""
                  >Read More<i class="bi bi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Services End -->

    <!-- Blog Start -->
    <div class="container-fluid py-5">
      <div class="container">
        <div
          class="border-start border-5 border-primary ps-5 mb-5"
          style="max-width: 600px"
        >
          <h6 class="text-primary text-uppercase">Latest Blog</h6>
          <h1 class="display-5 text-uppercase mb-0">
            Latest Articles From Our Blog Post
          </h1>
        </div>
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="blog-item">
              <div class="row g-0 bg-light overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src="https://i.pinimg.com/564x/3e/ba/70/3eba70b7600c637b789ba2f4917de26c.jpg"
                    style="object-fit: cover"
                  />
                </div>
                <div
                  class="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center"
                >
                  <div class="p-4">
                    <div class="d-flex mb-3">
                      <small class="me-3"
                        ><i class="bi bi-bookmarks me-2"></i>Web Design</small
                      >
                      <small
                        ><i class="bi bi-calendar-date me-2"></i>01 Jan,
                        2045</small
                      >
                    </div>
                    <h5 class="text-uppercase mb-3">
                      Dolor sit magna rebum clita rebum dolor
                    </h5>
                    <p>
                      Ipsum sed lorem amet dolor amet duo ipsum amet et dolore
                      est stet tempor eos dolor
                    </p>
                    <a class="text-primary text-uppercase" href=""
                      >Read More<i class="bi bi-chevron-right"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="blog-item">
              <div class="row g-0 bg-light overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src="https://i.pinimg.com/564x/4f/68/ab/4f68abd0c238eb312ab401311cdb7a6a.jpg"
                    style="object-fit: cover"
                  />
                </div>
                <div
                  class="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center"
                >
                  <div class="p-4">
                    <div class="d-flex mb-3">
                      <small class="me-3"
                        ><i class="bi bi-bookmarks me-2"></i>Web Design</small
                      >
                      <small
                        ><i class="bi bi-calendar-date me-2"></i>01 Jan,
                        2045</small
                      >
                    </div>
                    <h5 class="text-uppercase mb-3">
                      Dolor sit magna rebum clita rebum dolor
                    </h5>
                    <p>
                      Ipsum sed lorem amet dolor amet duo ipsum amet et dolore
                      est stet tempor eos dolor
                    </p>
                    <a class="text-primary text-uppercase" href=""
                      >Read More<i class="bi bi-chevron-right"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Blog End -->
  </div>
</template>

<script setup>
import { cartProduct } from "@/store/modules/cart";
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const listProduct = computed(() => store.state.product.products);

const user = reactive(JSON.parse(localStorage.getItem("account")) || []);

onMounted(() => {
  if (user.id) {
    store.dispatch("getCartProduct", user.id);
  }
  store.dispatch("getCategory");
  store.dispatch("getProduct");
});

const categories = computed(() => store.state.category.categoriesItem);
console.log(111, categories);

const products = ref();

const listCart = computed(() => store.state.cart.cartProducts);
console.log(66666, listCart);

// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// filter price
 const minPrice = ref("");
 const maxPrice = ref("");
 const filterProduct= computed(() => listProduct.value);
 console.log("hahaahah", filterProduct.value);
 
 const handleFilter = () => {
   console.log(
     "gia tri nho nhat va lon nhat lan luot la:",
     minPrice.value,
     maxPrice.value
   );
   const filterPrice = filteredProducts.value.filter((product) => {
     const price = product.price;
     return minPrice <= price && price <= maxPrice;
   });
   console.log("filter:", filterPrice);
   
   return filterPrice
 };

// sort name
const selectSort = ref("");
const handleSortName = () => {
  store.dispatch("sortProduct", selectSort.value);
};

// sort price
const selectSortPrice = ref("");
const handleSortPrice = () => {
  store.dispatch("sortPrice", selectSortPrice.value);
};

// favorite
const listFavorite = computed(() => store.state.favorite.favoriteProducts);

const handleFavorite = (product) => {
  const existProduct = listFavorite.value.find(
    (item) => item.product.id === product.id
  );
  if (existProduct) {
    store.dispatch("deleteFavorite", existProduct.id);
  } else {
    const newFavor = {
      idUser: user.id,
      product: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
      },
    };
    store.dispatch("postFavorite", newFavor);
  }
};
// filter product
const selectedCategory = ref(null);

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return listProduct.value;
  }
  return listProduct.value.filter(product => {
    const categoryMatch = selectedCategory.value ? product.category === selectedCategory.value.name : true;
    // Kiểm tra giá
    const priceMatch = (minPrice.value ? product.price >= minPrice.value : true) && 
                       (maxPrice.value ? product.price <= maxPrice.value : true);
    return categoryMatch && priceMatch;
  });
});

const selectCategory = (categories) => {
  console.log("444444", categories);

   selectedCategory.value = categories;
};

const addToCart = (product) => {
  const existProduct = listCart.value.find(
    (cart) => cart.product.id === product.id
  );
  console.log(existProduct);

  if (existProduct) {
    const updateCart = {
      ...existProduct,
      product: {
        ...existProduct.product,
        quantity: existProduct.product.quantity + 1,
      },
    };
    store.dispatch("updateCart", updateCart);
    alert("cap nhat thanh cong!");
  } else {
    const newCart = {
      idUser: user.id,
      product: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: 1,
        image: product.image,
      },
    };
    store.dispatch("addToCarts", newCart);
    alert("Them san pham thanh cong");
  }
};
</script>

<style scoped>
/* Section 2*/
.section2 {
  position: relative;
  padding-left: 20px;
  width: calc(100% - 80px);
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}
.section2-title {
  color: #7c040b;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
.section2 .section2-discount {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.section2 .section2-discount .section2-discount-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(17, 16, 16, 0.16);
  align-items: center;
}
.section2 .section2-discount .section2-discount-item:hover {
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: scale(1.05);
  background-color: var(--color-two);
}
.section2 .section2-discount .section2-discount-item:nth-child(2) {
  margin-left: 40px;
  margin-right: 40px;
}

.section2 .section2-discount .section2-item-content {
  width: 80%;
}
.section2 .section2-discount .section2-item-content button {
  background-color: #000;
  color: white;
  padding: 10px;
}
.section2 .section2-discount .section2-discount-item img {
  width: 150px;
}
.leg2 {
  position: absolute;
  width: 170px;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.leg1 {
  position: absolute;
  width: 500px;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.leg3 {
  position: absolute;
  width: 200;
  bottom: 0;
  left: 0;
  z-index: -1;
}
/*End Section 2*/
</style>
