import Vue from 'vue'
import Vuex from 'vuex'
import storedata from './storedata'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    storedata
  }
})
