<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

      <!-- Email Input -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="email"
          @blur="validateEmail"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': emailError }"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <p v-if="emailError" class="text-red-500 text-xs italic">{{ emailError }}</p>
      </div>

      <!-- Password Input -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          @blur="validatePassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': passwordError }"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <p v-if="passwordError" class="text-red-500 text-xs italic">{{ passwordError }}</p>
      </div>

      <!-- Remember Me Checkbox -->
      <div class="flex items-center justify-between mb-6">
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-600">Remember me</span>
        </label>
        <router-link to="/register" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Don't have an account yet?
        </router-link>
      </div>

      <!-- Login Button -->
      <div class="flex items-center justify-center">
        <button
          @click="handleLogin"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const router = useRouter();

// Email validation function
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = 'Email is required.';
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address.';
  } else {
    emailError.value = '';
  }
};

// Password validation function
const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required.';
  } else {
    passwordError.value = '';
  }
};

// Handles login and performs all validations
const handleLogin = () => {
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    fetchAccounts();
  }
};

// Fetch accounts from API
const fetchAccounts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/user');
    const accounts = response.data;

    const userAccount = accounts.find(
      account => account.email === email.value && account.password === password.value
    );

    if (userAccount) {
      if (!userAccount.status) {
        localStorage.setItem("account", JSON.stringify(userAccount));
        if (userAccount.email === 'admin@gmail.com' && password.value === 'phuonganh123') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        alert("Account is locked.");
      }
    } else {
      alert('Incorrect email or password.');
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
  }
};
</script>

<style></style>
