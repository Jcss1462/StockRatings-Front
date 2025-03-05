<template>
    <div class="w-screen h-screen flex flex-col">
        <HeaderComponent></HeaderComponent>
        <main class="h-[85vh] w-full overflow-auto">
             <router-view />
        </main>
        <FooterComponent></FooterComponent>
        <SpinnerLoaderComponent v-if="spinnerStore.showSpinner"></SpinnerLoaderComponent>
    </div>
</template>
<script setup lang="ts">
    import HeaderComponent  from '../components/HeaderComponent.vue';
    import FooterComponent  from '../components/FooterComponent.vue';
    import { useSpinnerStore } from '../store/spinnerStore';
    import SpinnerLoaderComponent from '../components/SpinnerLoaderComponent.vue';
    const spinnerStore = useSpinnerStore();
</script>
<style scoped>

</style>

