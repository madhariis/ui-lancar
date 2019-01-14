<template>
  <div class="qrcode-wrapper">
    <div class="center">
        <div>New era of resaurant</div>
        <div>Welcome to e-Menu</div>
    </div>
    <div class="qrcode">
      <qrcode-reader @decode="onDecode" :paused="paused"></qrcode-reader>
      <div class="bawah">
        <router-link tag="button" to="/book">
            Scan me
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import table from '@/api/table'
export default {
name: 'pwa-scandetail',
  props: {
    errors: {
      required: false
    }
  },
  data() {
    return {
      tableData: '',
      paused: false
    }
  },
  methods: {
    onDecode (decodeString)
    {
      (async () => {
        this.paused = true
        if (decodeString.indexOf(`:`) === -1) {
          try {
            let response = await table.register(decodeString)
            this.tableData = response.data
            this.processData()
          } catch (err) {
            this.$emit(`update:errors`, err.response.data.errors)
          }
        } else {
          const [type, username, role, uniqueCode] = decodeString.split(`:`)
          try {
            let response = await table.loginUser({
              username,
              uniqueCode
            })
            this.processDataUser(response.data)
          } catch (err) {
            this.$emit(`update:errors`, err.response.data.errors)
          }
        }
      })();
    },
    processData () {
      const { token, uniqueCode, id } = this.tableData
      this.$store.dispatch(`register`, {token, uniqueCode, tableId: id})
      this.$router.push({ name: 'book' })
    },
    processDataUser (data) {
      const { token, id, role, username } = data
      this.$store.dispatch(`registerUser`, {token, id, role, username})
      if (role === `waiter`) {
        this.$router.push({ name: 'waiter' })
      } else if (role === `kitchen`) {
        this.$router.push({ name: 'foodstatus' })
      } else {
        this.$router.push({ name: 'manager' })
      }
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
