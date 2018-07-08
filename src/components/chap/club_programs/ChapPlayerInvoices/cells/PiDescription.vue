<template>
  <td><input type="text" class="custom-input" :value="item.title"></td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

  