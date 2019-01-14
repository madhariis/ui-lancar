<template>
    <div class="listdetail-wrapper">
        <h1>Order Status</h1>
        <div class="listdetail">
            <div v-for="(card, index) in cards" :key="index" :class="`order`" @click="toggle(card.title)" :style="{backgroundColor: card.color}">
                <div class="text">
                    <span>{{card.title}}</span>
                    <h2>{{card.count}}</h2>
                </div>
                <div class="titik">
                    ...
                </div>
            </div>
        </div>
        <div v-if="errors.length > 0">
          <div v-for="(error, index) in errors" :key="index" class="alert alert-danger" role="alert">
              {{ error.message }}
              <button type="button" class="close" aria-label="Close" @click="closeError()">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
        </div>
        <div class="btn">
            <router-link tag="button" class="secondary" to="/book">Add Order</router-link>
            <button class="secondary" @click="closeOrder()">Request Bill</button>
        </div>
        <div class="popup" v-if="isOpenWaiting">
            <div class="popup-content">
                <div class="popup-content-header">
                    <div class="close" @click="toggle('Waiting')"><i class="fa fa-arrow-left"></i></div>
                    <div class="title">Waiting</div>
                    <div class="right"></div>
                </div>
                <div class="popup-content-body">
                  <div class="popup-content-body-wrapper" v-for="(item, index) in getWaitingItem" :key="index">
                    <span>{{item.menu.title}}</span>
                    <div class="popup-qty">
                      <h4>{{item.waiting}}</h4>
                    </div>
                    <div class="popup-btn">
                        <button class="secondary" @click="removeItem(item)">-</button>
                        <h4>{{getCount(item)}}</h4>
                        <button class="secondary" @click="addItem(item)">+</button>
                    </div>
                  </div>
                </div>
                <div class="popup-content-footer">
                    <button @click="cancelOrder()">Cancel Order</button>
                </div>
            </div>
        </div>
        <div class="popup" v-if="isOpenProgress">
            <div class="popup-content">
                <div class="popup-content-header">
                    <div class="close" @click="toggle('On Progress')"><i class="fa fa-arrow-left"></i></div>
                    <div class="title">On Progress</div>
                    <div class="right"></div>
                </div>
                <div v-for="(progressItem, index) in getOnProgressItem" :key="index" class="popup-content-body">
                    <span>{{progressItem.menu.title}}</span>
                    <h4>{{progressItem.onProgress}}</h4>
                </div>
            </div>
        </div>
        <div class="popup" v-if="isOpenReadyToServe">
            <div class="popup-content">
                <div class="popup-content-header">
                    <div class="close" @click="toggle('Ready To Serve')"><i class="fa fa-arrow-left"></i></div>
                    <div class="title">Ready To Serve</div>
                    <div class="right"></div>
                </div>
                <div v-for="(readyItem, index) in getReadyToServeItem" :key="index" class="popup-content-body">
                    <span>{{readyItem.menu.title}}</span>
                    <h4>{{readyItem.readyToServe}}</h4>
                </div>
            </div>
        </div>
        <div class="popup" v-if="isOpenServed">
            <div class="popup-content">
                <div class="popup-content-header">
                    <div class="close" @click="toggle('Served')"><i class="fa fa-arrow-left"></i></div>
                    <div class="title">Served</div>
                    <div class="right"></div>
                </div>
                <div v-for="(servedItem, index) in getServedItem" :key="index" class="popup-content-body">
                    <span>{{servedItem.menu.title}}</span>
                    <h4>{{servedItem.served}}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import order from '@/api/order'
export default {
  name: 'pwa-listdetail',
  data(){
    return {
      isOpenWaiting: false,
      isOpenProgress: false,
      isOpenReadyToServe: false,
      isOpenServed: false,
      cards: [],
      orderData: '',
      counterWaiting: [],
      errors: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      (async () => {
        let data = await order.getMyOrder({token: this.token, tableId: this.tableId})
        this.$data.orderData = data
        this.$data.cards = [{
          title: `Waiting`,
          count: this.getStatusCount(`waiting`),
          color: `yellow`
        },{
          title: `On Progress`,
          count: this.getStatusCount(`onProgress`),
          color: `blue`
        },{
          title: `Ready To Serve`,
          count: this.getStatusCount(`readyToServe`),
          color: `green`
        },{
          title: `Served`,
          count: this.getStatusCount(`served`),
          color: `pink`
        }]
      })();
    },
    cancelOrder() {
      (async () => {
        const body = {
          orderId: this.orderId,
          cancel: this.counterWaiting.filter(x => x.qty !== 0)
        }
        let response = await order.cancelOrder(body, {token: this.token, tableId: this.tableId})
        this.getData()
        this.isOpenWaiting = !this.isOpenWaiting;
      })();
    },
    closeOrder() {
      (async () => {
        const body = {
          orderId: this.orderId
        }
        try {
          let response = await order.closeOrder(body, {token: this.token, tableId: this.tableId})
          this.isOpenWaiting = !this.isOpenWaiting;
          this.$store.dispatch(`saveTransactionId`, response.data.id);
          this.$router.push({ name: `billing` })
        } catch (err) {
          console.log(err)
          if (err.data) {
            this.errors = err.data.errors
          }
        }
      })();
    },
    closeError() {
      this.errors = []
    },
    toggle(title){
      if(title == 'Waiting'){
        this.isOpenWaiting = !this.isOpenWaiting;
      }
      if(title == 'On Progress'){
        this.isOpenProgress = !this.isOpenProgress;
      }
      if(title == 'Ready To Serve'){
        this.isOpenReadyToServe = !this.isOpenReadyToServe;
      }
      if(title == 'Served'){
        this.isOpenServed = !this.isOpenServed;
      }
    },
    getCount(item){
      return this.$data.counterWaiting.filter(x => x.menuId === item.menu.id).pop().qty
    },
    addItem(item){
      return this.$data.counterWaiting.map(x => {
        if (x.menuId === item.menu.id && item.waiting > x.qty) x.qty += 1
      })
    },
    removeItem(item){
      return this.$data.counterWaiting.map(x => {
        if (x.menuId === item.menu.id && x.qty !== 0) x.qty -= 1
      })
    },
    getStatusCount(args) {
      if (this.items) {
        const data = {
          waiting: () => this.getWaiting(),
          onProgress: () => this.getOnProgress(),
          readyToServe: () => this.getReady(),
          served: () => this.getServed(),
        }
        return data[args]()
      }
      return 0
    },
    getWaiting() {
      return this.items.reduce((x, curr) => {
        return x + curr.waiting
      }, 0)
    },
    getOnProgress() {
      return this.items.reduce((x, curr) => {
        return x + curr.onProgress
      }, 0)
    },
    getServed() {
      return this.items.reduce((x, curr) => {
        return x + curr.served
      }, 0)
    },
    getReady() {
      return this.items.reduce((x, curr) => {
        return x + curr.readyToServe
      }, 0)
    }
  },
  watch: {
    items: function () {
      this.$data.counterWaiting = this.items.map(x => {
        return {
          menuId: x.menu.id,
          qty: 0
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      tableId: 'tableId',
      token: 'token',
      orderId: 'orderId'
    }),
    items: function () {
      const data = this.$data.orderData
      return data.items
    },
    getWaitingItem: function () {
      return this.items.filter(x => x.waiting !== 0)
    },
    getOnProgressItem: function ()  {
      return this.items.filter(x => x.onProgress !== 0)
    },
    getReadyToServeItem: function ()  {
      return this.items.filter(x => x.readyToServe !== 0)
    },
    getServedItem: function ()  {
      return this.items.filter(x => x.served !== 0)
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
