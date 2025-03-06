<template>
    <div class="container mx-auto p-4">
      <!-- Row 1 -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 pt-5 pb-10">
        <!-- Columna Izquierda (Título) -->
        <div class="md:col-span-6 flex items-center">
          <h1 class="text-2xl font-bold">Tendencias del Mercado y Mejor Inversión 📊</h1>
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
    import BestStockComponent from '../components/BestStockComponent.vue';
    import StockListComponent from '../components/StockListComponent.vue';
</script>