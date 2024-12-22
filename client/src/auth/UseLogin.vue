<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>
  
        <!-- Email Input -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Enter your email" />
        </div>
  
        <!-- Password Input -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="Enter your password" />
          <p class="text-red-500 text-xs italic hidden" id="error-message">Please enter your password.</p>
        </div>
  
        <!-- Remember Me Checkbox -->
        <div class="flex items-center justify-between mb-6">
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Don't have an account yet?
          </a>
        </div>
  
        <!-- Login Button -->
        <div class="flex items-center justify-center">
          <router-link to="/user">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
              Login
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style></style>