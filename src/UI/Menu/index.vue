<template>
  <div class="menu-wrapper">
    <div class="menu">
      <div @click="back" class="left">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 31.494 31.494" style="enable-background:new 0 0 31.494 31.494;" xml:space="preserve">
          <path style="fill:#1E201D;" d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
            c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
            c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
          <g>
          </g>
        </svg>
      </div>
      <h1 class="center">
        {{title}}
      </h1>
      <div class="right">
        
      </div>
    </div>
    <div class="search" v-if="isShow">
      <input type="text" placeholder="Search" v-model="search">
    </div>
  </div>
</template>

<script>
export default {
  name: 'pwa-menu',
  props: {
      title: String
  },
  data(){
    return {
      isShow : false,
      search: ''
    }
  },
  methods: {
    toggleShow(){
      this.$data.isShow = !this.$data.isShow;
    },
    back(){
      this.$router.go(-1);
    }
  },
  watch: {
    search() {
      this.$store.state.search = this.search;
    }
  }
}
</script>

<style lang="scss" >
@import "~@/styles/variables";
.menu-wrapper{
  padding: 15px 0;

  .menu {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      svg{
        width: 14px;
        cursor: pointer;
      }
    }

    .right {
      i {
        cursor: pointer;
      }
    }

    .center {
      font-size: 15px;
      font-weight: bold;
      //color: $white;
    }
  }

  .search {
    background-color: gray;
    padding: 1px;
    position: relative;

    input {
      border-radius: 1px;
      padding: 3px;
    }
  }
}


</style>
