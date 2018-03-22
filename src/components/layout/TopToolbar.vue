<template>
  <div class="top-toolbar md-layout md-alignment-center-left">
    <router-link to="/" class="md-layout-item md-size-30">
      <img class="logo" src="@/assets/app-logo-white.svg" />
    </router-link>
    <md-field class="search-input md-layout-item md-size-40">
      <label>Search</label>
      <md-input></md-input>
      <md-icon>search</md-icon>
    </md-field>
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

