// import AdminLayout from "@/layout/admin/AdminLayout.vue";
import { createWebHistory, createRouter } from "vue-router";
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import ManagerUser from "@/views/admin/ManagerUser.vue";
import ManagerProduct from "@/views/admin/ManagerProduct.vue";
import ManagerCategory from "@/views/admin/ManagerCategory.vue";

const adminRoutes = [
  {
    path: "/admin",
    
    redirect: "admin/dashboard",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "manager-user",
        component: ManagerUser,
      },
      {
        path: "manager-product",
        component: ManagerProduct,
      },
      {
        path: "manager-category",
        component: ManagerCategory,
      },
    ],
  },
];

export default adminRoutes;
