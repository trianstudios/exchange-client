<template>
    <div class="p-12 rounded-lg bg-gray-200 text-center">
        <h1 class="text-3xl font-medium mb-3 text-gray-800">Exchange</h1>
        <p>Instantly upload files and share with anyone.</p>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        components: {},
        mounted() {
            console.log(process.env.VUE_APP_STRIPE_KEY)
        }
    }
</script>
