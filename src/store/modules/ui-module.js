const module = {
  namespaced: true,

  state: {
    showNavigation: false
  },

  mutations: {
    toggleNavigation (state, event) {
      state.showNavigation = event === true
    }
  }
}

export default module
