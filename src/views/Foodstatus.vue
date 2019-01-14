<template>
    <div class="foodstatus">
        <pwa-menu title='FoodStatus'/>
        <pwa-foodstatuslist/>
    </div>
</template>

<script>
import Foodstatuslist from '@/UI/Foodstatuslist';
import Menu from '@/UI/Menu';
export default {
    name: 'pwa-foodstatus',
    components: {
        'pwa-foodstatuslist': Foodstatuslist,
        'pwa-menu': Menu,

    }
}
</script>

<style>

</style>
