<template>
    <div class="m-5">
      <div class="bg-white p-5 rounded-lg h-screen">
        <h1 class="font-bold text-[20px]">Categories</h1>
  
        <!-- Search bar for categories --->
        <div class="mt-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by category name"
            class="border p-2 rounded w-full"
            @input="handleSearch"
          />
        </div>
  
        <!-- Add Category Button -->
        <div class="my-4">
          <button
            @click="openAddModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
  
        <!-- Categories Table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">STT</th>
                <th scope="col" class="px-6 py-3">Category Name</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(category, index) in paginatedCategories"
                :key="category.id"
                class="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
              >
                <td class="px-6 py-4">{{ (currentPage - 1) * categoryPerPage + index + 1 }}</td>
                <td class="px-6 py-4">{{ category.name }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <!-- Edit Button -->
                  <button
                    @click="openEditModal(category)"
                    class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <!-- Delete Button -->
                  <button
                    @click="deleteCategory(category.id)"
                    class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex items-center justify-center mt-6">
        <nav class="inline-flex items-center space-x-2">
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Trước
          </button>
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Tiếp
          </button>
        </nav>
      </div>
        </div>
  
        <!-- Add Category Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-5 rounded">
            <h2 class="font-bold text-xl mb-4">Add Category</h2>
            <input
              v-model="newCategoryName"
              placeholder="Category Name"
              class="border p-2 rounded w-full mb-4"
            />
            <button
              @click="addCategory"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              @click="closeModal"
              class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
  
        <!-- Edit Category Modal -->
        <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-5 rounded">
            <h2 class="font-bold text-xl mb-4">Edit Category</h2>
            <input
              v-model="currentCategory.name"
              placeholder="Category Name"
              class="border p-2 rounded w-full mb-4"
            />
            <button
              @click="saveEditedCategory"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              @click="closeModalEdit"
              class="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

  const store = useStore()
  const categoryPerPage = ref(2);
const currentPage=ref(1);
  
  // Sample categories data
  const categories = computed(() => store.state.category.categoriesItem)

  onMounted(() => {
    store.dispatch("getCategory")
  })
  
  // Search query
  const searchQuery = ref("");
  
  // State for Add/Edit Modals
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const newCategoryName = ref("");
  const currentCategory = ref(null);

  // Open Add Modal
  const openAddModal = () => {
    showAddModal.value = true;
  };
  
  // Open Edit Modal
  const openEditModal = (category) => {
    currentCategory.value = category;
    showEditModal.value = true
  };
  
  // Close Modals
  const closeModal = () => {
    showAddModal.value = false
  };

  const closeModalEdit = () => {
    showEditModal.value = false
  }
  
  // Add new category
  const addCategory = () => {
    store.dispatch("addCategory", {
      name: newCategoryName.value
    })
    newCategoryName.value = ""
    closeModal()
  };
  
  // Save edited category
  const saveEditedCategory = () => {
    store.dispatch("updateCategory", {id: currentCategory.value.id, name: currentCategory.value.name});
    closeModalEdit()
  };
  
  // Delete category
  const deleteCategory = (id) => {
    store.dispatch("deleteCategory", id)
  };

  const handleSearch = () => {
    store.dispatch("searchCategory", searchQuery.value)
  }

  const totalPages = computed(() =>
  Math.ceil(categories.value.length / categoryPerPage.value)
);

// Tính toán người dùng được phân trang
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * categoryPerPage.value;
  const end = start + categoryPerPage.value;
  return categories.value.slice(start, end);
});
// Thay đổi trang
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return; // Không cho phép chuyển tới trang ngoài giới hạn
  currentPage.value = page;
};
  </script>
  
  <style scoped>
  /* Add your custom styles if needed */
  </style>
  