import { createStore } from "vuex";
import { users } from "./modules/user";
import { products } from "./modules/product";
import { favorite } from "./modules/favorite";
import { cartProduct } from "./modules/cart";
import { orders } from "./modules/pay";
import { categories } from "./modules/categories";

export const store = createStore({
  modules: {
    user: users,
    product: products,
    favorite: favorite,
    cart: cartProduct,
    order: orders,
    category:categories
  },
});
