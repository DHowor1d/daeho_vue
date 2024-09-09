<template>
    <div class="container py-3">
      <div class="row">
        <div class="user_list col-md-6">
          <h3>회원 리스트</h3>
          <UserListView />
        </div>
        <div class="user_sign col-md-6">
          <h3>회원가입</h3>
          <UserSignView />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <MapView />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import UserListView from "../components/user/UserListView.vue";
  import UserSignView from "../components/user/UserSignView.vue";
  import MapView from "../components/user/MapView.vue";
  </script>
  
  <style lang="scss" scoped>
  .user_list{
    h3{
      font-weight: bold;
      text-align: center;
      font-size: 30px
    }
  }

  .user_sign{
      h3{
        font-weight: bold;
        text-align: center;
        font-size: 30px
      }
    }
</style>