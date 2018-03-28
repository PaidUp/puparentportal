<template>
  <div class="top-toolbar">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/app-logo-white.svg" />
      </router-link>
    </div>
    <div class="search-input">
      <md-icon>search</md-icon>
      <input type="text" placeholder="Search">
    </div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      msg: 'THEE MSAGE BIATH'
    }
  }
}
</script>

