<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <!-- Mostrar mensaje si no hay datos -->
        <p v-if="stocks.length === 0" class="text-center text-gray-500 py-4">
            No hay datos disponibles
        </p>

        <table v-else class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Posición Actual
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Compañia
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Evaluador
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                        Fecha de evaluación
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Ultima comportamiento
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Puntaje actual
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Accion recomendada
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Crecimiento
                    </th>
                    <th scope="col" class="px-6 py-3">
                       
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(stock, index) in stocks" :key="index" class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {{index+1}}
                    </th>
                    <td class="px-6 py-4">
                        {{ stock.company }}
                    </td>
                    <td class="px-6 py-4  bg-gray-50 dark:bg-gray-800">
                        {{ stock.brokerage }}
                    </td>
                    <td class="px-6 py-4">
                        {{ stock.time.split("T")[0]}}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {{ stock.action }}
                    </td>
                    <td class="px-6 py-4">
                        {{ stock.target_to.toFixed(2) }}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {{ stock.rating_to }}
                    </td>
                    <td class="px-6 py-4">
                        {{ (stock.growth).toFixed(2) }}%
                    </td>
                    <td class="px-6 py-4">
                        <ChevronUpIcon v-if="stock.growth>0" class="w-7 h-7 text-green-500" />
                        <ChevronDownIcon  v-if="stock.growth<0" class="w-7 h-7 text-red-500" />
                        <MinusIcon  v-if="stock.growth==0" class="w-7 h-7 text-blue-500" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import type { Stock } from "../../shared/models/stockModel";
    import { fetchStocks } from "../../shared/services/stockService";
    import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from "@heroicons/vue/16/solid";
    const stocks = ref<Stock[]>([]);

    onMounted(async () => {
        try {
            stocks.value = await fetchStocks(); // Llamada a la API
        } catch (error) {
            console.error("Error al obtener stocks:", error);
        }
    });
    
</script>