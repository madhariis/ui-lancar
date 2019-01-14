<template>
   <div class="list-wrapper">
        <div class="list">
            <div @click="back"><i class="fa fa-arrow-left"></i></div>
            <div class="center">Confirmation</div>
        </div>
        <div class="order-body">
            <div class="order-body-header">List Ordered Items</div>
            <div class="line"></div>
            <div v-for="(card, index) in cards" :key="`1-${index}`" :class="'order-body-item'">
                <div>{{card.title}}</div>
                <div class="order-body-item-price">Rp. {{card.price}}</div>
                <div class="order-body-item-description">{{card.description}}</div>
                <div class="order-body-item-spinner">
                  <button @click="removeItem(card)">-</button>
                  <span>{{card.count}}</span>
                  <button @click="addItem(card)">+</button>                    
                </div>
            </div>
            <div class="line"></div>

        <div class="addmore">
            <router-link to="/book" tag="button">
                + ADD MORE ITEMS
            </router-link>
        </div>
        <div class="order-foot">
            Order Detail
        </div>
        <div class="line"></div>
        <div v-for="(card1, index) in cards1" :key="`2-${index}`" :class="'order-footer'">
            <div class="order-footer-title">{{card1.title}}</div>
            <div class="order-footer-price">Rp. {{card1.price * card1.count}}</div>
        </div>
        
        <div class="line"></div>
        <div class="order-footer-wrapper">
            <div class="total">
                Total
                <div class="total-price">Rp. {{total}} </div>
            </div>

            <div class="tax">
                Tax
                <div class="tax-price">Rp. {{tax}} </div>
            </div>

            <div class="discount">
                Discount
            <div class="discount-price">Rp.0</div>
            </div>

            <div class="gtotal">
            <div>GrandTotal</div>
            <div class="gtotal-price">Rp. {{grand}}</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-foot-text">
            This price above is just for our estimated,
            you can estimated by your self if you didnt trust this program.
            but I just notice you,
            this system build by program so the price actualy correct price.
            thanks for read this notice. have a nice dream
        </div>
    </div>
        <div class="confirm">
            <button @click="order" :disabled="isButtonDisabled">Order</button>
            <!-- <router-link tag="button" to="/detail">Order</router-link> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/order'
export default {
  name: 'pwa-orderlist',
  data(){
    return{
      taxAll: 0
    }
  },
  methods: {
    totalDetail(x, y) {
      return x * y
    },
    back(){
      this.$router.go(-1)
    },
    unOrderItem(menu){
      const filtered = this.cards.filter(x => x.id === menu.id)
      let index = this.cards.indexOf(filtered.pop());
      if (index !== -1) {
        this.cards.splice(index, 1);
        this.$store.dispatch(`removeItems`, menu);
      }
    },
    addItem(menu){
      menu.count += 1;
      this.$store.dispatch(`addQtyItems`, menu);
      this.$forceUpdate()
    },
    removeItem(menu){
      if(menu.count > 1){
        menu.count -= 1;
      }
      else if(menu.count == 1){
        this.unOrderItem(menu)
      }
      this.$store.dispatch(`subQtyItems`, menu);
      this.$forceUpdate()
    },
    prepareData(){
      const items = this.cards.map(x => {
        return {
          menuId: x.id,
          qty: x.count
        }
      })
      return { items }
    },
    order(){
      (async () => {
        const body = this.prepareData()
        if (this.orderId !== ``) {
          body.orderId = this.orderId
        }
        try {
          let response = await api.postOrder(body, {
            token: this.token,
            tableId: this.tableId
          })
          const { id } = response.data
          this.$store.dispatch(`emptyItems`);
          this.$store.dispatch(`saveOrderId`, id);
          this.$router.push({ name: `detail` })
        } catch (err) {
          console.log(err)
        }
      })();
    }
  },
  computed: {
    ...mapGetters({
      cards: `orderedItems`,
      total: `total`,
      token: `token`,
      tableId: `tableId`,
      orderId: `orderId`
    }),
    tax: function () {
      return (this.total * 10) / 100
    },
    grand: function () {
      return this.total + this.tax
    },
    isButtonDisabled: function(){
      return this.cards.length === 0
    },
    cards1: function(){
      return this.cards
    },

  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>

