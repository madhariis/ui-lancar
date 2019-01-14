<template>
<div class="home">
  <pwa-menu title="Title" />
  <pwa-slider/>
  <list-menu />
</div>
</template>

<script>
import Slider from '@/UI/Slider';
import Menu from '@/UI/Menu';
import List from '@/UI/List';

export default {
  name:'pwa-home',
  components: {
    'pwa-slider': Slider,
    'pwa-menu': Menu,
    'list-menu': List
  }
  
}
</script>

<style>

</style>
