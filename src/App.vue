<template>
    <div class="w-full md:w-8/12 lg:6/12 mx-auto px-6 mt-6 md:mt-20">
        <AppSnackbar />
        <AppNav/>
        <router-view/>
    </div>
</template>

<style src="./assets/styles/app.css"/>
<script>
    import AppNav from "./components/AppNav";
    import AppSnackbar from "@/components/AppSnackbar";

    export default {
        components: {AppSnackbar, AppNav}
    }
</script>
