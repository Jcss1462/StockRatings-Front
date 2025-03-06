import { defineStore } from "pinia";
import { ref } from "vue";

export const useStockStore = defineStore("stockStore", () => {
    const refreshStock = ref<boolean>(false);
    return { refreshStock };
});