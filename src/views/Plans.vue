<template>
    <div>
        <router-link :to="{ name: 'checkout', query: { plan: plan.slug } }" v-for="plan in buyablePlans" :key="plan.slug">
            <AppPlan :plan="plan" class="mb-2" />
        </router-link>
    </div>
</template>

<script>
import axios from "axios";
import AppPlan from "@/components/AppPlan";

export default {
    name: "Plans",
    components: {AppPlan},
    data() {
        return {
            plans: []
        }
    },
    async mounted() {
        let response = await axios.get('/api/v1/plans')
        this.plans = response.data.data
    },
    computed: {

        buyablePlans(){
            return this.plans.filter(plan => !plan.free)
        }
    }
}
</script>