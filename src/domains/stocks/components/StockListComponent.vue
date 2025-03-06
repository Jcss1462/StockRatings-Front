<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <!-- Campo de búsqueda -->
        <div v-if="stocks.length > 0" class="mb-4">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filtrar por compañía:
            </label>
            <input 
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Buscar compañía..."
                class="px-4 py-2 border rounded-md w-full"
            />
        </div>

        <!-- Mostrar mensaje si no hay datos -->
        <p v-if="filteredStocks.length === 0" class="text-center text-gray-500 py-4">
            No hay datos disponibles
        </p>
        <!-- Tabla -->
        <div v-else class="max-h-[38vh] overflow-y-auto ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 hover:cursor-pointer bg-gray-50 dark:bg-gray-800 flex items-center space-x-2" @click="sortStock('position')">
                            Posición Actual 
                            <ChevronUpDownIcon v-if="currentColumnSort!='position'" class="w-8 h-8 text-gray-500 ml-1"/>
                            <ChevronUpIcon v-else-if="sortDirctionDesc==false" class="w-8 h-8 text-green-500" />
                            <ChevronDownIcon  v-else-if="sortDirctionDesc==true" class="w-8 h-8 text-red-500" /> 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Compañia
                        </th>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Evaluador
                        </th>
                        <th scope="col" class="px-6 py-3 hover:cursor-pointer flex items-center space-x-2"  @click="sortStock('time')">
                            Fecha de evaluación
                            <ChevronUpDownIcon v-if="currentColumnSort!='time'" class="w-8 h-8 text-gray-500 ml-1"/>
                            <ChevronUpIcon v-else-if="sortDirctionDesc==false" class="w-8 h-8 text-green-500" />
                            <ChevronDownIcon  v-else-if="sortDirctionDesc==true" class="w-8 h-8 text-red-500" /> 
                        </th>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Ultimo comportamiento
                        </th>
                        <th scope="col" class="px-6 py-3 hover:cursor-pointer flex items-center space-x-2" @click="sortStock('target_to')">
                            Puntaje actual
                            <ChevronUpDownIcon v-if="currentColumnSort!='target_to'" class="w-8 h-8 text-gray-500 ml-1"/>
                            <ChevronUpIcon v-else-if="sortDirctionDesc==false" class="w-8 h-8 text-green-500" />
                            <ChevronDownIcon  v-else-if="sortDirctionDesc==true" class="w-8 h-8 text-red-500" /> 
                        </th>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Acción recomendada
                        </th>
                        <th scope="col" class="px-6 py-3 hover:cursor-pointer flex items-center space-x-2" @click="sortStock('growth')">
                            Crecimiento
                            <ChevronUpDownIcon v-if="currentColumnSort!='growth'" class="w-6 h-6 text-gray-500 ml-1"/>
                            <ChevronUpIcon v-else-if="sortDirctionDesc==false" class="w-6 h-6 text-green-500" />
                            <ChevronDownIcon  v-else-if="sortDirctionDesc==true" class="w-6 h-6 text-red-500" /> 
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stock, index) in filteredStocks" :key="index" class="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            {{ stock.position+1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ stock.company }}
                        </td>
                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {{ stock.brokerage }}
                        </td>
                        <td class="px-6 py-4">
                            {{ stock.time.split("T")[0] }}
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
                            {{ stock.growth.toFixed(2) }}%
                        </td>
                        <td class="px-6 py-4">
                            <ChevronUpIcon v-if="stock.growth > 0" class="w-7 h-7 text-green-500" />
                            <ChevronDownIcon v-if="stock.growth < 0" class="w-7 h-7 text-red-500" />
                            <MinusIcon v-if="stock.growth == 0" class="w-7 h-7 text-blue-500" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import type { Stock } from "../../shared/models/stockModel";
import { fetchStocks } from "../../shared/services/stockService";
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from "@heroicons/vue/16/solid";
import { useToastStore } from "../../shared/store/toastStore";
import { useSpinnerStore } from "../../shared/store/spinnerStore";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

const stocks = ref<Stock[]>([]);
const searchQuery = ref(""); // Estado para la búsqueda
const toastStore = useToastStore();
const spinnerStore = useSpinnerStore();
const currentColumnSort=ref("position");
const sortDirctionDesc=ref(false);

// Filtrar la lista de stocks según la búsqueda
const filteredStocks = computed(() => {
    return stocks.value.filter(stock => 
        stock.company.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

function sortStock(column: keyof Stock){

    currentColumnSort.value=column;
    sortDirctionDesc.value=!sortDirctionDesc.value;

    stocks.value.sort((a, b) => {
        const valorA = a[column];
        const valorB = b[column];

        // Manejar valores undefined
        if (valorA === undefined) return 1;
        if (valorB === undefined) return -1;

        // Comparación numérica
        if (typeof valorA === 'number' && typeof valorB === 'number') {
            return sortDirctionDesc.value ? valorB - valorA : valorA - valorB;
        }

        // Comparación de strings
        if (typeof valorA === 'string' && typeof valorB === 'string') {
            return sortDirctionDesc.value 
                ? valorB.localeCompare(valorA) 
                : valorA.localeCompare(valorB);
        }

        // Comparación de booleanos (true = 1, false = 0)
        if (typeof valorA === 'boolean' && typeof valorB === 'boolean') {
            return sortDirctionDesc.value 
                ? Number(valorB) - Number(valorA) 
                : Number(valorA) - Number(valorB);
        }

        return 0; // Si los tipos no coinciden, no hacer nada
    });

}

onMounted(async () => {
    spinnerStore.showSpinner = true;
    await fetchStocks()
        .then((data) => {
            stocks.value = data;
        })
        .catch((error) => {
            console.error("Error al obtener la lista de stocks:", error);
            toastStore.addToast("Error al obtener la lista de stocks", "error");
        })
        .finally(() => {
            spinnerStore.showSpinner = false;
        });
});
</script>
