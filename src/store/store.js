import { createStore } from "vuex";

export default createStore({
  state: {
    userData: [
      {
        userid: "hanyong5",
        password: "123",
        username: "홍길동",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
      {
        userid: "ttomi",
        password: "123",
        username: "김유신",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
      {
        userid: "test",
        password: "123",
        username: "감강찬",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
    ],
    addr: '', 
  },
  // 프로젝트에서 회원 리스트는 store.js 파일을 통해 추가됩니다. 
  // 이 파일에서 Vuex를 사용하여 상태 관리를 하고 있습니다. state.userData에 미리 정의된 사용자 목록이 있으며, 
  // 새로운 사용자를 추가하는 것은 addUser라는 변이를 통해 이루어집니다. 
  // 사용자가 회원 정보를 입력하면 해당 정보는 addUser 변이를 호출하여 userData 배열에 추가됩니다
  mutations: {
    updateUser(state, { index, updatedUser }) {
      state.userData.splice(index, 1, updatedUser);
    },
    addUser(state, payload) {
      state.userData.push(payload);
    },
    deleteUser(state, index) {
      state.userData.splice(index, 1);
    },
    setAddr(state, addr) {
      state.addr = addr; 
    },
  },
});