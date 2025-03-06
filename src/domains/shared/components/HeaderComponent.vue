<template>
    <header class="h-[10vh] w-full bg-gray-800 text-white flex items-center justify-between px-6 shadow-md">
        <!-- Título alineado a la izquierda -->
        <h1 class="text-2xl font-bold">StockTracker</h1>
        
        <!-- Botón alineado a la derecha -->
        <button 
            @click="resincronizarBD"
            class="px-4 py-2 bg-gray-700 text-white border border-gray-500 rounded-md shadow-md 
                   hover:bg-gray-600 hover:border-gray-400 hover:shadow-lg hover:cursor-pointer transition-all"
        >
            Resincronizar BD
        </button>
    </header>
</template>

<script lang="ts" setup>
    import { syncBd } from '../services/stockService';
    import { fetchToken } from '../services/tokenService';
    import { useSpinnerStore } from '../store/spinnerStore';
    import { useStockStore } from '../store/stockStore';
    import { useToastStore } from '../store/toastStore';
    
    
    const toastStore = useToastStore();
    const spinnerStore = useSpinnerStore();
    const stockStore=useStockStore();

    async function resincronizarBD() {
        console.log("Resincronizando la base de datos...");
        spinnerStore.showSpinner=true;
        
        
        //obtengo el token
        await fetchToken()
        .then(async (token) => {
            //si la obtension del token sale bien inicio la sincronizacion
            await syncBd(token).then(() =>{
                toastStore.addToast("Datos de Stock actualizados correctamente", "success");
                //mando señal para refresca la vista de stock
                stockStore.refreshStock=true;
            })
            .catch(error =>{
                console.error("Error al sincronizar datos:", error);
                toastStore.addToast("Error al sincronizar datos", "error");
            })      
        })
        .catch(error => {
            console.error("Error al obtener el token:", error);
            toastStore.addToast("Error al obtener el token", "error");
        })
        .finally(() => {
            console.log("Proceso de resincronización finalizado.");
            spinnerStore.showSpinner=false;
        });
    }
</script>
