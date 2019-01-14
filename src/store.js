import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: '',
    token: '',
    tableId: '',
    uniqueCode: '',
    orderId: '',
    transactionId: '',
    registeredCustomer: false,
    orderedItems: [],
    total: 0,
    userToken: '',
    userRole: '',
    userId: '',
    username: '',
    isLoginUser: false
  },
  getters: {
    search: state => state.search,
    orderedItems: state => state.orderedItems,
    total: state => state.total,
    token: state => state.token,
    tableId: state => state.tableId,
    uniqueCode: state => state.uniqueCode,
    orderId: state => state.orderId,
    transactionId: state => state.transactionId,
    userToken: state => state.userToken,
    userRole: state => state.userRole,
    userId: state => state.userId,
    username: state => state.username,
    isLoginUser: state => state.isLoginUser
  },
  mutations: {
    register (state, data) {
      state.registeredCustomer = true
      state.token = data.token
      state.tableId = data.tableId
      state.uniqueCode = data.uniqueCode
    },
    registerUser (state, data) {
      state.isLoginUser = true
      state.userToken = data.token
      state.userRole = data.role
      state.userId = data.id
      state.username = data.username
    },
    saveOrderId (state, data) {
      state.orderId = data
    },
    saveTransactionId (state, data) {
      state.transactionId = data
    },
    createItems (state, data) {
      if (state.orderedItems.length === 0) state.orderedItems = data
    },
    addItems (state, data) {
      if (state.orderedItems.length === 0) {
        state.orderedItems.unshift(data)
      } else {
        const idx = state.orderedItems.findIndex(el => {
          return el.id === data.id
        })
        if (idx === -1) {
          state.orderedItems.unshift(data)
        } else {
          state.orderedItems[idx].count += data.count
        }
      }
    },
    emptyItems (state) {
      state.orderedItems = []
    },
    removeItems (state, data) {
      state.orderedItems.filter((item, index) => {
        return item.id !== data.id
      })
    },
    subQtyItems (state, data) {
      state.orderedItems.forEach((el, index) => {
        if (el.id === data.id) {
          state.orderedItems[index].count = data.count
        }
      })
    },
    addQtyItems (state, data) {
      state.orderedItems.forEach((el, index) => {
        if (el.id === data.id) {
          state.orderedItems[index].count = data.count
        }
      })
    },
    changeTotal (state) {
      const subTot = state.orderedItems.map(x => x.price * x.count)
      state.total = subTot.reduce((x, curr) => { return x + curr }, 0)
    },
    reset (state) {
      state.token = ''
      state.tableId = ''
      state.uniqueCode = ''
      state.orderId = ''
      state.transactionId = ''
    },
    resetUser (state) {
      state.isLoginUser = false
      state.userToken = ''
      state.userRole = ''
      state.userId = ''
      state.username = ''
    }
  },
  actions: {
    register ({ commit }, payload) {
      commit(`register`, payload)
    },
    registerUser ({ commit }, payload) {
      commit(`registerUser`, payload)
    },
    saveOrderId ({ commit }, payload) {
      commit(`saveOrderId`, payload)
    },
    saveTransactionId ({ commit }, payload) {
      commit(`saveTransactionId`, payload)
    },
    createItems ({ commit }, payload) {
      commit(`createItems`, payload)
    },
    addItems ({ commit }, payload) {
      commit(`addItems`, payload)
      commit(`changeTotal`)
    },
    emptyItems ({ commit }, payload) {
      commit(`emptyItems`, payload)
      commit(`changeTotal`)
    },
    removeItems ({ commit }, payload) {
      commit(`removeItems`, payload)
      commit(`changeTotal`)
    },
    reset ({ commit }) {
      commit(`reset`)
    },
    resetUser ({ commit }) {
      commit(`resetUser`)
    },
    subQtyItems ({ commit }, payload) {
      commit(`subQtyItems`, payload)
      commit(`changeTotal`)
    },
    addQtyItems ({ commit }, payload) {
      commit(`addQtyItems`, payload)
      commit(`changeTotal`)
    }
  },
  plugins: [createPersistedState({
    reducer: state => ({
      token: state.token,
      tableId: state.tableId,
      uniqueCode: state.uniqueCode,
      orderId: state.orderId,
      transactionId: state.transactionId,
      userToken: state.userToken,
      userRole: state.userRole,
      userId: state.userId,
      username: state.username,
      isLoginUser: state.isLoginUser
    })
  })]
})
