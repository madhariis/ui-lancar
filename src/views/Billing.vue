<template>
    <div class="billing">
        <pwa-billinginfo/>
    </div>
</template>

<script>
import billinginfo from '@/UI/Billinginfo'
export default {
    name: 'pwa-billing',
    components: {
        'pwa-billinginfo': billinginfo
    }
}
</script>

<style>

</style>
