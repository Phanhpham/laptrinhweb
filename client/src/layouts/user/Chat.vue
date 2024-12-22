<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-3">
            <h2 class="text-lg font-semibold">Chat với Shop</h2>
            <button class="text-gray-500 hover:text-red-500">
                &times;
            </button>
        </div>

        <!-- Chat content -->
        <div class="my-4 h-60 overflow-y-auto">
            <div class="flex items-start mb-4">
                <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                    <p class="text-sm">Xin chào! Chúng tôi có thể giúp gì cho bạn?</p>
                </div>
            </div>
            <div class="flex items-start justify-end mb-4">
                <div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p class="text-sm">Tôi muốn hỏi về sản phẩm.</p>
                </div>
            </div>
        </div>

        <!-- Input -->
        <div class="flex items-center border-t pt-3">
            <input type="text" class="w-full border rounded-lg p-2 mr-2" placeholder="Nhập tin nhắn...">
            <button class="bg-blue-500 text-white rounded-lg px-4 py-2">Gửi</button>
        </div>
    </div>
</div>

</template>

<script setup>

</script>

<style>

</style>