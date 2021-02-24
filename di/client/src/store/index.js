import Vue from 'vue'
import Vuex from 'vuex'
import store from './module-example'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      store
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  /*
  if we want some HMR magic for it, we handle
  the hot update like below. Notice we guard this
  code with "process.env.DEV" -- so this doesn't
  get into our production build (and it shouldn't).
  */
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./module-example'], () => {
      const newStore = require('./module-example').default
      Store.hotUpdate({ modules: { store: newStore } })
    })
  }
  return Store
}
