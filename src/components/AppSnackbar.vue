<template>
    <div class="fixed w-full top-0 left-0 mt-5 flex justify-center">
        <transition name="snack">
            <div class="bg-indigo-500 max-w-sm text-white px-8 py-2 rounded-lg text-sm" v-if="snackbar">
                {{ snackbar }}
            </div>
        </transition>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AppSnackbar",
    computed: {
        ...mapGetters({
            snackbar: 'snackbar/snackbar'
        })
    }
}
</script>