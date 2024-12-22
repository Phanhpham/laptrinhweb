<template>
    <div class=" h-screen bg-blue-300 w-72">
        <div class="flex justify-center mt-2"> <img class="w-24 h-24"
                src="https://img.freepik.com/premium-vector/dog-home-logo-design_626969-83.jpg" />
        </div>
        <div class="flex flex-col justify-center w-full ml-4 gap-10 mt-8">

            <router-link to="/admin/dashboard">
                <div class="flex items-center gap-2 text-lg font-semibold">
                    <i class="fa-solid fa-house"></i>Dashboard
                </div>
            </router-link>

            <router-link to="/admin/manager-user">
                <div class="flex items-center gap-2 text-lg font-semibold">
                    <i class="fa-solid fa-user"></i> Manager User
                </div>
            </router-link>

            <router-link to="/admin/manager-product">
                <div class="flex items-center gap-2 text-lg font-semibold">
                    <i class="fa-solid fa-box"></i>
                    Manager Product
                </div>
            </router-link>
            <router-link to="/admin/manager-category">
                <div class="flex items-center gap-2 text-lg font-semibold">
                    <i class="fa-solid fa-list"></i>
                    Manager Category
                </div>
            </router-link>
            <button @click="handleLogOut">
            <div class="flex items-center gap-2 text-lg font-semibold">
                                <i class="fa-solid fa-arrow-right-from-bracket"></i> Đăng Xuất
                            </div>
            </button>
                
          
        </div>
    </div>

</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import ManagerProduct from "../../views/admin/ManagerProduct.vue"
import ManagerUser from "../../views/admin/ManagerUser.vue"
import ManagerCategory from "../../views/admin/ManagerCategory.vue"

const router = useRouter()

const handleLogOut=()=>{
    router.push("/login");
    localStorage.removeItem("account")
}



</script>

<style></style>