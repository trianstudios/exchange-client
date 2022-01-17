<template>
    <form action="#" @submit.prevent="swapPlan">
        <div class="mb-6">
            <div class="mb-2 flex items-center" v-for="plan in plans" :key="plan.slug">
                <input type="radio" name="plan" :id="`plan_${plan.slug}`" class="mr-5" v-model="form.plan"
                       :value="plan.slug"
                       v-if="availablePlans.find(p => p.slug === plan.slug)"/>
                <label :for="`plan_${plan.slug}`" class="flex-grow">
                    <AppPlan :plan="plan"/>
                </label>
            </div>
        </div>

        <AppButton v-if="availablePlans.length" type="submit" :disabled="loading || !form.plan" :loading="loading"
                   title="Swap Plan"/>

        <p v-else class="text-gray-100 text-sm">
            There are no available plans for you to swap to right now, because you're using too much storage.
        </p>
    </form>
</template>

<script>
import axios from "axios";
import AppPlan from "@/components/AppPlan";
import {mapActions, mapGetters} from "vuex";
import AppButton from "@/components/AppButton";

export default {
    name: "SwapPlan",
    components: {AppButton, AppPlan},
    data() {
        return {
            loading: false,
            plans: [],
            planAvailability: [],
            form: {
                plan: null
            }
        }
    },
    methods: {
        ...mapActions({
            me: 'auth/me',
            snackbar: "snackbar/snackbar"
        }),
        async swapPlan() {
            this.loading = true

            try {
                await axios.patch('/api/v1/subscriptions', this.form)
                await this.me()
                this.loading = false

                this.snackbar(`You have swapped to the ${this.chosenPlan.name} plan`)

                this.$router.replace({name: 'account'})
            } catch (e) {
                this.loading = false
                console.log(e)
            }
        }
    },
    async mounted() {
        let plans = await axios.get('/api/v1/plans')
        this.plans = plans.data.data

        let planAvailability = await axios.get('/api/v1/user/plans/availability')
        this.planAvailability = planAvailability.data.data
    },
    computed: {
        ...mapGetters({
            user: "auth/user"
        }),
        availablePlans() {
            return this.plans.filter(plan => plan.slug !== this.user.plan.slug && this.planAvailability[plan.slug])
        },
        chosenPlan(){
            return this.plans.find(p => p.slug === this.form.plan)
        }
    }
}
</script>