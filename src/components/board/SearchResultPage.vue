<template>
  <div class="search-page">
    <div class="title">
      Search Results
    </div>
    <div class="not-found">
      <md-icon class="md-size-5x">search</md-icon>
      <div class="bolder">No search results found</div>
      <div>Please try again with a different search query</div>
    </div>
    <div class="table-title">Players (2)</div>
    <md-table v-model="users" md-sort="name" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
          <md-avatar class="md-small" v-if="item.id ===2">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phone">{{ item.phone }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="table-title">Parents (2)</div>
    <md-table v-model="users" md-sort="name" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
          <md-avatar class="md-small" v-if="item.id ===2">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phone">{{ item.phone }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data: function () {
      return {
        movie: 'godfather',
        users: [ {
          id: 1,
          name: 'Shawna Dubbin',
          email: 'sdubbin0@geocities.com',
          phone: '888-999-8888'
        },
        {
          id: 2,
          name: 'Odette Demageard',
          email: 'odemageard1@spotify.com',
          phone: '888-999-1111'
        }
        ]
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {}
  }
</script>
