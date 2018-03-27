import crypto from 'crypto'

function addMessage (state, content) {
  let newMessage = JSON.parse(JSON.stringify(state.messages))
  newMessage[content.id] = {
    type: content.type,
    content: content.payload
  }
  state.showSnackbar = true
  state.messages = newMessage
}

function setMessage (context, payload, type) {
  const id = crypto.randomBytes(16).toString('hex')
  context.commit('add', {
    id,
    payload,
    type
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      context.commit('remove', id)
      resolve(id)
    }, 5000)
  })
}

const module = {
  namespaced: true,

  state: {
    messages: {},
    showSnackbar: false
  },

  mutations: {
    add (state, content) {
      addMessage(state, content)
    },
    clean (state) {
      state.messages = {}
    },
    remove (state, id) {
      let newMessage = JSON.parse(JSON.stringify(state.messages))
      delete newMessage[id]
      state.messages = newMessage
      if (!Object.keys(state.messages).length) {
        state.showSnackbar = false
      }
    }
  },
  actions: {
    setInfo (context, payload) {
      return setMessage(context, payload, 'info')
    },
    setSuccess (context, payload) {
      return setMessage(context, payload, 'success')
    },
    setWarning (context, payload) {
      return setMessage(context, payload, 'warning')
    },
    setDanger (context, payload) {
      return setMessage(context, payload, 'danger')
    }
  }
}

export default module
