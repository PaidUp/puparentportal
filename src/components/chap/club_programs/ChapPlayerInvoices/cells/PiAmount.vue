<template>
  <td><span>$</span><input type="text" class="custom-input" :value="item.price"></td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

