<template>
  <div>
    <h1>게시물 수정</h1>
    <form>
      <h4>작성자</h4>
      {{ currentUser.name }}
      <h4>제목</h4>
      <input type="text" v-model="title" placeholder="제목을 입력하세요" style="width:700px;font-size:15px;"/>
      <h4>내용</h4>
      <input type="text" v-model="contents" placeholder="내용을 입력하세요" style="width:700px;height:200px;font-size:15px;"/>
      <br><br>
      <button type="button" @click="postUpdate()">게시물 업데이트</button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title : '',
      contents: '',
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    async postUpdate () {
      const params = {
        title: this.title,
        contents: this.contents
      }
      const resp = await this.axios.patch(`posts`, params)
      // const resp = await this.axios.patch(`posts/${pk}`, params)
      if (resp.status === 201) {
        this.$router.push('/list')
      }
    }
  }
}
</script>