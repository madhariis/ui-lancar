<template>
  <div class="list">
    <div class="list-wrapper">
      <div v-if="!search" class="category" v-for="(item, index) in items" :key="index">
        <div class="category-title">
          <h4>{{item.title}}</h4>
        </div>
        <div class="category-menu">
          <div class="category-menu-wrapper" v-for="(menu, index) in item.menus" :key="index">
            <div class="menu-image">
              <img v-if="menu.images.length > 0" :src="menu.images[0].imageData" :alt="menu.images[0].name">
              <img v-else src="http://via.placeholder.com/300x300" alt="">
            </div>
            <div class="details">
              <h5 class="details-title">{{menu.title}}</h5>
              <div class="details-footer">
                <p>{{menu.description}}</p>
                <div v-if="orderedItem(menu)" class="details-footer-action">
                  <b>Rp. {{menu.price}}</b>
                  <div>
                    <button class="secondary" @click="removeItem(menu)">
                    -
                    </button>
                    <div>
                      <span>{{getCount(menu)}}</span>
                    </div>
                    <button @click="addItem(menu)" class="secondary">
                    +
                    </button>
                  </div>
                </div>
                <div v-else class="details-footer-action">
                  <b>Rp. {{menu.price}}</b>
                  <button @click="order(menu)" class="secondary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="search" class="category-menu">
          <h4>Search Results</h4>
          <div class="category-menu-wrapper" v-for="(menu, index) in filteredList" :key="index">
            <div class="menu-image">
              <img :src="menu.img" alt="">
            </div>
            <div class="details">
              <h5>{{menu.name}}</h5>
              <div class="details-footer">
                <p>{{menu.description}}</p>
                <div v-if="orderedItem(menu)" class="details-footer-action">
                  <b>Rp. {{menu.price}}</b>
                  <div>
                    <button class="secondary" @click="removeItem(menu)">
                    -
                    </button>
                    <div>
                      <span>{{getCount(menu)}}</span>
                    </div>
                    <button @click="addItem(menu)" class="secondary">
                    +
                    </button>
                  </div>
                </div>
                <div v-else class="details-footer-action">
                  <b>Rp. {{menu.price}}</b>
                  <button @click="order(menu)" class="secondary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="floating-menu">
      <div>
    <h5>Estimated Price</h5>
      <div class="price">
        Rp. {{estimatedPrice()}}
      </div>
      </div>
      <router-link to="/order" tag="button" class="secondary">
        <i class="fa fa-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import menu from '@/api/menu'

export default {
  name: 'pwa-list',
  data(){
    return {
      items: []
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      (async () => {
        let data = await menu.menuByCategory()
        this.$data.items = data;
        this.attachCount()
      })();
    },
    attachCount() {
      if (this.ordered.length > 0) {
        const mappedOrdered = {}
        this.ordered.forEach(x => {
          mappedOrdered[x.id] = x.count
        })
        this.$data.items.forEach((item, indexItem) => {
          item.menus.forEach((menu, indexMenu) => {
            this.$data.items[indexItem].menus[indexMenu].count = mappedOrdered[menu.id]
          })
        });
      }
    },
    order(item){
      item.count = 1
      this.$store.dispatch(`addItems`, item);
    },
    unOrderItem(menu){
      const filtered = this.ordered.filter(x => x.id === menu.id)
      let index = this.ordered.indexOf(filtered.pop());
      if (index !== -1) {
        this.ordered.splice(index, 1);
        this.$store.dispatch(`removeItems`, menu);
      }
    },
    orderedItem(menu){
      const menuIdList = this.ordered.map(x => x.id)
      return menuIdList.includes(menu.id)
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
    getCount(menu){
      return this.ordered.filter(x => x.id === menu.id).pop().count
    },
    estimatedPrice(){
      return this.ordered.reduce((x, curr) => {
        return x + (curr.price * curr.count)
      }, 0)
    }
  },
  computed: {
    ...mapGetters({
      search: 'search',
      ordered: 'orderedItems'
    }),
    filteredList() {
      let data = this.$data.items;
      var temp = []
      for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].menus.length; j++){
          if(data[i].menus[j].title.toLowerCase().includes(this.$store.state.search.toLowerCase())){
            temp.push(data[i].menus[j]);
          }
        }
      }
      return temp
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
