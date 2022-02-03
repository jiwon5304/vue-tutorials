<template>
  <div>
    <h1>게시물 작성</h1>
    <form>
      <h4>제목</h4>
      <input type="text" v-model="post.title" placeholder="제목을 입력하세요" style="width:700px;font-size:15px;"/>
      <h4>내용</h4>
      <input type="text" v-model="post.contents" placeholder="내용을 입력하세요" style="width:700px;height:200px;font-size:15px;"/>
      <br><br>
      <button type="button" @click="$router.go(-1)">목록</button>
      <button type="button" @click="postSave" v-if="!this.id">게시물 작성</button>
      <template v-else>
        <button type="button" @click="postUpdate">게시물 수정</button>
        <button type="button" @click="postRemove">게시물 삭제</button>
      </template>
    </form>
  </div>
</template>
<style scoped>
/* style 태크는 전역에 설정되는데, style scoped local에 적용됨 */
button { margin-right: 5px; }
</style>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id || null,
      post: {
        title : '',
        contents: ''
      }
    }
  },
  mounted () {
    if (this.id) this.getPost()
  },
  methods: {
    async postSave () {
      const resp = await this.axios.post('posts', this.post)
      if (resp.status === 201) {
        this.$router.push({ name: 'listpage' })
      }
    },
    async postUpdate () {
      const resp = await this.axios.put(`posts/${this.id}`, this.post)
      if (resp.status === 200) {
        this.$router.push({ name: 'listpage' })
      }
    },
    async postRemove () {
      const resp = await this.axios.delete(`posts/${this.id}`)
      if (resp.status === 204) {
        this.$router.push({ name: 'listpage' })
      }
    },
    async getPost () {
      const { status, data } = await this.axios.get(`posts/${this.id}`)
      if (status === 200) {
        this.post.title = data.title
        this.post.contents = data.contents
      }
    }
  }
}
</script>