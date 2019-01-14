<template>
  <div id='app'>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "~@/styles/base";
@import "~@/styles/fonts";
@import "~@/styles/icons";

main {
  position: relative;
  max-width: 425px;
  padding: 0 14px;
  margin: 0 auto;
  margin-bottom: 90px;
}
</style>
