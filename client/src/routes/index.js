import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const routes = [...userRoutes, ...authRoutes, ...adminRoutes];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to,from,next)=>{
  const admin = localStorage.getItem("account");
  if (to.path === "/admin/dashboard"&& !admin){
    next("/login");
    
  }else{
    next();
  }
})
export default router;