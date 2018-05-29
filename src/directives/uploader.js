export default {
  bind (el, binding, vnode) {
    el.addEventListener('change', e => {
      vnode.context.file = e.target.files[0]
    })
  }
}
