<template>
    <div class="waiterlist-wrapper">
        <div v-for="(card, index) in orderData" :key="index" :class="'waiterlist-body'">
            <div class="waiter-table">Table {{card.table.title}}</div>
            <div v-for="(item, indexItem) in card.items" :key="indexItem" :class="'waiter-list'">
                <div>{{item.qty}}</div>
                <div class="title">{{item.menu.title}}</div>
                <div class="status">{{getState(item.state)}}</div>
                <div class="spiner">
                    <button class="secondary" @click="minCount(index, indexItem)">-</button>
                    <div class="qty">{{item.count}}</div>
                    <button class="secondary" @click="addCount(index, indexItem)">+</button>
                </div>
                <button v-if="item.state !== `ready_to_serve`" class="arrow" @click="updateData(card.id, item.id, item.state, item.count)"><i class="fa fa-arrow-right"></i></button>
            </div>
        </div>
              <div class="manage">
                  <router-link to="/foodstock" tag="button">
                          MANAGE FOOD
                  </router-link>
              </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import order from '@/api/order'
export default {
  name: 'pwa-waiterlist',
  data(){
    return{
      cards:[{
          table: '1',
          menus:[{
              count: '20',
              title: 'Latte',
              status: 'Waiting',
              qty: '0'
          },{
              count: '20',
              title: 'Ramen',
              status: 'On progress',
              qty: '0'
          },{
              count: '20',
              title: 'Water',
              status: 'Ready to serve',
              qty: '0'
          }]
      },{
          table: '2',
          menus:[{
              count: '20',
              title: 'Latte',
              status: 'Waiting',
              qty: '0'
          },{
              count: '20',
              title: 'Ramen',
              status: 'On Progress',
              qty: '0'
          },{
              count: '20',
              title: 'Rice',
              status: 'Ready to serve',
              qty: '0'
          }]
      }],
      orderData: [],
      titleStatus: {
        waiting: {
          label: `Waiting`,
          key: `onProgress`
        },
        on_progress: {
          label: `On Progress`,
          key: `readyToServe`
        },
        ready_to_serve: {
          label: `Ready To Serve`,
          key: `served`
        },
        queued: {
          label: `gh`,
          key: ``
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      (async () => {
        let data = await order.getAllOrder(this.userToken)
        const mapped = this.mapResponse(data)
        this.$data.orderData = mapped
      })();
    },
    updateData(orderId, itemId, state, count) {
      (async () => {
        if (count !== 0) {
          const body = {
            orderId,
            itemId
          }
          body[this.titleStatus[state].key] = count
          let data = await order.updateStatus(body, this.userToken)
          this.$nextTick(function () {
            this.getData()
          })
        }
      })();
    },
    mapResponse (data) {
      return data.map(list => {
        let tempItem = []
        let deletedIndex = []
        list.items = list.items.map((item, index) => {
          item.count = 0
          if (item.qty === item.waiting) {
            item.state = `waiting`
          } else if (item.qty === item.onProgress) {
            item.state = `on_progress`
          } else if (item.qty === item.readyToServe) {
            item.state = `ready_to_serve`
          } else {
            if (item.waiting != 0){
              let temp = {
                ...item,
                state: `waiting`,
                qty: item.waiting
              }
              tempItem.push(temp)
            }
            if (item.onProgress != 0){
              let temp = {
                ...item,
                state: `on_progress`,
                qty: item.onProgress
              }
              tempItem.push(temp)
            }
            if (item.readyToServe != 0){
              let temp = {
                ...item,
                state: `ready_to_serve`,
                qty: item.readyToServe
              }
              tempItem.push(temp)
            }
            deletedIndex.push(index)
          }
          return item
        })
        tempItem.forEach(z => list.items.push(z) )
        list.items = list.items.filter((ls, id) => {
          const cek = deletedIndex.some(idx => {
            return id === idx
          })
          if (!cek) return ls
        })
        return list
      })
    },
    getState(state) {
      if (state)
        return this.titleStatus[state].label
    },
    addCount(tableIndex, itemIndex) {
      if (this.$data.orderData[tableIndex].items[itemIndex].count < this.$data.orderData[tableIndex].items[itemIndex].qty)
        this.$data.orderData[tableIndex].items[itemIndex].count += 1
    },
    minCount(tableIndex, itemIndex) {
      if (this.$data.orderData[tableIndex].items[itemIndex].count > 0)
        this.$data.orderData[tableIndex].items[itemIndex].count -= 1
    },
  },
  computed: {
    ...mapGetters({
      userToken: 'userToken',
      userRole: 'userRole',
      userId: 'userId',
      username: 'username',
    }),
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
