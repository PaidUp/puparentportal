const module = {
  namespaced: true,

  state: {
    showNavigation: false
  },

  mutations: {
    toggleNavigation (state) {
      state.showNavigation = !state.showNavigation
    }
  }
}

export default module
