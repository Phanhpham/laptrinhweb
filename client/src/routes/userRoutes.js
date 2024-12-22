import UserLayout from "@/layouts/user/UserLayout.vue";
import Account from "@/views/user/Account.vue";
import Address from "@/views/user/Address.vue";
import Cart from "@/views/user/Cart.vue";
import ChangePassword from "@/views/user/ChangePassword.vue";
import DetailProduct from "@/views/user/DetailProduct.vue";
import Home from "@/views/user/Home.vue";
import Profile from "@/views/user/Profile.vue";
import UserPrivate from "@/views/user/UserPrivate.vue";
import WishList from "@/views/user/WishList.vue";
import Favorite from "@/views/user/Favorite.vue";
import Payment from "@/views/user/Payment.vue";
import Contact from "@/views/user/Contact.vue";
import Chat from "@/layouts/user/Chat.vue";
const userRoutes = [
  {
    path: "/",
    component: UserLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "user",
        // redirect: "user/account",
        component: UserPrivate,
        children: [
          {
            path: "cart",
            component: Cart,
          },
          {
            path: "account",
            component: Account,
            children: [
             
              {
                path: "change-password",
                name: "change-password",
                component: ChangePassword,
              },
              {
                path: "address",
                name: "address",
                component: Address,
              },
              {
                path: "wish-list",
                name: "wish-list",
                component: WishList,
              }
             
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/detailProduct/:id",
    name: "ProductDetail",
    component: DetailProduct,
  },
  {
    path: "/favorite/:id",
    name: "favoriteproduct",
    component: Favorite,
  },
  {
    path:"/cart/:id",
    name:"cart",
    component:Cart,

  },
  {
  path:"/payment/:id",
  name:"payment",
  component:Payment,
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: Profile,
  },
  {
    path:"/contact",
    name:"contact",
    component:Contact,
  },
  {
    path:"/chat",
    name:"chat",
    component:Chat
  }
];

export default userRoutes;
