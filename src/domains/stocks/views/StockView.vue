<template>
    <div :key="componentKey" class="container mx-auto p-4">
      <!-- Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 mt-5 pt-5 pb-5">
        <!-- Columna Izquierda (Título) -->
        <div class="md:col-span-6 flex items-center">
          <h1 class="text-2xl font-bold lg:text-left sm:text-center text-center sm:mb-7 lg:mb-0 w-full" >Tendencias del Mercado y Mejor Inversión 📊</h1>
        </div>
        
        <!-- Columna Derecha (Componente Extra) -->
        <div class="md:col-span-6">
            <BestStockComponent></BestStockComponent>
        </div>
      </div>
  
      <!-- Row 2 -->
      <div class="grid grid-cols-12">
        <div class="col-span-12">
          <StockListComponent></StockListComponent>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { useStockStore } from '../../shared/store/stockStore';
    import BestStockComponent from '../components/BestStockComponent.vue';
    import StockListComponent from '../components/StockListComponent.vue';

    const componentKey = ref(0);
    const stockStore=useStockStore();
    
    watch(
      () => stockStore.refreshStock, 
      (newValue) => {
        //si detecto la señal de refresh recargo el componente
        if (newValue==true) {
          console.log("Señal de recarga de stock recibida, recargando....")
          //apago la señal de recarga
          stockStore.refreshStock=false
          //recargo
          componentKey.value++;
        }
      }
    );





</script>