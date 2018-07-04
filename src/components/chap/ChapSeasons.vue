<template>
  <div class="seasons-cards-page">
    <div class="club-img-box">
      <img src="@/assets/ntxbanditos.png" alt="club">
    </div>
    <div class="search-input">
      <md-field>
        <label>Search Seasons</label>
        <md-input></md-input>
      </md-field>
    </div>
    <div class="cards-layout">
      <md-card md-with-hover class="card-seasons">
        <div class="body">
          <div class="title">2017 Summer</div>
        </div>
        <div class="actions">
          <md-button class="md-icon-button">
            <md-icon>visibility_off</md-icon>
          </md-button>
          <md-menu md-size="small" md-direction="top-start">
            <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                DELETE
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
      <md-card md-with-hover class="card-seasons">
        <div class="body">
          <div class="title">2017 Winter</div>
        </div>
        <div class="actions">
          <md-button class="md-icon-button">
            <md-icon>visibility_off</md-icon>
          </md-button>
          <md-menu md-size="small" md-direction="top-start">
            <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                DELETE
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
      <div class="add-button-card">
        <md-button class="md-icon-button md-raised md-accent lblue">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    components: {},
    data: function () {
      return {

      }
    },
    methods: {}
  }
</script>
