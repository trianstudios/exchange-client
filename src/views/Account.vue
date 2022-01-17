<template>
    <div>
        <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">
            Subscription
        </h2>
        <div class="mt-3 text-sm">
            <p class="mb-2">
                You are on the <strong>{{ user.plan.name }}</strong> plan.
                <template v-if="user.ends_at">Your current subscription ends
                    <strong>{{ user.ends_at }}</strong></template>
            </p>
            <router-link :to="{ name: 'swapPlan' }" class="text-indigo-500" v-if="user.subscribed">Swap Plan</router-link>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "Account",
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
}
</script>