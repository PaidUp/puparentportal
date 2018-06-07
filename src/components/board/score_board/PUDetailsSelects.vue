<template>
  <div class="details-selects">
    <md-field>
      <label>Season</label>
      <md-select v-model="movie" placeholder="Season">
        <md-option value="godfather">Example Sel</md-option>
      </md-select>
    </md-field>
    <md-field>
      <label>Program</label>
      <md-select v-model="movie1" placeholder="Program">
        <md-option value="godfather">Example Sel</md-option>
      </md-select>
    </md-field>
  </div>
</template>
<script>
export default {
  data () {
    return {
      movie: '',
      movie1: ''
    }
  }
}
</script>

