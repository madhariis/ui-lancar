<template>
    <div class="order">
        <pwa-orderlist/>
    </div>
</template>

<script>
import Orderlist from '@/UI/Orderlist';  
export default {
    name:'pwa-order',
    components: {
        'pwa-orderlist': Orderlist
    }
}
</script>

<style>

</style>
