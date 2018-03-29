<template>
<div>
<md-app>
  <md-app-toolbar class="md-primary">
    <top-toolbar></top-toolbar>
  </md-app-toolbar>
  <md-app-drawer md-permanent="clipped">
    <LeftSidebar />
  </md-app-drawer>
  <md-app-content>
    <router-view></router-view>
    <pu-message></pu-message>
  </md-app-content>
</md-app>
</div>
</template>

<script>
import TopToolbar from './TopToolbar.vue'
import LeftSidebar from './LeftSidebar.vue'
import PuMessage from '@/components/shared/Message.vue'
export default {
  components: { TopToolbar, PuMessage, LeftSidebar },
  data: function () {
    return {
      msg: 'THEE MSAGE BIATH'
    }
  }
}
</script>

