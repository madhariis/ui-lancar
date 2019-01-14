<template>
    <div class="foodstock">
          <pwa-menu title="Manage Food"/>
        <pwa-foodstocklist/>
    </div>
</template>

<script>
import Foodstocklist from '@/UI/Foodstocklist'
import Menu from '@/UI/Menu';
export default {
    name: 'pwa-foodstock',
    components:{
        'pwa-foodstocklist': Foodstocklist,
            'pwa-menu': Menu,
    }
}
</script>

<style>

</style>
