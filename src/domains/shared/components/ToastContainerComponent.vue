<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm"
      :class="toast.type === 'success' ? 'border-green-500' : 'border-red-500'"
    >
      <!-- Icono -->
      <div
        class="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg"
        :class="toast.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            v-if="toast.type === 'success'"
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
          <path
            v-else
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
        </svg>
      </div>
      
      <!-- Mensaje -->
      <div class="ms-3 text-sm font-normal">{{ toast.message }}</div>

      <!-- Botón de cerrar -->
      <button
        @click="toastStore.removeToast(toast.id)"
        class="ms-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100"
      >
        ✖
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useToastStore } from "../store/toastStore"
  const toastStore = useToastStore();
</script>