<template>
    <div>
        <div class="m-b-8">
            <div v-if="errors.size" class="bg-red-300 px-6 py-2 rounded-lg text-sm text-gray-800 mb-4">
                <strong>Error:</strong> {{ errors.size[0] }}
            </div>
            <AppUploader @onprocessfile="storeFile" @validation="setValidationErrors"/>
        </div>
        <div>
            <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">
                Your files
            </h2>
            <template v-if="files.length">
                <AppFile v-for="file in files" :key="file.uuid" :file="file"/>
            </template>
            <p v-else class="mt-3 text-sm text-gray-800">There are no files here right now</p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import AppFile from "@/components/AppFile";
import AppUploader from "@/components/AppUploader";
import axios from "axios";

export default {
    name: "Upload",
    data(){
        return{
            errors: {}
        }
    },
    components: {
        AppFile,
        AppUploader
    },
    methods: {
        ...mapActions({
            getFiles: 'files/getFiles'
        }),
        ...mapMutations({
            addFile: 'files/ADD_FILE',
            incrementUsage: 'usage/INCREMENT_USAGE'
        }),
        setValidationErrors(errors){
            this.errors = errors
        },
        async storeFile(file) {
            let response = await axios.post('/api/v1/files', {
                name: file.filename,
                size: file.fileSize,
                path: file.serverId
            })

            this.addFile(response.data.data)
            this.incrementUsage(file.fileSize)
        }
    },
    mounted() {
        this.getFiles()
    },
    computed: {
        ...mapGetters({
            files: 'files/files'
        })
    }
}
</script>

<style scoped>

</style>
