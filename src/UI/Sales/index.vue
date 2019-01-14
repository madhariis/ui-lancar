<template>
    <div class="sales">
        <div class="sales-header">
            Sales
        </div>
        <div class="sales-content">
          <v-date-picker
            v-model="start"
            :formats='formats'
            :attributes="attrs"
            :popoverVisibility="'focus'">
          </v-date-picker>
        </div>
        <div class="sales-content">
          <v-date-picker
            v-model="end"
            :formats='formats'
            :attributes="attrs"
            :popoverVisibility="'focus'">
          </v-date-picker>
        </div>
        <div class="sales-content" v-for="(transaction, index) in transactions" :key="index">
            <h5>{{transaction.menu_title}}</h5>
            <h5>{{formatCurrency(transaction.total)}}.</h5>
        </div>
        <div class="sales-customer">
            <h4>Total Customer:</h4>
            {{customerCount}} Customer
        </div>
    </div>
</template>

<script>
import transaction from '@/api/transaction'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import calendar from 'v-calendar'
import { DateTime } from 'luxon';
export default {
  name: 'pwa-sales',
  components: {
    'v-calendar': calendar
  },
  data(){
    return{
      transactions: [],
      customerCount: 0,
      start: null,
      end: null,
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080',
          },
          dates: new Date()
        }
      ],
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'W',
        navMonths: 'MMM',
        input: ['YYYY-MM-DD'], // Only for `v-date-picker`
        dayPopover: 'YYYY-MM-DD', // Only for `v-date-picker`
        data: ['YYYY-MM-DD'] // For attribute dates
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData() {
      (async () => {
        const query = {
          start: DateTime.fromJSDate(this.start).toISODate() || undefined,
          end: DateTime.fromJSDate(this.end).toISODate() || undefined
        }
        const data = await transaction.getTransaction(query)
        this.mapData(data)
      })();
    },
    mapData (data) {
      const { transaction, customer } = data
      this.transactions = transaction,
      this.customerCount = customer
    },
    formatCurrency (data) {
      return formatMoney(data, {symbol: "Rp. ", precision: 2})
    }
  },
  watch: {
    start () {
      this.loadData()
    },
    end () {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
