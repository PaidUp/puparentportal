<template>
  <div class="public-layout">
    <v-banner-ie></v-banner-ie>
    <div class="public-logo-box">
      <img src="@/assets/app-logo.svg" alt="logo" />
    </div>
    <div class="public-content">
      <router-view />
    </div>
    <footer class="public-footer bold">
      &copy; 2014 - 2018 PaidUp, Inc. All rights reserved. |
      <a href="https://getpaidup.com/privacy-policy/" target="_blank" class="clblue">Privacy</a>
      |
      <a href="https://getpaidup.com/terms-of-service/" target="_blank" class="clblue">Terms of Service</a>
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
  import VBannerIe from '@/components/shared/VBannerIe.vue'
  export default {
    components: { PuMessage, VBannerIe },
    data: function () {
      return {
        msg: 'THEE MSAGE BIATH'
      }
    }
  }
</script>

