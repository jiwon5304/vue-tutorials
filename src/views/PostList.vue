<template>
  <div>
    <Test></Test>
    <h1>Hello, {{ currentUser.name }}</h1>
    <!-- v-for는 키가 필요 -->
    <tr>
    <button type="button" @click="$router.push({ name: 'createpage' })">게시물작성</button></tr>
    <br>
    <table>
    <tr>
      <td>id</td>
      <td>작성자메일</td>
      <td>작성자이름</td>
      <td>제목</td>
      <td>내용</td>
      <!-- <td>상세보기</td> -->
      <!-- <td>수정</td>
      <td>삭제</td> -->
      </tr>
    </table>
    <br>
    <table v-for="item in items" :key="item._id">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.user.email }}</td>
        <td>{{ item.user.name }}</td>
        <td>
          <!-- 이름을 가지는 라우터 & 객체를 router-link, 컴포넌트의 to prop로  전달할 수 있음-->
          <!-- url: /posts/id -->
          <router-link :to="{ name: 'postDetail', params: { id: item.id }}">{{ item.title }}</router-link>
        </td>
        <td>{{ item.contents }}</td>
        <!-- <td valign=middle><button type="button" @click="postUpdate(item.id)">수정</button></td>
        <td valign=middle><button type="button" @click="postDelete(item.id)">삭제</button></td> -->
      </tr>
    </table>
  </div> 
</template>
<style>
  table {
    width: 700px;
    border: 1px solid #016512;
    border-collapse: collapse;
  }
  th, td {
    border-bottom: 1px solid #016512;
    padding: 10px;
  }
</style>
<script>
import Test from '../components/test.vue'

// 메소드 생성(method) - 메소드 호출(created) - 데이터생성(data)
export default {
  data(){
    return {
      items:[],
      post: {},
      update: {}

    }
  },
  components: {
    Test
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    },
  },
  methods: {
    // List() 라는 메소드 생성
    async List() { 
      // resp 에 원하는 값을 담는다
      const resp = await this.axios.get('posts')
      console.log(resp.data);
      this.items = resp.data.results
      },
    // 게시물 생성
    async postCreate () {
      this.$router.push('/create')
    },
    // 게시물 상세보기 
    async postDetail (pk) {
      const resp = await this.axios.get(`posts/${pk}`)
      this.post = resp.data

    },
    // 게시물 수정
    async postUpdate (pk) {
      const resp = await this.axios.patch(`posts/${pk}`)
      this.update = resp.data


    },
    // 게시물 삭제
    async postDelete (pk) {
      const resp = await this.axios.delete(`posts/${pk}`)
      console.log(resp)
      location.reload()
    }
    },
    // 메소드 호출
    created(){ 
      this.List();
    }
  }
</script>