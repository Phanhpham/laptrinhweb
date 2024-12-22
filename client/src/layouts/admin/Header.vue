<template>
  <div>
    <h1 class="bg-blue-300 h-50 w-full">
      <!-- Topbar Start -->
      <div class="flex justify-between items-center w-full pr-8 h-28">
        <div class="text-3xl uppercase font-bold">Pet Shop</div>

        <div class="flex items-center gap-2 relative">
          <i class="fa-regular fa-user" style="color: #B197FC"></i>
          <p class="text-white font-bold text-[18px]" @click="toggleDropdown">{{ storedAccount }}</p>

          <!-- Dropdown menu -->
          <div v-if="dropdownOpen" class="absolute top-5 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul>
              <li>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
              </li>
              <li>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </h1>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userAccount = ref(null);
    const dropdownOpen = ref(false);
    const router = useRouter();

    // Lấy dữ liệu từ localStorage khi component được tải
    onMounted(() => {
      const storedAccount = localStorage.getItem('account');
      if (storedAccount) {
        userAccount.value = storedAccount; // Gán giá trị từ localStorage
      }
    });

    // Hàm bật/tắt dropdown
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Hàm đăng xuất
    const logout = () => {
      localStorage.removeItem('account'); // Xóa tài khoản trong localStorage
      userAccount.value = null; // Đặt lại giá trị tài khoản
      router.push('/login'); // Chuyển hướng về trang đăng nhập
    };

    return {
      userAccount,
      dropdownOpen,
      toggleDropdown,
      logout
    };
  }
}
</script>

<style scoped>
.relative {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 10;
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  color: #333;
  text-align: left;
  text-decoration: none;
  background-color: transparent;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #f5f5f5;
}
</style>
