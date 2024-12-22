<template>
  <div>
    <Header />
    <br>
    <br>
    <br>
    <div class="product-detail">
      <div class="image-gallery">
        <img
          :src="showProduct.image "
          alt="Product Image"
          class="main-image h-[750px]"
        />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ showProduct.name}}</h1>
        <div class="rating">⭐⭐⭐⭐☆ (24 reviews)</div>
        <p class="price">
          {{ formatPrice(showProduct.price) }} <span class="original-price">150.000</span>
        </p>
        <p class="short-description">
          This is a short description of the product. It highlights the main
          features and benefits.
        </p>

        <label for="size">Size:</label>
        <select id="size">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>

        <label for="color">Color:</label>
        <select id="color">
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
        </select>

        <div class="quantity">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" value="1" min="1" />
        </div>
        <div class="flex gap-6">
          <button class="btn-buy">Buy Now</button>

          <button class="btn-buy">Add To Cart</button>
        </div>
      </div>
    </div>

    <!-- Detailed Description -->
    <section class="description">
      <h2>Product Description</h2>
      <p>
        This section includes detailed product information such as material,
        features, and instructions.
      </p>
    </section>

    <!-- Reviews Section -->
    <section class="reviews">
      <h2>Customer Reviews</h2>
      <div class="review-item">
        <strong>John Doe</strong> - ⭐⭐⭐⭐☆ <br />
        <p>Great product! Really satisfied with the quality.</p>
      </div>
      <div class="review-item">
        <strong>Jane Doe</strong> - ⭐⭐⭐☆☆ <br />
        <p>The product is good but shipping took longer than expected.</p>
      </div>
    </section>

    <!-- Related Products -->
    <section class="related-products">
      <h2>Related Products</h2>
      <div class="product">
        <img src="https://via.placeholder.com/150" alt="Related Product" />
        <p>Related Product 1</p>
      </div>
      <div class="product">
        <img src="https://via.placeholder.com/150" alt="Related Product" />
        <p>Related Product 2</p>
      </div>
      <div class="product">
        <img src="https://via.placeholder.com/150" alt="Related Product" />
        <p>Related Product 3</p>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from "@/layouts/user/Header.vue";
import Footer from "@/layouts/user/Footer.vue";
import { computed, onMounted } from "vue";

import { defineProps } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

// format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};


const route = useRoute();
console.log(555555, route);
const { id } = route.params;
console.log(33333, id);

onMounted(() => {
  window.scrollTo(0, 0);
});

const store = useStore();
console.log(444444, store.state.product.productById);

const showProduct =computed(()=>store.state.product.productById)
console.log(345,showProduct);

onMounted(() => {
  if (id) {
    store.dispatch("getDetail", Number(id));
  }
});
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: #f3f4f6;
  color: #333;
}

.product-detail {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: white;
  margin: 20px auto;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.image-gallery {
  flex: 1;
  margin-right: 30px;
}

.main-image {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.main-image:hover {
  transform: scale(1.05);
}

.thumbnail-gallery {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}

.thumbnail-gallery img {
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.thumbnail-gallery img:hover {
  border-color: #fbbf24;
}

.product-info {
  flex: 1;
  padding: 20px;
}

.product-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #1e293b;
}

.rating {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #f59e0b;
}

.price {
  font-size: 2rem;
  color: #ef4444;
  margin-bottom: 15px;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  font-size: 1.2rem;
}

.short-description {
  margin-bottom: 20px;
  color: #6b7280;
  line-height: 1.6;
}

select,
.quantity input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d1d5db;
  margin-right: 10px;
  font-size: 1rem;
  color: #374151;
  background-color: #f1f5f9;
  margin-bottom: 20px;
}

.btn-buy {
  background-color: #fbbf24;
  color: white;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  transition: transform 0.3s ease;
}

.btn-buy:hover {
  transform: translateY(-3px);
  background-color: #f59e0b;
}

.description,
.reviews,
.related-products {
  padding: 40px;
  background-color: white;
  margin: 20px auto;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.description h2,
.reviews h2,
.related-products h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1e293b;
}

.related-products .product {
  display: inline-block;
  width: 200px;
  margin-right: 20px;
  text-align: center;
}

.related-products .product img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.related-products .product img:hover {
  transform: scale(1.05);
}
</style>
