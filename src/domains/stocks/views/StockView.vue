<template>
    <div class="container mx-auto p-4">
      <!-- Row 1 -->
      <div class="grid grid-cols-12 gap-4 mb-4">
        <!-- Columna Izquierda (Título) -->
        <div class="col-span-6 flex items-center">
          <h1 class="text-2xl font-bold">Título de la Vista</h1>
        </div>
        
        <!-- Columna Derecha (Componente Extra) -->
        <div class="col-span-6">
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
<script setup>
    import BestStockComponent from '../components/BestStockComponent.vue';
    import StockListComponent from '../components/StockListComponent.vue';
</script>