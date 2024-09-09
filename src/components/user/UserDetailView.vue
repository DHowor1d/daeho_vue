<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="close" @click="close">Close</button>
      <div v-if="editMode">
        <input type="text" v-model="editableUser.userid" />
        <input type="file" @change="handleImage" accept="image/*" />
        <img class="profile_img" :src="editableUser.image" alt="User Image" />
        <input type="text" v-model="editableUser.password" />
        <input type="text" v-model="editableUser.username" />
        <input type="text" v-model="editableUser.addr" />
        <button @click="saveChanges">저장</button>
        <button @click="cancelEdit">취소</button>
      </div>
      <div v-else>
        <h2>{{ user.userid }}</h2>
        <img class="profile_img" :src="user.image" alt="User Image" />
        <p>{{ user.password }}</p>
        <p>{{ user.username }}</p>
        <p>{{ user.addr }}</p>
        <button class="modif" @click="editMode = true">수정</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  user: Object,
});

const emit = defineEmits(['close', 'updateUser']); 

const editMode = ref(false); // 수정 모드 상태 추가
const editableUser = ref({ ...props.user }); // 수정 가능한 사용자 데이터 추가

watch(() => props.user, (newUser) => {
  editableUser.value = { ...newUser }; // props.user가 변경될 때 editableUser 업데이트
});

const close = () => {
  emit('close');
};

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    editableUser.value.image = URL.createObjectURL(file); // 이미지 파일 선택 시 업데이트
  }
};

const saveChanges = () => {
  console.log('saveChanges 호출됨'); // 콘솔 로그 추가
  emit('updateUser', editableUser.value); // 변경 사항 저장
  editMode.value = false; // 수정 모드 종료
};

const cancelEdit = () => {
  editableUser.value = { ...props.user }; // 수정 모드 취소 시 원래 데이터로 복원
  editMode.value = false; // 수정 모드 종료
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(104, 179, 213, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.profile_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.modif {
  background-color: hsl(0, 78%, 65%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modif:hover {
  background-color: hsl(0, 96%, 45%);
}

.close {
  background-color: hsl(115, 96%, 68%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close:hover {
  background-color: hsl(138, 100%, 50%);
}
</style>

