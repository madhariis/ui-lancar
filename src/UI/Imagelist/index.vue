<template>
<div>
    <div v-for="(card, index) in cards" :key="index" :class="'image'">
      <img :src="card.qrCode" alt="">
      {{card.title}}
    </div>
</div>
</template>

<script>
import table from '@/api/table'
export default {
    name: 'pwa-imagelist',
    data(){
        return{
            cards:[

            ]
        }
    },
    mounted(){
      this.loadData()
    },
    methods:{
        loadData() {
        (async () => {
            let data = await table.getTable()
            this.$data.cards = data;
        })();
        }
    }
}
</script>

<style lang="scss" scoped>
 @import "./index.scss";
</style>
