<template>
    <div class="scan">
        <pwa-scandetail v-if="needScan" :errors.sync="errors"/>
        <div v-for="(error, index) in errors" :key="index" class="alert alert-danger" role="alert">
            {{ error.message }}
            <button type="button" class="close" aria-label="Close" @click="closeError()">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import table from '@/api/table'
import scandetail from '@/UI/Scandetail'
export default {
    name: 'pwa-scan',
    components:{
    'pwa-scandetail': scandetail
    },
    data() {
        return {
            needScan: false,
            errors: []
        }
    },
    created() {
        let query = this.$route.query;
        if(query.code){
            this.$data.needScan = false;
            this.register(query.code)
        } else {
            this.$data.needScan = true;
        }
    },
    mounted() {

    },
    methods: {
        register (code) {
            (async () => {
                try {
                    let response = await table.register(code)
                    this.processData(response.data)
                } catch (err) {
                    this.$data.errors = err.response.data.errors
                }
            })();
        },
        processData ({ token, uniqueCode, id }) {
            this.$store.dispatch(`register`, {token, uniqueCode, tableId: id});
            this.$router.push({ name: 'book' })
        },
        closeError () {
          this.$data.errors = []
        }
    }
}
</script>

<style lang="scss" scoped>
    .scan {
        height: 100%;
    }
</style>
