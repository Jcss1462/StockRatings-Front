<template>
  <DefaultLayout/>
  <ToastContainerComponent />
  <SpinnerLoaderComponent v-if="spinnerStore.showSpinner"></SpinnerLoaderComponent>
</template>

<script setup lang="ts">
  import ToastContainerComponent from './domains/shared/components/ToastContainerComponent.vue';
  import SpinnerLoaderComponent from './domains/shared/components/SpinnerLoaderComponent.vue';
  import DefaultLayout from './domains/shared/layouts/DefaultLayout.vue';
  import { useSpinnerStore } from './domains/shared/store/spinnerStore';
  const spinnerStore = useSpinnerStore();
</script>

<style scoped>

</style>


