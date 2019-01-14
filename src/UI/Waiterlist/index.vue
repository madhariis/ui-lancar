<template>
    <div class="waiterlist-wrapper">
        <div class="waiterlist-header">
            <router-link tag="button" to="/" class="third"><i class="fa fa-arrow-left"></i></router-link>
            <div class="center">Waiter</div>
            <div class="right"></div>
        </div>
        <div v-for="(card, index) in orderData" :key="index" :class="'waiterlist-body'">
            <div class="waiter-table">Table {{card.table.title}}</div>
            <div v-for="(item, index) in card.items" :key="index" :class="'waiter-list'">
                <div>{{item.qty}}</div>
                <div class="title">{{item.menu.title}}</div>
                <div class="status">{{getState(item.state)}}</div>
                <div class="serve" @click="updateData(card.id, item.id, item.state, item.count)">
                    Serve
                    <div><i class="fa fa-arrow-right"></i></div>
                </div>
            </div>
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
      orderData: [],
      titleStatus: {
        ready_to_serve: {
          label: `Ready To Serve`,
          key: `served`
        },
        served: {
          label: `Served`,
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
        // console.log(data)
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
          item.count = item.qty
          if (item.qty === item.readyToServe) {
            item.state = `ready_to_serve`
          } else {
            deletedIndex.push(index)
          }
          return item
        })
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
    }
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
