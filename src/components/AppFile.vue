<template>
    <div class="flex items-center justify-between border-b-2 border-gray-100">
        <div class="text-sm truncate overflow-ellipsis w-6/12">
            {{ file.name }}
        </div>
        <div class="-mr-3 flex items-center">
            <AppFileShareLink :file="file" />
            <a @click.prevent="deleteFile" href="#"
               class="inline-block text-sm p-3 text-pink-500 font-medium">Delete</a>
        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import AppFileShareLink from "@/components/AppFileShareLink";

export default {
    name: "AppFile",
    components: {AppFileShareLink},
    props: {
        file: {
            required: true,
            type: Object
        }
    },
    methods: {
        ...mapMutations({
            decrementUsage: 'usage/DECREMENT_USAGE'
        }),
        ...mapActions({
            deleteFileAction: 'files/deleteFile',
            snackbar: 'snackbar/snackbar'
        }),
        async deleteFile() {
            if (window.confirm("Do you really want to delete this file?")) {
                await this.deleteFileAction(this.file.uuid)
                this.snackbar(`File has been deleted!`)
                this.decrementUsage(this.file.size)
            }
        }
    }
}
</script>
