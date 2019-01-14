<template>
    <div class="waiter">
        <pwa-waiterlist/>
    </div>
</template>

<script>
import waiterlist from '@/UI/Waiterlist'
export default {
    name: 'pwa-waiter',
    components:{
        'pwa-waiterlist': waiterlist
    }
}
</script>

<style>

</style>
