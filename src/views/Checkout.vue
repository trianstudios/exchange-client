<template>
    <form action="" @submit.prevent="submit">
        <div class="mb-6">
            <label for="name" class="inline-block text-sm mb-2">Your Name</label>
            <input type="text" id="name" v-model="form.name"
                   class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"/>
        </div>
        <div class="mb-6">
            <label for="card" class="inline-block text-sm mb-2">Card Details</label>
            <div id="card" ref="card"></div>
        </div>
        <AppButton type="submit" :disabled="loading || !form.name" :loading="loading" title="Purchase"/>
    </form>
</template>

<script>
import {mapActions} from "vuex";

// eslint-disable-next-line no-undef
const stripe = Stripe(process.env.VUE_APP_STRIPE_KEY)
const elements = stripe.elements();
const cardElement = elements.create('card');

import axios from "axios";
import AppButton from "@/components/AppButton";

export default {
    name: "Checkout",
    components: {AppButton},
    data() {
        return {
            loading: false,
            intent: {
                client_secret: null
            },
            form: {
                name: ""
            }
        }
    },
    props: {
        plan: {
            required: true,
            type: String
        }
    },
    methods: {
        ...mapActions({
            me: "auth/me",
            snackbar: "snackbar/snackbar"
        }),
        async submit() {
            this.loading = true

            const {setupIntent, error} = await stripe.confirmCardSetup(
                this.intent.client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: this.form.name
                        }
                    }
                }
            )

            if (error) {
                console.log(error)
            } else {
                await this.createSubscription(setupIntent.payment_method)
            }

            this.loading = false
        },
        async createSubscription(token) {
            await axios.post('/api/v1/subscriptions', {
                plan: this.plan,
                token
            })

            await this.me()

            this.snackbar("Subscription created. Thank you!")

            await this.$router.replace({name: "account"})
        }
    },
    async mounted() {
        let response = await axios.get('/api/v1/subscriptions/intent')

        this.intent.client_secret = response.data.data.client_secret;

        cardElement.mount(this.$refs.card)
    }
}
</script>