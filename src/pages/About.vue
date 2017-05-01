<template>
    <main-layout>
        <p>{{title}}</p>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/main.vue';
    export default {
        components: { MainLayout },
        data() {
            return {
                title: 'Welcome to About page'
            }
        }
    }
</script>