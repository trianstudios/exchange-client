<template>
    <div class="w-10/12 md:6/12 mx-auto">
        <form action="" @submit.prevent="register" class="mb-8">
            <div class="mb-6">
                <div class="mb-3">
                    <label for="name" class="inline-block text-sm mb-2">Name</label>
                    <input type="text" id="name" v-model="form.name" :class="{ 'border-red-500': errors.name }" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" />
                    <div v-if="errors.name" class="text-red-500 text-sm mt-2">{{ errors.name[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="email" class="inline-block text-sm mb-2">Email Address</label>
                    <input type="email" id="email" v-model="form.email" :class="{ 'border-red-500': errors.email }" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" />
                    <div v-if="errors.email" class="text-red-500 text-sm mt-2">{{ errors.email[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="password" class="inline-block text-sm mb-2">Password</label>
                    <input type="password" id="password" v-model="form.password" :class="{ 'border-red-500': errors.password }" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" />
                    <div v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="password_confirmation" class="inline-block text-sm mb-2">Password Confirmation</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation" :class="{ 'border-red-500': errors.password_confirmation }" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" />
                    <div v-if="errors.password_confirmation" class="text-red-500 text-sm mt-2">{{ errors.password_confirmation[0] }}</div>
                </div>
            </div>

            <AppButton type="submit" :disabled="loading" :loading="loading" title="Create Account" />
        </form>
        <p class="text-sm text-gray-800">
            Already have an account? <router-link :to="{ name: 'login' }" class="text-indigo-500">Sign in</router-link>
        </p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from "@/components/AppButton";
import axios from "axios";
export default {
    name: "Register",
    components: {AppButton},
    data(){
        return {
            loading: false,
            errors: {},
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    methods: {
        ...mapActions({
            loginAction: 'auth/login'
        }),
        async register(){
            this.loading = true

            try {
                await axios.post('/api/v1/register', this.form)

                await this.loginAction({
                    email: this.form.email,
                    password: this.form.password
                });

                this.loading = false

                this.$router.replace({ name: "account" })

            }catch (e){
                this.loading = false

                if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
            }
        }
    }
}
</script>
