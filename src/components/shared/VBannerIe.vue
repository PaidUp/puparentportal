<template>
  <div class="banner" v-if="isIE"> 
    <md-icon style="color: red">warning</md-icon> BROWSER NOT SUPPORTED <br/>
    PaidUp is currently not supported in your browser. <br/>
    Please try visiting PaidUp using the latest version of Chrome, Safari or Firefox. <br/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('uiModule', {
      isIE: 'isIE'
    })
  }
}
</script>
<style>
  .banner{
    text-align: center;
    vertical-align: middle;
    height: auto;
    padding: 10px 10px;
    width: 100%;
    background: #FFF2D1;
    color: #83621F;
    font-size: 18px;
    font-weight: bold
  }
</style>
