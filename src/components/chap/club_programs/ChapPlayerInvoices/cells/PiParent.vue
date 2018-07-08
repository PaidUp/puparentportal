<template>
  <td>
    <div>
      <select v-if="item.user" name="parent-s" class="custom-select" v-model="item.user.userEmail">
        <option value="volvo">Felipe Fernandex</option>
        <option value="saab">Savier Commns</option>
        <option value="ricardo@getpaidup.com">Rdo Lara</option>
        <option value="audi">Samuel Jaxson Super long input name</option>
      </select>
    </div>
  </td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

