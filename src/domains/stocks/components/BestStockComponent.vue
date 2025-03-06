<template>
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto">
      <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
        📢 La Mejor Opción de Inversión Hoy
      </h2>
      
      <div v-if="bestStock.ticker != ''" class="flex flex-col items-center space-y-3">
        <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400">
          {{ bestStock.company }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          Puntaje Actual: <span class="font-semibold text-gray-900 dark:text-white">${{ bestStock.target_to.toFixed(2) }}</span>
        </p>
        <p class="text-gray-500 dark:text-gray-400 flex items-center">
        Crecimiento (%): 
          <span 
            class="ml-2 font-semibold" 
            :class="bestStock.growth > 0 ? 'text-green-500' : bestStock.growth < 0 ? 'text-red-500' : 'text-blue-500'"
          >
            {{bestStock.growth.toFixed(2)}}%
          </span>
          <ChevronUpIcon v-if="bestStock.growth > 0" class="w-5 h-5 text-green-500 ml-1" />
          <ChevronDownIcon v-if="bestStock.growth < 0" class="w-5 h-5 text-red-500 ml-1" />
          <MinusIcon v-if="bestStock.growth === 0" class="w-5 h-5 text-blue-500 ml-1" />
        </p>
      </div>
  
      <p v-else class="text-gray-500 dark:text-gray-400 text-center mt-4">
        No hay una recomendación de inversión disponible hoy.
      </p>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted } from "vue";
    import { fetchBestStock } from "../../shared/services/stockService";
    import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from "@heroicons/vue/24/solid";
    import type { Stock } from "../../shared/models/stockModel";

    const emptyStock: Stock = {
        id: 0,
        ticker: "",
        company: "",
        action: "",
        brokerage: "",
        rating_from: "",
        rating_to: "",
        target_from: 0,
        target_to: 0,
        time: "",
        growth: 0, 
        };
        
    const bestStock = ref<Stock>(emptyStock);
    
    onMounted(async () => {
        try {
            const data = await fetchBestStock();
            if(data != null){
                Object.assign(bestStock.value, data);
            }  
        } catch (error) {
        console.error("Error al obtener la mejor opción de inversión:", error);
        }
    });
  </script>
  