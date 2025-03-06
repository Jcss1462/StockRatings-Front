import { defineStore } from "pinia";
import type { Toast } from "../models/toast";
import { ref } from "vue";

export const useToastStore = defineStore("toastStore", () => {
    const toasts = ref<Toast[]>([]);
  
    const addToast = (message: string, type: "success" | "error") => {
      const id = Date.now(); // Genera un ID único basado en el tiempo
      toasts.value.push({ id, message, type });
  
      // Remover automáticamente después de 15 segundos
      setTimeout(() => removeToast(id), 10000);
    };
  
    const removeToast = (id: number) => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
    };
  
    return { toasts, addToast, removeToast };
});