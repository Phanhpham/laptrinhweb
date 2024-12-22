<template>
    <div class="m-5">
        <div class="bg-white p-5 rounded-lg h-screen">
            <h1 class="font-bold text-[20px]">Dashboard</h1>

            <div class="flex justify-between gap-4 mt-5">
                <div class="bg-white rounded-lg shadow p-5 flex-1 text-center">
                    <div class="text-lg font-semibold text-gray-600">Category</div>
                    <div class="text-3xl font-bold text-gray-800 mt-2">{{ listCategories.length }}</div>
                </div>

                <div class="bg-white rounded-lg shadow p-5 flex-1 text-center">
                    <div class="text-lg font-semibold text-gray-600">Users</div>
                    <div class="text-3xl font-bold text-gray-800 mt-2">{{ listUser.length }}</div>
                </div>

                <div class="bg-white rounded-lg shadow p-5 flex-1 text-center">
                    <div class="text-lg font-semibold text-gray-600">Product</div>
                    <div class="text-3xl font-bold text-gray-800 mt-2">{{ listProduct.length }}</div>
                </div>
            </div>


            <div class="flex items-center justify-between gap-10 mt-10">
                <!-- Users Chart -->
                <div class="  w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mb-6">
                    <div class="flex justify-between">
                        <div>
                            <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
                        </div>
                        <div
                            class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                            12%
                            <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 10 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                            </svg>
                        </div>
                    </div>
                    <div id="user-chart"></div>
                </div>

                <!-- Products Chart -->
                <div class=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mb-6">
                    <div class="flex justify-between">
                        <div>
                            <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">15.8k</h5>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Products sold</p>
                        </div>
                        <div
                            class="flex items-center px-2.5 py-0.5 text-base font-semibold text-blue-500 dark:text-blue-500 text-center">
                            8%
                            <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 10 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                            </svg>
                        </div>
                    </div>
                    <div id="product-chart"></div>
                </div>
            </div>



        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const listCategories = computed(() => store.state.category.categoriesItem)
const listProduct = computed(() => store.state.product.products);
const listUser = computed(() => store.state.user.users)

onMounted(() => {
    store.dispatch("getCategory");
    store.dispatch("getProduct");
    store.dispatch("getUser")
})
</script>

<style>
/* Add your custom styles here */
</style>
