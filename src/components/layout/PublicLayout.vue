<template>
  <div class="public-layout">
    <div class="public-logo-box">
      <img src="@/assets/app-logo.svg" alt="logo" />
    </div>
    <div class="public-content">
      <router-view />
    </div>
    <footer class="public-footer bold">
      &copy; 2014 - 2018 PaidUp, Inc. All rights reserved. |
      <a href="#" class="clblue">Privacy</a>
      |
      <a href="#" class="clblue">Terms of Service</a>
      | Need Help? Call
      <a href="tel:855-764-3232" class="clblue">(855) 764-3232</a>
      or Email
      <a href="mailto:support@getpaidup.com" class="clblue">support@getpaidup.com</a>
    </footer>
    <pu-message></pu-message>
  </div>
</template>

<script>
  import PuMessage from '@/components/shared/Message.vue'
  export default {
    components: { PuMessage },
    data: function () {
      return {
        msg: 'THEE MSAGE BIATH'
      }
    }
  }
</script>
