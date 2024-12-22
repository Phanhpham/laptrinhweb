<template>
  <div class="flex w-full bg-slate-200">
    <Menu ></Menu>
   <div class="flex flex-col w-full">
    <div class="flex-1">
        <Header />
    </div>
    <div class=" bg-gray-200 h-[calc(100vh-64px)]">
      <router-view />
    </div>
   </div>
  </div>
</template>

<script setup>
import Menu from "./Menu.vue";
import Header from "./Header.vue";
</script>

<style></style>
