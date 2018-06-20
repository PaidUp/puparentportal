<template>
  <div>
    <md-app>
      <md-app-toolbar class="md-primary">
        <top-toolbar></top-toolbar>
      </md-app-toolbar>
      <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
        <LeftSidebar />
      </md-app-drawer>
      <md-app-content class="custom-cn">
        <router-view :key="$route.fullPath"></router-view>
        <pu-message></pu-message>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TopToolbar from './TopToolbar.vue'
  import LeftSidebar from './LeftSidebar.vue'
  import PuMessage from '@/components/shared/Message.vue'
  export default {
    components: {
      TopToolbar,
      PuMessage,
      LeftSidebar
    },
    data: function () {
      return {
        pther: false
      }
    },
    computed: {
      ...mapState('uiModule', {
        showNavigation: 'showNavigation'
      })
    }
  }
</script>
