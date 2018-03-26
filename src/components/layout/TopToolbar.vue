<template>
  <div class="top-toolbar">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/app-logo-white.svg" />
      </router-link>
    </div>
    <md-field class="search-input md-accent">
      <label>Search</label>
      <md-input></md-input>
      <md-icon>search</md-icon>
    </md-field>
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

