import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpinnerStore = defineStore("spinner", () => {
    const showSpinner  = ref(false);
    return {showSpinner};
});