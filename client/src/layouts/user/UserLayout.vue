<template>
  <div>
     <Header/>
     <br>
     <br>
     <br>
     <br>
    <Banner/>
    <router-view/>
    <Footer/>
  </div>
 
</template>

<script setup>
import Header from './Header.vue';
import Banner from './Banner.vue';
import Footer from './Footer.vue';
</script>

<style>

</style>