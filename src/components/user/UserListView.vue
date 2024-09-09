<template>
  <div
    v-for="(item, i) in $store.state.userData"
    :key="i"
    class="user_list d-flex gap-2 border rounded p-3 mb-3"
  >
    <div class="avata">
      <img :src="item.image" alt="" />
    </div>
    <div class="d-flex flex-grow-1 justify-content-between align-items-center">
      <div>
        <h5 class="mb-0">{{ item.userid }}</h5>
        <p class="mb-0">{{ item.username }}</p>
      </div>
      <div> 
      <button class = "detail  me-2" @click="openModal(item)">상세보기</button>
      <button class = "delete" @click="deleteUser(item)">삭제</button>
    </div>
    </div>
  </div>
  <UserDetailModal 
    :show="isModalOpen" 
    :user="selectedUser" 
    @close="closeModal" 
    @updateUser="updateUser"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import UserDetailModal from './UserDetailView.vue';

const store = useStore();
const isModalOpen = ref(false);
const selectedUser = ref(null);

const openModal = (user) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const updateUser = (updatedUser) => {
  const index = store.state.userData.findIndex(user => user.userid === updatedUser.userid);
  if (index !== -1) {
    store.commit('updateUser', { index, updatedUser });
  }
  closeModal();
};

const deleteUser = (user) => {
  const index = store.state.userData.findIndex(u => u.userid === user.userid);
  if (index !== -1) {
    store.commit('deleteUser', index);
  }
};

</script>

<style scoped>
.avata {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.detail {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.detail:hover {
  background-color: #0056b3;
}

.delete {
  background-color: hsl(0, 78%, 65%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete:hover {
  background-color: hsl(0, 100%, 51%);
}

.user_list:hover {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2); 
}

</style>

