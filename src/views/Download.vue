<template>
    <div>
        <div class="p-12 rounded-lg bg-gray-100 text-center" v-if="file && meta">
            <h1 class="text-xl font-medium mb-3 text-gray-700">
                {{ file.name }}
            </h1>
            <AppButton @click="download" title="Download File"/>
        </div>
        <div v-if="error">
            <p class="text-sm text-center text-gray-800">Sorry, this file is not available.</p>
        </div>
    </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import axios from "axios";

export default {
    name: "Download",
    components: {AppButton},
    data(){
        return {
            error: false,
            file: null,
            meta: null
        }
    },
    props: {
        uuid: {
            required: true,
            type: String
        },
        token: {
            required: true,
            type: String
        }
    },
    methods: {
        download(){
            let dummy = document.createElement('a')

            dummy.href = this.meta.url
            document.body.appendChild(dummy)

            dummy.click()
            document.body.removeChild(dummy)
        },
        async getFile(){
            try {
                let response = await axios.get(`/api/v1/files/${this.uuid}/links?token=${this.token}`)
                this.file = response.data.data
                this.meta = response.data.meta
            }catch (e){
                this.error = true
            }
        }
    },
    mounted() {
        console.log('adfsadfsa')
        this.getFile()
    }
}
</script>